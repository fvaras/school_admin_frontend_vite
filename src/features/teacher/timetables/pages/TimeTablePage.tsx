import { Breadcrumbs, Combobox, CustomCalendar, Heading } from '@/components/ui/custom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState, useCallback, useEffect } from 'react'
import { useGrades, useSubjects, useTimeBlock } from '../../hooks'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useTranslation } from 'react-i18next'
import { ITimeBlockForCreationDTO, ITimeBlockForUpdateDTO, ITimeBlockTableRowDTO } from '../../models/ITimeBlock'
import AddEditTimeBlockForm from '../views/AddEditTimeBlockForm'
import { startOfWeek, format } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'

const TimeTablePage = () => {
  const [gradesList, setGradesList] = useState<LabelValueDTO<string>[] | null>([])
  const [subjectList, setSubjectList] = useState<LabelValueDTO<string>[]>([])
  const [currentGradeId, setCurrentGradeId] = useState<string>('')
  const [currentTimeBlock, setCurrentTimeBlock] = useState<ITimeBlockTableRowDTO>({} as ITimeBlockTableRowDTO)
  const [timeBlocks, setTimeBlocks] = useState<any[]>([])
  const [minmaxDayTime, setMinMaxDayTime] = useState<{ min: Date, max: Date }>({ min: new Date(), max: new Date() })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  const { toast } = useToast()

  const { getGradesByTeacherForList } = useGrades()
  const { getAllTimeBlocks, createTimeBlock, updateTimeBlock, deleteTimeBlock, loadingModification } = useTimeBlock()

  const { getByMainTeacherForList } = useSubjects()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (currentGradeId)
      loadSubjects(currentGradeId)
  }, [currentGradeId])

  const loadData = async () => {
    const _grades = await getGradesByTeacherForList()
    setGradesList(_grades)
  }

  const loadSubjects = async (currentGradeId: string) => {
    const _subjects = await getByMainTeacherForList(currentGradeId)
    setSubjectList(_subjects)
  }

  const loadTimeTableByGrade = async (gradeId: string) => {
    try {
      setCurrentGradeId(gradeId)
      const list = await getAllTimeBlocks(gradeId);

      const timeBlocks = list.map((timeBlock) => {
        const { day, start, end, id, blockName } = timeBlock;

        // Get the first day of the current week (Monday as the first day of the week)
        const currentDate = new Date();
        const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // 1 means Monday

        // Calculate the days offset for the given weekday
        const daysOffset = (day - firstDayOfWeek.getDay() + 7) % 7;

        // Calculate the specific date for the given weekday in the current week
        const weekStartDate = new Date(firstDayOfWeek);
        weekStartDate.setDate(weekStartDate.getDate() + daysOffset);

        // Create start date for the time block
        const startDate = new Date(weekStartDate);
        const [startHour, startMinute, startSecond] = start.split(':').map(Number);
        startDate.setHours(startHour, startMinute, startSecond || 0);

        // Create end date for the time block
        const endDate = new Date(startDate);
        const [endHour, endMinute, endSecond] = end.split(':').map(Number);
        endDate.setHours(endHour, endMinute, endSecond || 0);

        return {
          id,
          allDay: false,
          title: blockName || '-',
          start: startDate,
          end: endDate,
          resource: timeBlock,
        };
      });

      const min = new Date(Math.min(...timeBlocks.map(timeblock => timeblock.start.getTime())))
      let max = new Date(Math.max(...timeBlocks.map(timeblock => timeblock.end.getTime())))
      max.setHours(max.getHours() + 1);

      setMinMaxDayTime({
        min: min,
        max: max
      })

      setTimeBlocks(timeBlocks);
    } catch (error) {
      console.error("Error loading timetable:", error);
    }
  };

  // Existing events
  const handleSelectEvent = useCallback(
    async (event: any) => {
      if (!event.resource.color)
        event.resource.color = '#162f69'
      setCurrentTimeBlock(event.resource)
      setIsModalOpen(true)
    }, [])

  // New Events
  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      const startDate = new Date(start)
      const endDate = new Date(end)
      const newTimeBlock: ITimeBlockTableRowDTO = {
        id: '',
        year: (new Date()).getFullYear(),
        day: startDate.getDay(),
        // start: new Date(start),
        // end: new Date(end),
        start: format(startDate, "HH:mm"),
        end: format(endDate, "HH:mm"),
        isRecess: false,
        blockName: '',
        color: '#162f69',
        gradeId: currentGradeId,
        subjectId: null,
        // resource: null,
      }
      setCurrentTimeBlock(newTimeBlock)
      setIsModalOpen(true)
    },
    [setTimeBlocks]
  )

  const handleAddEditTimeBlock = async (id: string | null, timeBlock: ITimeBlockForCreationDTO | ITimeBlockForUpdateDTO) => {
    if (!id || id === '') {
      await createTimeBlock(timeBlock as ITimeBlockForCreationDTO)
      toast({
        description: "Time block created successfully",
      })
    }
    else {
      await updateTimeBlock(id!, timeBlock as ITimeBlockForUpdateDTO)
      toast({
        description: "Time block updated successfully",
      })
    }
    await loadTimeTableByGrade(currentGradeId)
    setIsModalOpen(false)
  }

  const handleDeleteTimeBlock = async (id: string) => {
    await deleteTimeBlock(id)
    setTimeBlocks(timeBlocks.filter(timeBlock => timeBlock.id !== id))
    setIsModalOpen(false)
    toast({
      variant: "destructive",
      description: "Time block deleted successfully",
    })
  }

  return (
    <>
      <Breadcrumbs items={[
        { text: 'Dashboard', link: '/teacher/dashboard' },
      ]} />

      <Heading variant="title2">{t('TEACHERMODULE.TIMETABLE.ALL.TITLE')}</Heading>

      <div className='mb-4'>
        <Combobox
          label={t('TEACHERMODULE.FIELDNAMES.GRADENAME')}
          options={gradesList ?? []}
          onChange={async (value: string | number) => await loadTimeTableByGrade(value as string)}
        />
      </div>

      {(timeBlocks && timeBlocks.length > 0) &&
        <CustomCalendar
          className={'custom-events custom-events__no_toolbar'}
          viewsConfig={{
            month: true,
            agenda: true,
            day: true,
            week: true,
            work_week: false,
          }}
          defaultView='week'
          events={timeBlocks} // TODO: Isn't painting the blocks
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          // selectable
          min={minmaxDayTime.min}
          max={minmaxDayTime.max}
        />
      }

      <Dialog open={isModalOpen} onOpenChange={(open: boolean) => setIsModalOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentTimeBlock?.id ? t('TEACHERMODULE.TIMETABLE.EDIT.TITLE') : t('TEACHERMODULE.TIMETABLE.ADD.TITLE')}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AddEditTimeBlockForm
            mode={currentTimeBlock.id ? 'EDIT' : 'ADD'}
            timeBlock={currentTimeBlock}
            gradeId={currentGradeId}
            subjectList={subjectList}
            loading={loadingModification}
            onSubmit={handleAddEditTimeBlock}
            onDelete={handleDeleteTimeBlock}
          />
        </DialogContent>
      </Dialog>

    </>
  )
}

export default TimeTablePage
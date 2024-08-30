import { Breadcrumbs, Combobox, CustomCalendar, Heading } from '@/components/ui/custom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ICalendarEventDTO } from '@/features/admin/models/IEvent'
import { useState, useCallback, useEffect } from 'react'
import { useGrades, useTimeBlock } from '../../hooks'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useTranslation } from 'react-i18next'

const TimeTablePage = () => {

  const [gradesList, setGradesList] = useState<LabelValueDTO<string>[] | null>([])
  const [timeBlocksEvents, setTimeBlocks] = useState<any[]>([])
  const [minmaxDayTime, setMinMaxDayTime] = useState<{ min: Date, max: Date }>({ min: new Date(), max: new Date() })
  const [currentEvent, setCurrentEvent] = useState<ICalendarEventDTO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  const { getGradesByTeacherForList } = useGrades()
  const { getAllTimeBlocks } = useTimeBlock()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const _grades = await getGradesByTeacherForList()
    setGradesList(_grades)
  }

  const loadTimeTableByGrade = async (gradeId: string) => {
    try {
      const list = await getAllTimeBlocks(gradeId);

      // Get the current year and month
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based index for months

      const timeBlocks = list.map((timeBlock) => {
        const { day, start, end, id, blockName } = timeBlock;

        // Calculate the first day of the current month and find the first occurrence of the given weekday
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const firstWeekdayOffset = (firstDayOfMonth.getDay() + 6) % 7; // Adjust for Sunday = 0, Monday = 1
        const daysOffset = (day - 1) - firstWeekdayOffset;

        // Calculate the specific date for the given weekday in the current month
        const weekStartDate = new Date(firstDayOfMonth);
        weekStartDate.setDate(weekStartDate.getDate() + ((daysOffset + 7) % 7));

        // Create start date for the time block
        const startDate = new Date(weekStartDate);
        const [startHour, startMinute, startSecond] = start.split(':').map(Number);
        startDate.setHours(startHour, startMinute, startSecond);

        // Create end date for the time block
        const endDate = new Date(startDate);
        const [endHour, endMinute, endSecond] = end.split(':').map(Number);
        endDate.setHours(endHour, endMinute, endSecond);

        return {
          id,
          allDay: false,
          title: blockName || 'New Event',
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

  const handleSelectEvent = useCallback(
    async (event: any) => {
      // window.alert(event.title)
      // window.alert(JSON.stringify(event))
      console.log(event)
      // await loadEvent(event.id)
      setIsModalOpen(true)
    }, [])

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      // const title = window.prompt(`New Event name ${start} / ${end}`)
      // if (title) {
      //     setEvents((prev) => [...prev, { start, end, title }])
      // }
      const _event: any = {
        // allDay: false,
        id: undefined,
        title: 'New event',
        startDate: new Date(start),
        endDate: new Date(end),
        resource: null,
      }
      setCurrentEvent(_event)
      setIsModalOpen(true)
    },
    [setTimeBlocks]
  )

  const today = new Date();

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

      {(timeBlocksEvents && timeBlocksEvents.length > 0) &&
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
          events={timeBlocksEvents} // TODO: Isn't painting the blocks
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
            <DialogTitle>{currentEvent?.id ? 'Edit event' : 'Add event'}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          TIME TABLE SLOT
          {/* <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
        </DialogContent>
      </Dialog>

    </>
  )
}

export default TimeTablePage
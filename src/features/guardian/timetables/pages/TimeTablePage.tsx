import { Breadcrumbs, Combobox, CustomCalendar, Heading } from '@/components/ui/custom'
import { useState, useEffect } from 'react'
import { useTimeBlock } from '../../hooks'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useStudents } from '../../hooks/useStudents'
import { useTranslation } from 'react-i18next'
import { startOfWeek } from 'date-fns'

const TimeTablePage = () => {
  const [studentList, setStudentList] = useState<LabelValueDTO<string>[]>([])
  const [currentStudentId, setCurrentStudentId] = useState<string>('')
  const [timeBlocksEvents, setTimeBlocks] = useState<any[]>([])
  const [minmaxDayTime, setMinMaxDayTime] = useState<{ min: Date, max: Date }>({ min: new Date(), max: new Date() })

  const { getStudentsByGuardian } = useStudents()
  const { getAllTimeBlocksByStudent } = useTimeBlock()

  const { t } = useTranslation()

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    const _studentList = await getStudentsByGuardian()
    setStudentList(_studentList)

  }

  const loadTimeTableByStudent = async (studentId: string) => {
    try {
      const list = await getAllTimeBlocksByStudent(studentId);

      // Get the current year and month
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 0-based index for months

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

  return (
    <>
      <Breadcrumbs items={[
        { text: 'Dashboard', link: '/teacher/dashboard' },
      ]} />

      <Heading variant="title2">{t('GUARDIANMODULE.TIMETABLE.ALL.TITLE')}</Heading>

      <div className='mb-4'>
        <Combobox
          label={t('GUARDIANMODULE.FIELDNAMES.STUDENT_LIST')}
          options={studentList ?? []}
          onChange={async (value: string | number) => await loadTimeTableByStudent(value as string)}
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
          events={timeBlocksEvents}
          min={minmaxDayTime.min}
          max={minmaxDayTime.max}
        />
      }

    </>
  )
}

export default TimeTablePage
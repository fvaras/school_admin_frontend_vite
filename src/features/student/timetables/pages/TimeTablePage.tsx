import { Breadcrumbs, CustomCalendar, Heading } from '@/components/ui/custom'
import { useState, useEffect } from 'react'
import { useTimeBlock } from '../../hooks'
import { useTranslation } from 'react-i18next'
import { startOfWeek } from 'date-fns'

const TimeTablePage = () => {
  const [timeBlocksEvents, setTimeBlocks] = useState<any[]>([])
  const [minmaxDayTime, setMinMaxDayTime] = useState<{ min: Date, max: Date }>({ min: new Date(), max: new Date() })

  const { t } = useTranslation()
  
  const { getAllTimeBlocks } = useTimeBlock()

  useEffect(() => {
    loadTimeTableByStudent()
  }, [])

  const loadTimeTableByStudent = async () => {
    try {
      const list = await getAllTimeBlocks();

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

      <Heading variant="title2">{t('STUDENTMODULE.TIMETABLE.ALL.TITLE')}</Heading>

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
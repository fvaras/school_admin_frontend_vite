import { Calendar, dateFnsLocalizer, SlotInfo, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useMemo } from 'react'
import CalendarAgendaEvent from './CalendarAgendaEvent'
import CalendarDayEvent from './CalendarDayEvent'
import CalendarMonthEvent from './CalendarMonthEvent'
import CalendarWeekEvent from './CalendarWeekEvent'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface IProps<TEvent extends object = Event, TResource extends object = object>
    extends React.RefAttributes<Calendar<TEvent, TResource>> {
    events: any[]
    onSelectEvent?: ((event: TEvent, e: React.SyntheticEvent<HTMLElement>) => void) | undefined;
    onSelectSlot?: ((slotInfo: SlotInfo) => void) | undefined;
}

const CustomCalendar = ({ events, onSelectEvent, onSelectSlot }: IProps) => {
    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(),
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    )

    return (
        <Calendar
            className='custom-events'
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            events={events}
            localizer={localizer}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            components={{
                month: { event: CalendarMonthEvent },
                week: { event: CalendarWeekEvent },
                day: { event: CalendarDayEvent },
                agenda: { event: CalendarAgendaEvent },
                work_week: { event: CalendarDayEvent },
            }}
        />
    )
}

export default CustomCalendar
import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isWithinInterval, parseISO } from 'date-fns'

export interface IEvent {
    allDay: boolean
    title: string
    start: Date
    end: Date
    additionalEventClass?: string
    data: any
}

interface IProps {
    year: number
    month: number
    firstDayOfWeek?: 'Sunday' | 'Monday'
    events?: IEvent[]
}

const BigCalendar = ({ year, month, firstDayOfWeek = 'Monday', events = [] }: IProps) => {
    const renderHeader = () => {
        const date = new Date(year, month - 1)
        const dateString = format(date, 'yyyy MMMM')
        return (
            <div className="header flex justify-between border-b p-2">
                <span className="text-lg font-bold">{dateString}</span>
                <div className="buttons">
                    {/* Add buttons if needed */}
                </div>
            </div>
        )
    }

    const renderDays = () => {
        const days: React.ReactNode[] = []
        const weekDays = firstDayOfWeek === 'Sunday' ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 0]

        weekDays.forEach(dayIndex => {
            days.push(
                <th key={dayIndex} className="p-2 border-r h-10 w-10 text-xs">
                    <span className="block">{format(addDays(new Date(2024, 0, dayIndex), 0), 'eeeeee')}</span>
                </th>
            )
        })

        return <tr>{days}</tr>
    }

    const renderCells = () => {
        const monthStart = startOfMonth(new Date(year, month - 1))
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek === 'Sunday' ? 0 : 1 })
        const endDate = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek === 'Sunday' ? 0 : 1 })

        const rows = []
        let days: React.ReactNode[] = []
        let day = startDate
        let formattedDate = ''

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd')
                const cloneDay = day

                days.push(
                    <td
                        key={day.toString()}
                        className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 transition cursor-pointer duration-500 ease hover:bg-gray-300 ${!isSameMonth(day, monthStart) ? 'bg-gray-100' : ''}`}
                    >
                        <div className="flex flex-col h-full">
                            <div className="top h-5 w-full flex justify-end">
                                <span className="text-gray-500">{formattedDate}</span>
                            </div>
                            <div className="bottom flex-grow py-1 w-full overflow-auto">
                                {renderEvents(cloneDay)}
                            </div>
                        </div>
                    </td>
                )

                day = addDays(day, 1)
            }
            rows.push(
                <tr key={day.toString()} className="h-40">
                    {days}
                </tr>
            )
            days = []
        }

        return <tbody>{rows}</tbody>
    }

    const renderEvents = (day: Date) => {
        const dayEvents = events.filter(event =>
            // isWithinInterval(day, { start: parseISO(event.start), end: parseISO(event.end) })
            isWithinInterval(day, { start: event.start, end: event.end })
        )

        return dayEvents.map((event, index) => (
            <div
                key={index}
                className={`event ${event.additionalEventClass || 'bg-purple-400'} text-white rounded p-1 text-sm mb-1`}
            >
                <span className="event-name">{event.title}</span>
                {/* {!event.allDay && <span className="time">{format(parseISO(event.start), 'HH:mm')}~{format(parseISO(event.end), 'HH:mm')}</span>} */}
                {!event.allDay && <span className="time">{format(event.start, 'HH:mm')}~{format(event.end, 'HH:mm')}</span>}
            </div>
        ))
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="wrapper bg-white rounded shadow w-full">
                {renderHeader()}
                <table className="w-full">
                    <thead>{renderDays()}</thead>
                    {renderCells()}
                </table>
            </div>
        </div>
    )
}

export default BigCalendar

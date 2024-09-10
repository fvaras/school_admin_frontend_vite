import { Breadcrumbs, CustomCalendar, Heading } from '@/components/ui/custom'
import { useState, useEffect, useCallback } from 'react'
import { ICalendarEventDTO, ICalendarEventForCreationDTO, ICalendarEventForUpdateDTO } from '../../models/IEvent'
import { useEvents } from '../../hooks'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import AddEditEventForm from '../views/AddEditEventForm'
import { useToast } from '@/components/ui/use-toast'
import { Views } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'

const CalendarPage = () => {
    const [events, setEvents] = useState<any[]>([])
    const [currentEvent, setCurrentEvent] = useState<ICalendarEventDTO | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const { getAllEvents, getEvent, createEvent, updateEvent, loading, loadingModification } = useEvents()

    const { t } = useTranslation()

    const { toast } = useToast()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const data = await getAllEvents()
        const _events = data.map((ev: ICalendarEventDTO) => {
            return (
                {
                    id: ev.id,
                    allDay: false, // ev.id === '66939eab-0037-439d-aead-14ffe161cc44',
                    title: ev.title,
                    start: new Date(ev.startDate),
                    end: new Date(ev.endDate),
                    resource: ev,
                }
            )
        })
        console.log('data')
        console.log(data)
        console.log('events')
        console.log(_events)
        // console.log(JSON.stringify(_events[events.length - 1]))
        setEvents(_events)
    }

    const loadEvent = async (eventId: string) => {
        const existingEvent = await getEvent(eventId)
        setCurrentEvent(existingEvent)
    }

    const handleUpdate = async (id: string, eventForUpdate: ICalendarEventForUpdateDTO) => {
        await updateEvent(id, eventForUpdate)
        const _events = [...events]
        let index = _events.findIndex(p => p.id === id)
        // _events[index].allDay = eventForUpdate.allDay
        _events[index].title = eventForUpdate.title
        _events[index].start = new Date(eventForUpdate.startDate)
        _events[index].end = new Date(eventForUpdate.endDate)
        _events[index].resource = eventForUpdate
        setEvents(_events)
        setIsModalOpen(false)
        toast({
            description: "Event updated successfully",
        })
    }

    const handleCreate = async (eventForCreation: ICalendarEventForCreationDTO) => {
        const newEvent: any = await createEvent(eventForCreation)
        const formattedEvent: any = {
            allDay: false,
            title: eventForCreation.title,
            start: new Date(eventForCreation.startDate),
            end: new Date(eventForCreation.endDate),
            resource: { ...newEvent },
        }

        setEvents(prevEvents => [...prevEvents, formattedEvent])
        setIsModalOpen(false)
        toast({
            description: "Event created successfully",
        })
    }

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
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        async (event: any) => {
            // window.alert(event.title)
            // window.alert(JSON.stringify(event))
            console.log(event)
            await loadEvent(event.id)
            setIsModalOpen(true)
        }, [])

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Calendar' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.EVENTS.CALENDAR.TITLE')}</Heading>

            <CustomCalendar
                events={events}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
            // selectable
            />

            <Dialog open={isModalOpen} onOpenChange={(open: boolean) => setIsModalOpen(open)}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEvent?.id ? t('ADMINMODULE.EVENTS.EDIT.TITLE') : t('ADMINMODULE.EVENTS.ADD.TITLE')}</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <AddEditEventForm
                        mode={currentEvent?.id ? 'EDIT' : 'ADD'}
                        event={currentEvent ?? undefined}
                        loading={loadingModification}
                        submit={(id, event) => {
                            currentEvent?.id ?
                                handleUpdate(id as string, event as ICalendarEventForUpdateDTO)
                                : handleCreate(event as ICalendarEventForCreationDTO)
                        }}
                    />
                    {/* <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CalendarPage
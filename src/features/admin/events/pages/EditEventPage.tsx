import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditEventForm from "../views/AddEditEventForm"
import { useParams } from "react-router-dom";
import { useEvents } from "../../hooks";
import { useEffect, useState } from "react";
import { ICalendarEventDTO, ICalendarEventForUpdateDTO } from "../../models/IEvent";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditEventPage = () => {
    const [currentEvent, setCurrentEvent] = useState<ICalendarEventDTO | null>(null)

    let { eventId } = useParams();

    const { t } = useTranslation()

    const { toast } = useToast()

    const { getEvent, updateEvent, loading, loadingModification } = useEvents()

    useEffect(() => {
        if (eventId)
            loadData(eventId)
    }, [eventId])

    const loadData = async (eventId: string) => {
        const existingEvent = await getEvent(eventId)
        setCurrentEvent(existingEvent)
    }

    const handleSubmit = async (id: string, userForUpdate: ICalendarEventForUpdateDTO) => {
        await updateEvent(id, userForUpdate)
        toast({
            description: "Event updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Events', link: '/admin/events/all-events' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.EVENTS.EDIT.TITLE')}</Heading>

            {(!loading && currentEvent) &&
                <AddEditEventForm
                    mode="EDIT"
                    event={currentEvent}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as ICalendarEventForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditEventPage
import { useEvents } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { ICalendarEventForCreationDTO } from '../../models/IEvent'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditEventForm from '../views/AddEditEventForm'

const AddEventPage = () => {
    const { createEvent, loadingModification } = useEvents()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (eventForCreation: ICalendarEventForCreationDTO) => {
        const newUser = await createEvent(eventForCreation)
        toast({
            description: "Event created successfully",
        })
        navigate(`/admin/events/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Events', link: '/admin/events/all-events' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New event</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditEventForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, event) => handleSubmit(event as ICalendarEventForCreationDTO)}
            />
        </>
    )
}

export default AddEventPage
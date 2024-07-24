import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllEventsTable from '../views/AllEventsTable'

const AllEventsPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Events' },
            ]} />

            <Heading variant="title2">Events</Heading>

            <AllEventsTable></AllEventsTable>
        </>
    )
}

export default AllEventsPage
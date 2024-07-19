import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllTeachersTable from '../views/AllTeachersTable'

const AllTeachersPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Teachers' },
            ]} />

            <Heading variant="title2">Teachers</Heading>

            <AllTeachersTable></AllTeachersTable>
        </>
    )
}

export default AllTeachersPage
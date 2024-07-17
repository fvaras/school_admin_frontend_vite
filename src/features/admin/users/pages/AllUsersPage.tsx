import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllUsersTable from '../views/AllUsersTable'

const AllUsersPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Users' },
            ]} />

            <Heading variant="title2">Users</Heading>

            <AllUsersTable></AllUsersTable>
        </>
    )
}

export default AllUsersPage
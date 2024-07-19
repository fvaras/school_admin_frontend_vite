import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllStudentsTable from '../views/AllStudentsTable'

const AllStudentsPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Students' },
            ]} />

            <Heading variant="title2">Students</Heading>

            <AllStudentsTable></AllStudentsTable>
        </>
    )
}

export default AllStudentsPage
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllSubjectsTable from '../views/AllSubjectsTable'

const AllSubjectsPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Subjects' },
            ]} />

            <Heading variant="title2">Subjects</Heading>

            <AllSubjectsTable></AllSubjectsTable>
        </>
    )
}

export default AllSubjectsPage
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllGradesTable from '../views/AllGradesTable'

const AllGradesPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Grades' },
            ]} />

            <Heading variant="title2">Grades</Heading>

            <AllGradesTable></AllGradesTable>
        </>
    )
}

export default AllGradesPage
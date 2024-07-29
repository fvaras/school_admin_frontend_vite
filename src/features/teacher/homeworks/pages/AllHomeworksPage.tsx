import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllHomeworksTable from '../views/AllHomeworksTable'

const AllHomeworksPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks' },
            ]} />

            <Heading variant="title2">Homeworks</Heading>

            <AllHomeworksTable></AllHomeworksTable>
        </>
    )
}

export default AllHomeworksPage
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllPlanningsTable from '../views/AllPlanningsTable'

const AllPlanningsPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Plannings' },
            ]} />

            <Heading variant="title2">Plannings</Heading>

            <AllPlanningsTable></AllPlanningsTable>
        </>
    )
}

export default AllPlanningsPage
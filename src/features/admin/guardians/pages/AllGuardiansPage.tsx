import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllGuardiansTable from '../views/AllGuardiansTable'

const AllGuardiansPage = () => {
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Guardians' },
            ]} />

            <Heading variant="title2">Guardians</Heading>

            <AllGuardiansTable></AllGuardiansTable>
        </>
    )
}

export default AllGuardiansPage
import { useEffect, useState } from 'react'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllPlanningsTable from '../views/AllPlanningsTable'
import { IPlanningTableRowDTO } from '../../models/IPlanning'
import { usePlannings } from '../../hooks'

const AllPlanningsPage = () => {
    const [plannings, setPlannings] = useState<IPlanningTableRowDTO[]>([])

    const { loading, getAllPlannings } = usePlannings()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const data = await getAllPlannings()
        setPlannings(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings' },
            ]} />

            <Heading variant="title2">Plannings</Heading>

            <AllPlanningsTable
                plannings={plannings}
            />
        </>
    )
}

export default AllPlanningsPage
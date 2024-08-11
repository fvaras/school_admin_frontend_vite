import { useEffect, useState } from 'react'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllHomeworksTable from '../views/AllHomeworksTable'
import { useHomeworks } from '../../hooks'
import { IHomeworkTableRowDTO } from '../../models/IHomework'

const AllHomeworksPage = () => {
    const [homeworks, setHomeworks] = useState<IHomeworkTableRowDTO[]>([])

    const { getAllHomeworks } = useHomeworks()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const data = await getAllHomeworks()
        setHomeworks(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks' },
            ]} />

            <Heading variant="title2">Homeworks</Heading>

            <AllHomeworksTable
                homeworks={homeworks}
            />
        </>
    )
}

export default AllHomeworksPage
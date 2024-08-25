import { useEffect, useState } from 'react'
import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllHomeworksTable from '../views/AllHomeworksTable'
import { useHomeworks, useSubjects } from '../../hooks'
import { IHomeworkTableRowDTO } from '../../models/IHomework'
import { LabelValueDTO } from '@/models/TLabelValueDTO'

const AllHomeworksPage = () => {
    const [subjectList, setSubjectList] = useState<LabelValueDTO<string>[]>([])
    const [homeworks, setHomeworks] = useState<IHomeworkTableRowDTO[]>([])

    const { getForList: getSubjects } = useSubjects()
    const { loading, getAllHomeworks } = useHomeworks()

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        const _subjectList = await getSubjects()
        setSubjectList(_subjectList)
    }

    const loadHomeworks = async (subjectId: string) => {
        const data = await getAllHomeworks(subjectId)
        setHomeworks(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/student/dashboard' },
                { text: 'Homeworks' },
            ]} />

            <Heading variant="title2">Homeworks</Heading>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <Combobox
                        label='Subject'
                        options={subjectList ?? []}
                        onChange={async (value: string | number) => await loadHomeworks(value as string)}
                    />
                </div>
            </div>

            <AllHomeworksTable
                homeworks={homeworks}
            />
        </>
    )
}

export default AllHomeworksPage
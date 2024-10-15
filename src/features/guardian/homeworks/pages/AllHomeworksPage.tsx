import { useEffect, useState } from 'react'
import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllHomeworksTable from '../views/AllHomeworksTable'
import { useHomeworks, useSubjects } from '../../hooks'
import { IHomeworkTableRowDTO } from '../../models/IHomework'
import { useStudents } from '../../hooks/useStudents'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useTranslation } from 'react-i18next'

const AllHomeworksPage = () => {
    const [studentList, setStudentList] = useState<LabelValueDTO<string>[]>([])
    const [subjectList, setSubjectList] = useState<LabelValueDTO<string>[]>([])
    const [currentStudentId, setCurrentStudentId] = useState<string>('')
    const [homeworks, setHomeworks] = useState<IHomeworkTableRowDTO[]>([])

    const { t } = useTranslation()

    const { getStudentsByGuardian } = useStudents()
    const { getByStudentForList } = useSubjects()
    const { getAllHomeworks, loading } = useHomeworks()

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        const _studentList = await getStudentsByGuardian()
        setStudentList(_studentList)

    }

    const loadSubjects = async (studentId: string) => {
        setCurrentStudentId(studentId)
        const _subjects = await getByStudentForList(studentId)
        setSubjectList(_subjects)
    }

    const loadHomeworks = async (studentId: string, subjectId: string) => {
        const data = await getAllHomeworks(studentId, subjectId)
        setHomeworks(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks' },
            ]} />

            <Heading variant="title2">{t('GUARDIANMODULE.HOMEWORK.ALL.TITLE')}</Heading>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <Combobox
                        label={t('GUARDIANMODULE.FIELDNAMES.STUDENT_LIST')}
                        options={studentList ?? []}
                        onChange={async (value: string | number) => await loadSubjects(value as string)}
                    />
                </div>
                <div className="flex-1">
                    <Combobox
                        label={t('GUARDIANMODULE.FIELDNAMES.SUBJECTNAME')}
                        options={subjectList ?? []}
                        onChange={async (value: string | number) => await loadHomeworks(currentStudentId, value as string)}
                    />
                </div>
            </div>

            <AllHomeworksTable
                loadingData={loading}
                homeworks={homeworks}
            />
        </>
    )
}

export default AllHomeworksPage
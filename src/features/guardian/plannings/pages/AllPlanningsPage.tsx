import { useEffect, useState } from 'react'
import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllPlanningsTable from '../views/AllPlanningsTable'
import { IPlanningTableRowDTO } from '../../models/IPlanning'
import { usePlannings, useSubjects } from '../../hooks'
import { useStudents } from '../../hooks/useStudents'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useTranslation } from 'react-i18next'

const AllPlanningsPage = () => {
    const [studentList, setStudentList] = useState<LabelValueDTO<string>[]>([])
    const [subjectList, setSubjectList] = useState<LabelValueDTO<string>[]>([])
    const [currentStudentId, setCurrentStudentId] = useState<string>('')
    const [plannings, setPlannings] = useState<IPlanningTableRowDTO[]>([])

    const { t } = useTranslation()

    const { getStudentsByGuardian } = useStudents()
    const { getByStudentForList } = useSubjects()
    const { getPlanningsByStudentAndSubject } = usePlannings()

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

    const loadPlannings = async (studentId: string, subjectId: string) => {
        const data = await getPlanningsByStudentAndSubject(studentId, subjectId)
        setPlannings(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings' },
            ]} />

            <Heading variant="title2">{t('GUARDIANMODULE.PLANNING.ALL.TITLE')}</Heading>

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
                        onChange={async (value: string | number) => await loadPlannings(currentStudentId, value as string)}
                    />
                </div>
            </div>

            <AllPlanningsTable
                plannings={plannings}
            />
        </>
    )
}

export default AllPlanningsPage
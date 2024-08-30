import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllPlanningsTable from '../views/AllPlanningsTable'
import { useEffect, useState } from 'react'
import { LabelValueDTO, PKFKPair } from '@/models/TLabelValueDTO'
import { usePlannings, useSubjects } from '../../hooks'
import { IPlanningTableRowDTO } from '../../models/IPlanning'
import { useToast } from '@/components/ui/use-toast'
import { useTranslation } from 'react-i18next'

const AllPlanningsPage = () => {
    const [subjectsGradesList, setSubjectsGradesList] = useState<LabelValueDTO<string>[]>([])
    const [plannings, setPlannings] = useState<IPlanningTableRowDTO[]>([])

    const { getWithGradeByTeacherForList, mapSubjectGradesPkFkToLabelValueWithData } = useSubjects()
    const { loading, loadingModification, getAllTeacherPlannings, deletePlanning } = usePlannings()

    const { t } = useTranslation()
    
    const { toast } = useToast()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const _listSubjectsGrades = await getWithGradeByTeacherForList()
        const _list = mapSubjectGradesPkFkToLabelValueWithData(_listSubjectsGrades)
        setSubjectsGradesList(_list)
    }

    const loadPlanningsData = async (subjectId: string) => {
        const data = await getAllTeacherPlannings(subjectId)
        setPlannings(data)
    }

    const onDelete = async (row: IPlanningTableRowDTO) => {
        await deletePlanning(row.id)
        toast({
            variant: "destructive",
            description: "Planning deleted successfully",
        })
        loadPlanningsData(row.subjectId)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings' },
            ]} />

            <Heading variant="title2">{t('TEACHERMODULE.PLANNING.ALL.TITLE')}</Heading>

            <Combobox
                label="Subject / Grade"
                placeholder="Subject / Grade"
                options={subjectsGradesList}
                onChange={async (value: string | number) => await loadPlanningsData(value as string)}
            />

            <AllPlanningsTable
                plannings={plannings}
                loadingModification={loadingModification}
                onDelete={onDelete}
            />
        </>
    )
}

export default AllPlanningsPage
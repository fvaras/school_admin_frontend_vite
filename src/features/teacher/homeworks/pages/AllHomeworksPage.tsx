import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllHomeworksTable from '../views/AllHomeworksTable'
import { useToast } from '@/components/ui/use-toast'
import { useHomeworks, useSubjects } from '../../hooks'
import { useEffect, useState } from 'react'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { IHomeworkTableRowDTO } from '../../models/IHomework'
import { useTranslation } from 'react-i18next'

const AllHomeworksPage = () => {
    const [subjectsGradesList, setSubjectsGradesList] = useState<LabelValueDTO<string>[]>([])
    const [homeworks, setHomeworks] = useState<IHomeworkTableRowDTO[]>([])

    const { getWithGradeByTeacherForList, mapSubjectGradesPkFkToLabelValueWithData } = useSubjects()
    const { loading, loadingModification, getAllHomeworksByTeacher, deleteHomework } = useHomeworks()

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

    const loadHomeworks = async (subjectId: string) => {
        const data = await getAllHomeworksByTeacher(subjectId)
        setHomeworks(data)
    }

    const onDelete = async (row: IHomeworkTableRowDTO) => {
        await deleteHomework(row.id)
        toast({
            variant: "destructive",
            description: "Homework deleted successfully",
        })
        loadHomeworks(row.subjectId)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks' },
            ]} />

            <Heading variant="title2">{t('TEACHERMODULE.HOMEWORK.ALL.TITLE')}</Heading>

            <Combobox
                label="Subject / Grade"
                placeholder="Subject / Grade"
                options={subjectsGradesList}
                onChange={async (value: string | number) => await loadHomeworks(value as string)}
            />

            <AllHomeworksTable
                homeworks={homeworks}
                loadingData={loading}
                loadingModification={loadingModification}
                onDelete={onDelete}
            />
        </>
    )
}

export default AllHomeworksPage
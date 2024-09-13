import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllStudentsByGradeTable from '../views/AllStudentsByGradeTable'
import { useEffect, useState } from 'react'
import { useStudents } from '../../hooks'
import { IStudentTableRowDTO } from '../../models/IStudent'
import { useToast } from '@/components/ui/use-toast'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const AllStudentsByGradePage = () => {
    const [students, setStudents] = useState<IStudentTableRowDTO[]>([])

    const { t } = useTranslation()
    
    let { gradeId } = useParams();

    const { getAllStudentsByGrade, deleteStudent, loadingModification } = useStudents()

    const { toast } = useToast()

    useEffect(() => {
        if (gradeId)
            loadTableData()
    }, [gradeId])

    const loadTableData = async () => {
        const _studentList = await getAllStudentsByGrade(gradeId as string)
        setStudents(_studentList)
    }

    const onDelete = async (row: IStudentTableRowDTO) => {
        await deleteStudent(row.id)
        toast({
            variant: "destructive",
            description: "Student deleted successfully",
        })
        loadTableData()
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Students by Grade' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.GRADE.STUDENTS.TITLE')}</Heading>

            <AllStudentsByGradeTable
                students={students}
                loadingModification={loadingModification}
                onDelete={onDelete}
            ></AllStudentsByGradeTable>
        </>
    )
}

export default AllStudentsByGradePage
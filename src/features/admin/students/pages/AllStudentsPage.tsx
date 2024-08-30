import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllStudentsTable from '../views/AllStudentsTable'
import { useEffect, useState } from 'react'
import { IStudentTableRowDTO } from '../../models/IStudent'
import { useStudents } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useTranslation } from 'react-i18next'

const AllStudentsPage = () => {

    const [students, setStudents] = useState<IStudentTableRowDTO[]>([])

    const { t } = useTranslation()

    const { getAllStudents, loading, deleteStudent, loadingModification } = useStudents()

    const { toast } = useToast()

    useEffect(() => {
        loadTableData()
    }, [])

    const loadTableData = async () => {
        const _studentList = await getAllStudents()
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
                { text: 'Students' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.STUDENT.ALL.TITLE')}</Heading>

            <AllStudentsTable
                students={students}
                loadingModification={loadingModification}
                onDelete={onDelete}
            ></AllStudentsTable>
        </>
    )
}

export default AllStudentsPage
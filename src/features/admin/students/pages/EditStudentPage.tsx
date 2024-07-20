import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditStudentForm from "../views/AddEditStudentForm"
import { useParams } from "react-router-dom";
import { useStudents } from "../../hooks";
import { useEffect, useState } from "react";
import { IStudentDTO, IStudentForUpdateDTO } from "../../models/IStudent";
import { useToast } from "@/components/ui/use-toast";


const EditStudentPage = () => {
    const [currentStudent, setCurrentStudent] = useState<IStudentDTO | null>(null)

    let { studentId } = useParams();

    const { toast } = useToast()

    const { getStudent, updateStudent, loading, loadingModification } = useStudents()

    useEffect(() => {
        if (studentId)
            loadData(studentId)
    }, [studentId])

    const loadData = async (studentId: string) => {
        const existingStudent = await getStudent(studentId)
        setCurrentStudent(existingStudent)
    }

    const handleSubmit = async (id: string, userForUpdate: IStudentForUpdateDTO) => {
        await updateStudent(id, userForUpdate)
        toast({
            description: "Student updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Students', link: '/admin/students/all-students' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">Edit student</Heading>

            {(!loading && currentStudent) &&
                <AddEditStudentForm
                    mode="EDIT"
                    student={currentStudent}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IStudentForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditStudentPage
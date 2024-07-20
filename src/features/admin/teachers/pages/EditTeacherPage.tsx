import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditTeacherForm from "../views/AddEditTeacherForm"
import { useParams } from "react-router-dom";
import { useTeachers } from "../../hooks";
import { useEffect, useState } from "react";
import { ITeacherDTO, ITeacherForUpdateDTO } from "../../models/ITeacher";
import { useToast } from "@/components/ui/use-toast";


const EditTeacherPage = () => {
    const [currentTeacher, setCurrentTeacher] = useState<ITeacherDTO | null>(null)

    let { teacherId } = useParams();

    const { toast } = useToast()

    const { getTeacher, updateTeacher, loading, loadingModification } = useTeachers()

    useEffect(() => {
        if (teacherId)
            loadData(teacherId)
    }, [teacherId])

    const loadData = async (teacherId: string) => {
        const existingTeacher = await getTeacher(teacherId)
        setCurrentTeacher(existingTeacher)
    }

    const handleSubmit = async (id: string, userForUpdate: ITeacherForUpdateDTO) => {
        await updateTeacher(id, userForUpdate)
        toast({
            description: "Teacher updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Teachers', link: '/admin/teachers/all-teachers' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">Edit teacher</Heading>

            {(!loading && currentTeacher) &&
                <AddEditTeacherForm
                    mode="EDIT"
                    teacher={currentTeacher}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as ITeacherForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditTeacherPage
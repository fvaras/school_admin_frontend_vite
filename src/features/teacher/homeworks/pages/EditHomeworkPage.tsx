import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditHomeworkForm from "../views/AddEditHomeworkForm"
import { useParams } from "react-router-dom";
import { useHomeworks } from "../../hooks";
import { useEffect, useState } from "react";
import { IHomeworkDTO, IHomeworkForUpdateDTO } from "../../models/IHomework";
import { useToast } from "@/components/ui/use-toast";


const EditHomeworkPage = () => {
    const [currentHomework, setCurrentHomework] = useState<IHomeworkDTO | null>(null)

    let { homeworkId } = useParams();

    const { toast } = useToast()

    const { getHomework, updateHomework, loading, loadingModification } = useHomeworks()

    useEffect(() => {
        if (homeworkId)
            loadData(homeworkId)
    }, [homeworkId])

    const loadData = async (homeworkId: string) => {
        const existingHomework = await getHomework(homeworkId)
        setCurrentHomework(existingHomework)
    }

    const handleSubmit = async (id: string, userForUpdate: IHomeworkForUpdateDTO) => {
        await updateHomework(id, userForUpdate)
        toast({
            description: "Homework updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks', link: '/teacher/homeworks/all-homeworks' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">Edit homework</Heading>

            {(!loading && currentHomework) &&
                <AddEditHomeworkForm
                    mode="EDIT"
                    homework={currentHomework}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IHomeworkForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditHomeworkPage
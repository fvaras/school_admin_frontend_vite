import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditSubjectForm from "../views/AddEditSubjectForm"
import { useParams } from "react-router-dom";
import { useSubjects } from "../../hooks";
import { useEffect, useState } from "react";
import { ISubjectDTO, ISubjectForUpdateDTO } from "../../models/ISubject";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditSubjectPage = () => {
    const [currentSubject, setCurrentSubject] = useState<ISubjectDTO | null>(null)

    let { subjectId } = useParams();

    const { t } = useTranslation()

    const { toast } = useToast()

    const { getSubject, updateSubject, loading, loadingModification } = useSubjects()

    useEffect(() => {
        if (subjectId)
            loadData(subjectId)
    }, [subjectId])

    const loadData = async (subjectId: string) => {
        const existingSubject = await getSubject(subjectId)
        setCurrentSubject(existingSubject)
    }

    const handleSubmit = async (id: string, userForUpdate: ISubjectForUpdateDTO) => {
        await updateSubject(id, userForUpdate)
        toast({
            description: "Subject updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Subjects', link: '/admin/subjects/all-subjects' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.SUBJECT.EDIT.TITLE')}</Heading>

            {(!loading && currentSubject) &&
                <AddEditSubjectForm
                    mode="EDIT"
                    subject={currentSubject}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as ISubjectForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditSubjectPage
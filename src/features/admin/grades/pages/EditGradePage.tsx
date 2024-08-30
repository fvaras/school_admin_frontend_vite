import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditGradeForm from "../views/AddEditGradeForm"
import { useParams } from "react-router-dom";
import { useGrades } from "../../hooks";
import { useEffect, useState } from "react";
import { IGradeDTO, IGradeForUpdateDTO } from "../../models/IGrade";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditGradePage = () => {
    const [currentGrade, setCurrentGrade] = useState<IGradeDTO | null>(null)

    const { t } = useTranslation()
    
    let { gradeId } = useParams();

    const { toast } = useToast()

    const { getGrade, updateGrade, loading, loadingModification } = useGrades()

    useEffect(() => {
        if (gradeId)
            loadData(gradeId)
    }, [gradeId])

    const loadData = async (gradeId: string) => {
        const existingGrade = await getGrade(gradeId)
        setCurrentGrade(existingGrade)
    }

    const handleSubmit = async (id: string, userForUpdate: IGradeForUpdateDTO) => {
        await updateGrade(id, userForUpdate)
        toast({
            description: "Grade updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Grades', link: '/admin/grades/all-grades' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.GRADE.EDIT.TITLE')}</Heading>

            {(!loading && currentGrade) &&
                <AddEditGradeForm
                    mode="EDIT"
                    grade={currentGrade}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IGradeForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditGradePage
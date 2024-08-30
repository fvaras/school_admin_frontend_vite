import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditPlanningForm from "../views/AddEditPlanningForm"
import { useParams } from "react-router-dom";
import { usePlannings } from "../../hooks";
import { useEffect, useState } from "react";
import { IPlanningDTO, IPlanningForUpdateDTO } from "../../models/IPlanning";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditPlanningPage = () => {
    const [currentPlanning, setCurrentPlanning] = useState<IPlanningDTO | null>(null)

    let { planningId } = useParams();

    const { t } = useTranslation()
    
    const { toast } = useToast()

    const { getPlanning, updatePlanning, loading, loadingModification } = usePlannings()

    useEffect(() => {
        if (planningId)
            loadData(planningId)
    }, [planningId])

    const loadData = async (planningId: string) => {
        const existingPlanning = await getPlanning(planningId)
        setCurrentPlanning(existingPlanning)
    }

    const handleSubmit = async (id: string, userForUpdate: IPlanningForUpdateDTO) => {
        await updatePlanning(id, userForUpdate)
        toast({
            description: "Planning updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings', link: '/teacher/plannings/all-plannings' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('TEACHERMODULE.PLANNING.EDIT.TITLE')}</Heading>

            {(!loading && currentPlanning) &&
                <AddEditPlanningForm
                    mode="EDIT"
                    planning={currentPlanning}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IPlanningForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditPlanningPage
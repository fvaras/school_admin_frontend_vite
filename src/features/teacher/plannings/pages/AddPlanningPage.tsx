import { usePlannings } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IPlanningForCreationDTO } from '../../models/IPlanning'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditPlanningForm from '../views/AddEditPlanningForm'
import { useTranslation } from 'react-i18next'

const AddPlanningPage = () => {
    const { createPlanning, loadingModification } = usePlannings()

    const { t } = useTranslation()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (planningForCreation: IPlanningForCreationDTO) => {
        const newPlanningId = await createPlanning(planningForCreation)
        toast({
            description: "Planning created successfully",
        })
        navigate(`/teacher/plannings/${newPlanningId}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings', link: '/teacher/plannings/all-plannings' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">{t('TEACHERMODULE.PLANNING.ADD.TITLE')}</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditPlanningForm
                mode="ADD"
                loading={loadingModification}
                submit={(_id, planning) => handleSubmit(planning as IPlanningForCreationDTO)}
            />
        </>
    )
}

export default AddPlanningPage
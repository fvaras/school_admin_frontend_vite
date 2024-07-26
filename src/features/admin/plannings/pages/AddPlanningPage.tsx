import { usePlannings } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IPlanningForCreationDTO } from '../../models/IPlanning'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditPlanningForm from '../views/AddEditPlanningForm'

const AddPlanningPage = () => {
    const { createPlanning, loadingModification } = usePlannings()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (planningForCreation: IPlanningForCreationDTO) => {
        const newUser = await createPlanning(planningForCreation)
        toast({
            description: "Planning created successfully",
        })
        navigate(`/admin/plannings/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Plannings', link: '/admin/plannings/all-plannings' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New planning</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditPlanningForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, planning) => handleSubmit(planning as IPlanningForCreationDTO)}
            />
        </>
    )
}

export default AddPlanningPage
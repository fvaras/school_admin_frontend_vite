import { useGuardians } from '../../hooks/useGuardians'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IGuardianForCreationDTO } from '../../models/IGuardian'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditGuardianForm from '../views/AddEditGuardianForm'

const AddGuardianPage = () => {
    const { createGuardian, loadingModification } = useGuardians()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (guardianForCreation: IGuardianForCreationDTO) => {
        const newUser = await createGuardian(guardianForCreation)
        toast({
            description: "Guardian created successfully",
        })
        navigate(`/admin/guardians/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Guardians', link: '/admin/guardians/all-guardians' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New guardian</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditGuardianForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, guardian) => handleSubmit(guardian as IGuardianForCreationDTO)}
            />
        </>
    )
}

export default AddGuardianPage
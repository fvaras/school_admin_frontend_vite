import { useHomeworks } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IHomeworkForCreationDTO } from '../../models/IHomework'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditHomeworkForm from '../views/AddEditHomeworkForm'

const AddHomeworkPage = () => {
    const { createHomework, loadingModification } = useHomeworks()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (homeworkForCreation: IHomeworkForCreationDTO) => {
        const newUser = await createHomework(homeworkForCreation)
        toast({
            description: "Homework created successfully",
        })
        navigate(`/teacher/homeworks/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks', link: '/teacher/homeworks/all-homeworks' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New homework</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditHomeworkForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, homework) => handleSubmit(homework as IHomeworkForCreationDTO)}
            />
        </>
    )
}

export default AddHomeworkPage
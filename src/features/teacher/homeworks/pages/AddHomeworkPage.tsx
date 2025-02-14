import { useHomeworks } from '../../hooks'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IHomeworkForCreationDTO } from '../../models/IHomework'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditHomeworkForm from '../views/AddEditHomeworkForm'
import { useTranslation } from 'react-i18next'

const AddHomeworkPage = () => {
    const { createHomework, loadingModification } = useHomeworks()

    const { t } = useTranslation()
    
    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (homeworkForCreation: IHomeworkForCreationDTO) => {
        const newHomeworkId = await createHomework(homeworkForCreation)
        toast({
            description: "Homework created successfully",
        })
        navigate(`/teacher/homeworks/${newHomeworkId}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Homeworks', link: '/teacher/homeworks/all-homeworks' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">{t('TEACHERMODULE.HOMEWORK.ADD.TITLE')}</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditHomeworkForm
                mode="ADD"
                loading={loadingModification}
                submit={(_id, homework) => handleSubmit(homework as IHomeworkForCreationDTO)}
            />
        </>
    )
}

export default AddHomeworkPage
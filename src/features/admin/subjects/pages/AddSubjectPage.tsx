import { useSubjects } from '../../hooks/'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { ISubjectForCreationDTO } from '../../models/ISubject'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditSubjectForm from '../views/AddEditSubjectForm'
import { useTranslation } from 'react-i18next'

const AddSubjectPage = () => {
    const { createSubject, loadingModification } = useSubjects()

    const { t } = useTranslation()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (subjectForCreation: ISubjectForCreationDTO) => {
        const newUser = await createSubject(subjectForCreation)
        toast({
            description: "Subject created successfully",
        })
        navigate(`/admin/subjects/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Subjects', link: '/admin/subjects/all-subjects' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.SUBJECT.ADD.TITLE')}</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditSubjectForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, subject) => handleSubmit(subject as ISubjectForCreationDTO)}
            />
        </>
    )
}

export default AddSubjectPage
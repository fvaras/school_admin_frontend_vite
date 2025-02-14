import { useTeachers } from '../../hooks/useTeachers'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { ITeacherForCreationDTO } from '../../models/ITeacher'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditTeacherForm from '../views/AddEditTeacherForm'
import { useTranslation } from 'react-i18next'

const AddTeacherPage = () => {
    const { createTeacher, loadingModification } = useTeachers()

    const { t } = useTranslation()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (teacherForCreation: ITeacherForCreationDTO) => {
        const newUser = await createTeacher(teacherForCreation)
        toast({
            description: "Teacher created successfully",
        })
        navigate(`/admin/teachers/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Teachers', link: '/admin/teachers/all-teachers' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.TEACHER.ADD.TITLE')}</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditTeacherForm
                mode="ADD"
                loading={loadingModification}
                submit={(_id, teacher) => handleSubmit(teacher as ITeacherForCreationDTO)}
            />
        </>
    )
}

export default AddTeacherPage
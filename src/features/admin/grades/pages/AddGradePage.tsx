import { useGrades } from '../../hooks/useGrades'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IGradeForCreationDTO } from '../../models/IGrade'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditGradeForm from '../views/AddEditGradeForm'

const AddGradePage = () => {
    const { createGrade, loadingModification } = useGrades()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (gradeForCreation: IGradeForCreationDTO) => {
        const newUser = await createGrade(gradeForCreation)
        toast({
            description: "Grade created successfully",
        })
        navigate(`/admin/grades/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Grades', link: '/admin/grades/all-grades' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New grade</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditGradeForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, grade) => handleSubmit(grade as IGradeForCreationDTO)}
            />
        </>
    )
}

export default AddGradePage
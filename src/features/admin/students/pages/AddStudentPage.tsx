import { useStudents } from '../../hooks/useStudents'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { IStudentForCreationDTO } from '../../models/IStudent'
import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AddEditStudentForm from '../views/AddEditStudentForm'

const AddStudentPage = () => {
    const { createStudent, loadingModification } = useStudents()

    const { toast } = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (studentForCreation: IStudentForCreationDTO) => {
        const newUser = await createStudent(studentForCreation)
        toast({
            description: "Student created successfully",
        })
        navigate(`/admin/students/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Students', link: '/admin/students/all-students' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">New student</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditStudentForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, student) => handleSubmit(student as IStudentForCreationDTO)}
            />
        </>
    )
}

export default AddStudentPage
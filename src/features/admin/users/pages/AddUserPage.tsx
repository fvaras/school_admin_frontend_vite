import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditUserForm from "../views/AddEditUserForm"
import { useUsers } from "../../hooks"
import { IUserForCreationDTO } from "../../models/IUser"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const AddUserPage = () => {
    const { createUser, loadingModification } = useUsers()

    const { toast } = useToast()

    const { t } = useTranslation()

    const navigate = useNavigate()

    const handleSubmit = async (userForCreation: IUserForCreationDTO) => {
        const newUser = await createUser(userForCreation)
        toast({
            // title: "You submitted the following values:",
            // description: (
            //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            //     </pre>
            // ),
            description: "User created successfully",
        })
        navigate(`/admin/users/${newUser.id}`)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Users', link: '/admin/users/all-users' },
                { text: 'New' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.USER.ADD.TITLE')}</Heading>

            {/* <Heading variant="subtitle2">Optional subtitle can go here</Heading> */}

            <AddEditUserForm
                mode="ADD"
                loading={loadingModification}
                submit={(id, user) => handleSubmit(user as IUserForCreationDTO)}
            />
        </>
    )
}

export default AddUserPage
import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditUserForm from "../views/AddEditUserForm"
import { useParams } from "react-router-dom";
import { useUsers } from "../../hooks";
import { useEffect, useState } from "react";
import { IUser, IUserForUpdateDTO } from "../../models/IUser";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditUserPage = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

    let { userId } = useParams();

    const { toast } = useToast()

    const { t } = useTranslation()

    const { getUser, updateUser, loading, loadingModification } = useUsers()

    useEffect(() => {
        if (userId)
            loadData(userId)
    }, [userId])

    const loadData = async (userId: string) => {
        const user = await getUser(userId)
        // @ts-ignore
        setCurrentUser(user as IUser) // TODO: Set proper type
    }

    const handleSubmit = async (id: string, userForUpdate: IUserForUpdateDTO) => {
        await updateUser(id, userForUpdate)
        toast({
            description: "User updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Users', link: '/admin/users/all-users' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.USER.EDIT.TITLE')}</Heading>

            {(!loading && currentUser) &&
                <AddEditUserForm
                    mode="EDIT"
                    user={currentUser}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IUserForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditUserPage
import { Breadcrumbs, Heading } from "@/components/ui/custom"
import AddEditGuardianForm from "../views/AddEditGuardianForm"
import { useParams } from "react-router-dom";
import { useGuardians } from "../../hooks";
import { useEffect, useState } from "react";
import { IGuardianDTO, IGuardianForUpdateDTO } from "../../models/IGuardian";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";


const EditGuardianPage = () => {
    const [currentGuardian, setCurrentGuardian] = useState<IGuardianDTO | null>(null)

    const { t } = useTranslation()

    let { guardianId } = useParams();

    const { toast } = useToast()

    const { getGuardian, updateGuardian, loading, loadingModification } = useGuardians()

    useEffect(() => {
        if (guardianId)
            loadData(guardianId)
    }, [guardianId])

    const loadData = async (guardianId: string) => {
        const existingGuardian = await getGuardian(guardianId)
        setCurrentGuardian(existingGuardian)
    }

    const handleSubmit = async (id: string, userForUpdate: IGuardianForUpdateDTO) => {
        await updateGuardian(id, userForUpdate)
        toast({
            description: "Guardian updated successfully",
        })
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Guardians', link: '/admin/guardians/all-guardians' },
                { text: 'Edit' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.GUARDIAN.EDIT.TITLE')}</Heading>

            {(!loading && currentGuardian) &&
                <AddEditGuardianForm
                    mode="EDIT"
                    guardian={currentGuardian}
                    loading={loadingModification}
                    submit={(id, user) => handleSubmit(id!, user as IGuardianForUpdateDTO)}
                />
            }
        </>
    )
}

export default EditGuardianPage
import { useState } from "react";
import { IGuardianTableRowDTO, IGuardianDTO, IGuardianForCreationDTO, IGuardianForUpdateDTO } from "../models/IGuardian";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useGuardians = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    // const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllGuardians = async (): Promise<IGuardianTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IGuardianTableRowDTO[]>('api/guardian')
        setLoading(false)
        return data
    }

    const getGuardian = async (userId: string): Promise<IGuardianDTO> => {
        setLoading(true)
        const { data } = await axios.get<IGuardianDTO>(`api/guardian/${userId}`)
        setLoading(false)
        return data
    }

    const createGuardian = async (user: IGuardianForCreationDTO): Promise<IGuardianDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IGuardianDTO>(`api/guardian/`, user)
            return data
        } catch (err) {
            return {} as IGuardianDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateGuardian = async (id: string, user: IGuardianForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IGuardianForUpdateDTO>(`api/guardian/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteGuardian = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/guardian/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getGuardiansForList = async (nameOrRut: string): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>(`api/guardian/forList?text=${encodeURIComponent(nameOrRut)}`)
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        // error,
        getAllGuardians,
        getGuardian,
        createGuardian,
        updateGuardian,
        deleteGuardian,
        getGuardiansForList
    }
}
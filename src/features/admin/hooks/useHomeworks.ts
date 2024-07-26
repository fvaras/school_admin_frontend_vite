import { useState } from "react";
import { IHomeworkTableRowDTO, IHomeworkDTO, IHomeworkForCreationDTO, IHomeworkForUpdateDTO } from "../models/IHomework";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useHomeworks = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllHomeworks = async (): Promise<IHomeworkTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IHomeworkTableRowDTO[]>('api/homework')
        setLoading(false)
        return data
    }

    const getHomework = async (userId: string): Promise<IHomeworkDTO> => {
        setLoading(true)
        const { data } = await axios.get<IHomeworkDTO>(`api/homework/${userId}`)
        setLoading(false)
        return data
    }

    const createHomework = async (user: IHomeworkForCreationDTO): Promise<IHomeworkDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IHomeworkDTO>(`api/homework/`, user)
            return data
        } catch (err) {
            return {} as IHomeworkDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateHomework = async (id: string, user: IHomeworkForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IHomeworkForUpdateDTO>(`api/homework/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteHomework = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/homework/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    return {
        loading,
        loadingModification,
        error,
        getAllHomeworks,
        getHomework,
        createHomework,
        updateHomework,
        deleteHomework,
    }
}
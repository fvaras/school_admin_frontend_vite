import { useState } from "react";
import { IPlanningTableRowDTO, IPlanningDTO, IPlanningForCreationDTO, IPlanningForUpdateDTO } from "../models/IPlanning";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const usePlannings = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllPlannings = async (): Promise<IPlanningTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningTableRowDTO[]>('api/planning')
        setLoading(false)
        return data
    }

    const getPlanning = async (userId: string): Promise<IPlanningDTO> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningDTO>(`api/planning/${userId}`)
        setLoading(false)
        return data
    }

    const createPlanning = async (user: IPlanningForCreationDTO): Promise<IPlanningDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IPlanningDTO>(`api/planning/`, user)
            return data
        } catch (err) {
            return {} as IPlanningDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updatePlanning = async (id: string, user: IPlanningForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IPlanningForUpdateDTO>(`api/planning/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deletePlanning = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/planning/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getTeachersId = async (id: string): Promise<string[]> => {
        // setLoading(true)
        const { data } = await axios.get<string[]>(`api/planning/teachersId/${id}`)
        // setLoading(false)
        return data
    }

    const getPlanningsForList = async (): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/planning/forList')
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        error,
        getAllPlannings,
        getPlanning,
        createPlanning,
        updatePlanning,
        deletePlanning,
        getTeachersId,
        getPlanningsForList
    }
}
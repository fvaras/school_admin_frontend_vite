import { useState } from "react";
import { IPlanningTableRowDTO, IPlanningDTO, IPlanningForCreationDTO, IPlanningForUpdateDTO } from "../models/IPlanning";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const usePlannings = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllTeacherPlannings = async (subjectId: string): Promise<IPlanningTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningTableRowDTO[]>(`api/teacher/planning/bySubject/${subjectId}`)
        setLoading(false)
        return data
    }

    const getPlanning = async (planningId: string): Promise<IPlanningDTO> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningDTO>(`api/teacher/planning/${planningId}`)
        setLoading(false)
        return data
    }

    const createPlanning = async (user: IPlanningForCreationDTO): Promise<string> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<string>(`api/teacher/planning/`, user)
            return data
        } catch (err) {
            return {} as string
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updatePlanning = async (id: string, user: IPlanningForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IPlanningForUpdateDTO>(`api/teacher/planning/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deletePlanning = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/teacher/planning/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getTeachersId = async (id: string): Promise<string[]> => {
        // setLoading(true)
        const { data } = await axios.get<string[]>(`api/teacher/planning/teachersId/${id}`)
        // setLoading(false)
        return data
    }

    const getPlanningsForList = async (): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/teacher/planning/forList')
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        error,
        getAllTeacherPlannings,
        getPlanning,
        createPlanning,
        updatePlanning,
        deletePlanning,
        getTeachersId,
        getPlanningsForList
    }
}
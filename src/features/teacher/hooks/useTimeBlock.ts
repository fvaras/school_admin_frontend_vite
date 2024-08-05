import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { ITimeBlockDTO, ITimeBlockForCreationDTO, ITimeBlockForUpdateDTO, ITimeBlockTableRowDTO } from "../models/ITimeBlock";

export const useTimeBlock = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    const getAllTimeBlocks = async (gradeId: string): Promise<ITimeBlockTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ITimeBlockTableRowDTO[]>(`api/timeBlock/byGrade/${gradeId}`)
        setLoading(false)
        return data
    }

    const getTimeBlock = async (timeblockId: string): Promise<ITimeBlockDTO> => {
        setLoading(true)
        const { data } = await axios.get<ITimeBlockDTO>(`api/timeBlock/${timeblockId}`)
        setLoading(false)
        return data
    }

    const createTimeBlock = async (timeBlock: ITimeBlockForCreationDTO): Promise<ITimeBlockTableRowDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<ITimeBlockTableRowDTO>(`api/timeBlock/`, timeBlock)
            return data
        } catch (err) {
            return {} as ITimeBlockTableRowDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateTimeBlock = async (id: string, timeBlock: ITimeBlockForUpdateDTO): Promise<ITimeBlockTableRowDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.put<ITimeBlockTableRowDTO>(`api/timeBlock/${id}`, timeBlock)
            return data
        } catch (err) {
            return {} as ITimeBlockTableRowDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteTimeBlock = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/timeBlock/${id}`)
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
        getAllTimeBlocks,
        getTimeBlock,
        createTimeBlock,
        updateTimeBlock,
        deleteTimeBlock,
    }
}
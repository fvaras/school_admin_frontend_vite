import { useState } from "react";
import { IGradeDTO, IGradeForCreationDTO, IGradeForUpdateDTO } from "../models/IGrade";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useGrades = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    // const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllGrades = async (): Promise<IGradeDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IGradeDTO[]>('api/grade')
        setLoading(false)
        return data
    }

    const getGrade = async (userId: string): Promise<IGradeDTO> => {
        setLoading(true)
        const { data } = await axios.get<IGradeDTO>(`api/grade/${userId}`)
        setLoading(false)
        return data
    }

    const createGrade = async (user: IGradeForCreationDTO): Promise<IGradeDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IGradeDTO>(`api/grade/`, user)
            return data
        } catch (err) {
            return {} as IGradeDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateGrade = async (id: string, user: IGradeForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IGradeForUpdateDTO>(`api/grade/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteGrade = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/grade/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getTeachersId = async (id: string): Promise<string[]> => {
        // setLoading(true)
        const { data } = await axios.get<string[]>(`api/grade/teachersId/${id}`)
        // setLoading(false)
        return data
    }

    const getGradesForList = async (): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/grade/forList')
        // setLoading(false)
        return data
    }

    const getGradesForListByTeacher = async (): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/grade/forListByTeacher')
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        // error,
        getAllGrades,
        getGrade,
        createGrade,
        updateGrade,
        deleteGrade,
        getTeachersId,
        getGradesForList,
        getGradesForListByTeacher
    }
}
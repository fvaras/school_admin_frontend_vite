import { useState } from "react";
import { ITeacherDTO, ITeacherForCreationDTO, ITeacherForUpdateDTO } from "../models/ITeacher";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useTeachers = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllTeachers = async (): Promise<ITeacherDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ITeacherDTO[]>('api/teacher')
        setLoading(false)
        return data
    }

    const getTeacher = async (userId: string): Promise<ITeacherDTO> => {
        setLoading(true)
        const { data } = await axios.get<ITeacherDTO>(`api/teacher/${userId}`)
        setLoading(false)
        return data
    }

    const createTeacher = async (user: ITeacherForCreationDTO): Promise<ITeacherDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<ITeacherDTO>(`api/teacher/`, user)
            return data
        } catch (err) {
            return {} as ITeacherDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateTeacher = async (id: string, user: ITeacherForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<ITeacherForUpdateDTO>(`api/teacher/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteTeacher = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/teacher/${id}`)
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
        getAllTeachers,
        getTeacher,
        createTeacher,
        updateTeacher,
        deleteTeacher
    }
}
import { useState } from "react";
import { IStudentTableRowDTO, IStudentDTO, IStudentForCreationDTO, IStudentForUpdateDTO } from "../models/IStudent";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useStudents = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllStudents = async (): Promise<IStudentTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IStudentTableRowDTO[]>('api/student')
        setLoading(false)
        return data
    }

    const getAllStudentsByGrade = async (gradeId: string): Promise<IStudentTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IStudentTableRowDTO[]>(`api/student/byGrade/${encodeURIComponent(gradeId)}`)
        setLoading(false)
        return data
    }

    const getStudent = async (userId: string): Promise<IStudentDTO> => {
        setLoading(true)
        const { data } = await axios.get<IStudentDTO>(`api/student/${userId}`)
        setLoading(false)
        return data
    }

    const createStudent = async (user: IStudentForCreationDTO): Promise<IStudentDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IStudentDTO>(`api/student/`, user)
            return data
        } catch (err) {
            return {} as IStudentDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateStudent = async (id: string, user: IStudentForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IStudentForUpdateDTO>(`api/student/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteStudent = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/student/${id}`)
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
        getAllStudents,
        getAllStudentsByGrade,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent
    }
}
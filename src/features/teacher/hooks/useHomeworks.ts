import { useState } from "react";
import { IHomeworkTableRowDTO, IHomeworkDTO, IHomeworkForCreationDTO, IHomeworkForUpdateDTO } from "../models/IHomework";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useHomeworks = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllHomeworksByTeacher = async (subjectId: string): Promise<IHomeworkTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IHomeworkTableRowDTO[]>(`api/teacher/homework/bySubject/${subjectId}`)
        setLoading(false)
        return data
    }

    const getHomework = async (homeworkId: string): Promise<IHomeworkDTO> => {
        setLoading(true)
        const { data } = await axios.get<IHomeworkDTO>(`api/teacher/homework/${homeworkId}`)
        setLoading(false)
        return data
    }

    const createHomework = async (user: IHomeworkForCreationDTO): Promise<string> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<string>(`api/teacher/homework/`, user)
            return data
        } catch (err) {
            return {} as string
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateHomework = async (id: string, user: IHomeworkForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IHomeworkForUpdateDTO>(`api/teacher/homework/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteHomework = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/teacher/homework/${id}`)
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
        getAllHomeworksByTeacher,
        getHomework,
        createHomework,
        updateHomework,
        deleteHomework,
    }
}
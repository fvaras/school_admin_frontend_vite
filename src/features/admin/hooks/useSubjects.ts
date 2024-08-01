import { useState } from "react";
import { ISubjectDTO, ISubjectForCreationDTO, ISubjectForUpdateDTO } from "../models/ISubject";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useSubjects = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllSubjects = async (): Promise<ISubjectDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ISubjectDTO[]>('api/subject')
        setLoading(false)
        return data
    }

    const getSubject = async (userId: string): Promise<ISubjectDTO> => {
        setLoading(true)
        const { data } = await axios.get<ISubjectDTO>(`api/subject/${userId}`)
        setLoading(false)
        return data
    }

    const createSubject = async (user: ISubjectForCreationDTO): Promise<ISubjectDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<ISubjectDTO>(`api/subject/`, user)
            return data
        } catch (err) {
            return {} as ISubjectDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateSubject = async (id: string, user: ISubjectForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<ISubjectForUpdateDTO>(`api/subject/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteSubject = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/subject/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getTeachersId = async (id: string): Promise<string[]> => {
        // setLoading(true)
        const { data } = await axios.get<string[]>(`api/subject/teachersId/${id}`)
        // setLoading(false)
        return data
    }

    const getByGradeAndTeacherForList = async (gradeId: string): Promise<LabelValueDTO<string>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>(`api/subject/byGradeAndTeacherForList/${gradeId}`)
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        error,
        getAllSubjects,
        getSubject,
        createSubject,
        updateSubject,
        deleteSubject,
        getTeachersId,
        getByGradeAndTeacherForList
    }
}
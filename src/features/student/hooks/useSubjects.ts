import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useSubjects = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getByGradeAndTeacherForList = async (gradeId: string): Promise<LabelValueDTO<string>[]> => {
        setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>(`api/subject/byGradeAndTeacherForList/${gradeId}`)
        setLoading(false)
        return data
    }

    return {
        loading,
        error,
        getByGradeAndTeacherForList
    }
}
import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useGrades = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getGradesForListByTeacher = async (): Promise<LabelValueDTO<string>[]> => {
        setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/grade/forListByTeacher')
        setLoading(false)
        return data
    }

    return {
        loading,
        error,
        getGradesForListByTeacher
    }
}
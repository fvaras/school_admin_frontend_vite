import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { PKFKPair } from "@/models/TLabelValueDTO";

export const useSubjects = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getWithGradeByTeacherForList = async (): Promise<PKFKPair<string, string>[]> => {
        setLoading(true)
        const { data } = await axios.get<PKFKPair<string, string>[]>(`api/teacher/subject/`)
        setLoading(false)
        return data
    }

    return {
        loading,
        error,
        getWithGradeByTeacherForList
    }
}
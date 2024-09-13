import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useGrades = () => {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    const getGradesByTeacherForList = async (): Promise<LabelValueDTO<string>[]> => {
        setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/teacher/grade/byMain/list')
        setLoading(false)
        return data
    }

    // const getGradesByTeacherForList = async (): Promise<LabelValueDTO<string>[]> => {
    //     setLoading(true)
    //     const { data } = await axios.get<LabelValueDTO<string>[]>('api/teacher/grade/byMain/list')
    //     setLoading(false)
    //     return data
    // }

    return {
        loading,
        // error,
        getGradesByTeacherForList // TODO: Maybe wil be necessary to remove this function
    }
}
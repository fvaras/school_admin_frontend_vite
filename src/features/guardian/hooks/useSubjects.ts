import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useSubjects = () => {
    const [loading, setLoading] = useState(false);

    const getByStudentForList = async (studentId: string): Promise<LabelValueDTO<string>[]> => {
        setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>(`api/subject/guardian/${studentId}/list`)
        setLoading(false)
        return data
    }

    return {
        loading,
        getByStudentForList
    }
}
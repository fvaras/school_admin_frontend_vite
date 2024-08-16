import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useStudents = () => {
    const [loading, setLoading] = useState(false);

    const getStudentsByGuardian = async (): Promise<LabelValueDTO<string>[]> => {
        setLoading(true)
        const { data } = await axios.get<LabelValueDTO<string>[]>('api/guardian/student/forList')
        setLoading(false)
        return data
    }

    return {
        loading,
        getStudentsByGuardian
    }
}
import { useState } from "react";
import { IPlanningTableRowDTO } from "../models/IPlanning";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const usePlannings = () => {
    const [loading, setLoading] = useState(false);

    // const { t } = useTranslation();

    const getPlanningsByStudentAndSubject = async (studentId: string, subjectId: string): Promise<IPlanningTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningTableRowDTO[]>(`api/guardian/planning/${encodeURIComponent(studentId)}/${encodeURIComponent(subjectId)}`)
        setLoading(false)
        return data
    }

    return {
        loading,
        getPlanningsByStudentAndSubject
    }
}
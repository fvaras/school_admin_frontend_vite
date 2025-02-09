import { useState } from "react";
import { IPlanningTableRowDTO } from "../models/IPlanning";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const usePlannings = () => {
    const [loading, setLoading] = useState(false);

    // const { t } = useTranslation();

    const getAllPlannings = async (subjectId: string): Promise<IPlanningTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IPlanningTableRowDTO[]>(`api/student/planning/${encodeURIComponent(subjectId)}`)
        setLoading(false)
        return data
    }

    return {
        loading,
        getAllPlannings
    }
}
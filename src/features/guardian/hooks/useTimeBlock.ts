import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { ITimeBlockTableRowDTO } from "../models/ITimeBlock";

export const useTimeBlock = () => {
    const [loading, setLoading] = useState(false);

    const getAllTimeBlocksByStudent = async (studentId: string): Promise<ITimeBlockTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ITimeBlockTableRowDTO[]>(`api/guardian/timeBlock/byStudent/${studentId}`)
        setLoading(false)
        return data
    }

    return {
        loading,
        getAllTimeBlocksByStudent,
    }
}
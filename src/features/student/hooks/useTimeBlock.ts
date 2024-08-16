import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { ITimeBlockTableRowDTO } from "../models/ITimeBlock";

export const useTimeBlock = () => {
    const [loading, setLoading] = useState(false);

    const getAllTimeBlocks = async (gradeId: string): Promise<ITimeBlockTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ITimeBlockTableRowDTO[]>(`api/timeBlock/byGrade/${gradeId}`)
        setLoading(false)
        return data
    }

    return {
        loading,
        getAllTimeBlocks,
    }
}
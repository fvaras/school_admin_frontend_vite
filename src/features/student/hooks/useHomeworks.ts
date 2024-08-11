import { useState } from "react";
import { IHomeworkTableRowDTO } from "../models/IHomework";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useHomeworks = () => {
    const [loading, setLoading] = useState(false);

    // const { t } = useTranslation();

    const getAllHomeworks = async (): Promise<IHomeworkTableRowDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<IHomeworkTableRowDTO[]>('api/homework')
        setLoading(false)
        return data
    }

    return {
        loading,
        getAllHomeworks
    }
}
import { useState } from "react";
import { IUser } from "../models/IUser";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllUsers = async (): Promise<IUser[]> => {
        setLoading(true)
        const { data } = await axios.get<IUser[]>('api/user')
        setLoading(false)
        return data
    }

    return {
        loading,
        error,
        getAllUsers
    }
}
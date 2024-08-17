import { useState } from "react";
import { IUser, IUserDTO, IUserForCreationDTO, IUserForUpdateDTO } from "../models/IUser";
import { axiosAuthInstance as axios } from "@/lib/axios";

export const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllUsers = async (): Promise<IUser[]> => {
        setLoading(true)
        const { data } = await axios.get<IUser[]>('api/user')
        setLoading(false)
        return data
    }

    const getUser = async (userId: string): Promise<IUserDTO> => {
        setLoading(true)
        const { data } = await axios.get<IUserDTO>(`api/user/${userId}`)
        setLoading(false)
        return data
    }

    const getUserByRut = async (rut: string): Promise<IUserDTO> => {
        setLoading(true)
        const { data } = await axios.get<IUserDTO>(`api/user/byRut?rut=${encodeURIComponent(rut)}`)
        setLoading(false)
        return data
    }

    const createUser = async (user: IUserForCreationDTO): Promise<IUserDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<IUserDTO>(`api/user/`, user)
            return data
        } catch (err) {
            return {} as IUserDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateUser = async (id: string, user: IUserForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<IUserForUpdateDTO>(`api/user/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteUser = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/user/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    return {
        loading,
        loadingModification,
        error,
        getAllUsers,
        getUser,
        getUserByRut,
        createUser,
        updateUser,
        deleteUser
    }
}
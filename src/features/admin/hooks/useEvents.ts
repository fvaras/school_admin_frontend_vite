import { useState } from "react";
import { ICalendarEventDTO, ICalendarEventForCreationDTO, ICalendarEventForUpdateDTO } from "../models/IEvent";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO } from "@/models/TLabelValueDTO";

export const useEvents = () => {
    const [loading, setLoading] = useState(false);
    const [loadingModification, setLoadingModification] = useState(false);
    const [error, setError] = useState('');

    // const { t } = useTranslation();

    const getAllEvents = async (): Promise<ICalendarEventDTO[]> => {
        setLoading(true)
        const { data } = await axios.get<ICalendarEventDTO[]>('api/calendarevent')
        setLoading(false)
        return data
    }

    const getEvent = async (userId: string): Promise<ICalendarEventDTO> => {
        setLoading(true)
        const { data } = await axios.get<ICalendarEventDTO>(`api/calendarevent/${userId}`)
        setLoading(false)
        return data
    }

    const createEvent = async (user: ICalendarEventForCreationDTO): Promise<ICalendarEventDTO> => {
        try {
            setLoadingModification(true)
            const { data } = await axios.post<ICalendarEventDTO>(`api/calendarevent/`, user)
            return data
        } catch (err) {
            return {} as ICalendarEventDTO
        }
        finally {
            setLoadingModification(false)
        }
    }

    const updateEvent = async (id: string, user: ICalendarEventForUpdateDTO): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.put<ICalendarEventForUpdateDTO>(`api/calendarevent/${id}`, user)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const deleteEvent = async (id: string): Promise<void> => {
        try {
            setLoadingModification(true)
            await axios.delete(`api/calendarevent/${id}`)
        } catch (err) {
        }
        finally {
            setLoadingModification(false)
        }
    }

    const getEventTypes = async (): Promise<LabelValueDTO<number>[]> => {
        // setLoading(true)
        const { data } = await axios.get<LabelValueDTO<number>[]>('api/calendarevent/types')
        // setLoading(false)
        return data
    }

    return {
        loading,
        loadingModification,
        error,
        getAllEvents,
        getEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventTypes
    }
}
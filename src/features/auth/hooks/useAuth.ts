import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthInfoDTO } from '../../../models/User';
import axios from '@/lib/axios';
import { ADMINISTRATOR_PROFILE_ID, GUARDIAN_PROFILE_ID, STUDENT_PROFILE_ID, TEACHER_PROFILE_ID } from '@/constants/profile';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const login = async (username: string, password: string, profileId: number): Promise<AuthInfoDTO | null> => {
        const { data } = await axios.post<AuthInfoDTO>('api/auth/tkn', { username, password, profileId })
        console.log(data)
        const { user } = data
        if (!user) return user
        try {
            const role = user.profileId;

            switch (role) {
                case ADMINISTRATOR_PROFILE_ID:
                    navigate('/admin/users/all-users');
                    break;
                case TEACHER_PROFILE_ID:
                    navigate('/teacher/weekly-schedule');
                    break;
                case STUDENT_PROFILE_ID:
                    navigate('/student/weekly-schedule');
                    break;
                case GUARDIAN_PROFILE_ID:
                    navigate('/guardian/weekly-schedule');
                    break;
                default:
                    navigate('/authentication/signin');
            }
        } catch (err) {
            setError(t('LOGIN.LOGIN_ERROR'));
        } finally {
            setLoading(false);
            return data
        }
    }

    const getProfilesArray = (): { value: string; label: string }[] =>
        [
            { value: ADMINISTRATOR_PROFILE_ID, label: "Administrator" },
            { value: TEACHER_PROFILE_ID, label: "Teacher" },
            { value: STUDENT_PROFILE_ID, label: "Student" },
            { value: GUARDIAN_PROFILE_ID, label: "Guardian" },
        ]

    return {
        login,
        loading,
        error,
        getProfilesArray
    };
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthInfoDTO } from '../../../models/User';
import axios from '@/lib/axios';

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
                case 1: //'Admin':
                    navigate('/admin/users/all-users');
                    break;
                case 2: //'Teacher':
                    navigate('/teacher/weekly-schedule');
                    break;
                case 3: //'Student':
                    navigate('/student/weekly-schedule');
                    break;
                case 4: //'Guardian':
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

    return {
        login,
        loading,
        error,
    };
};

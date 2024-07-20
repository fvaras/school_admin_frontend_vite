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
                case "ccd8f71e-b6a6-4b04-84cf-ee3bcea3999c": //'Admin':
                    navigate('/admin/users/all-users');
                    break;
                case "398d52f1-0d94-40f9-8ef2-bc801c714490": //'Teacher':
                    navigate('/teacher/weekly-schedule');
                    break;
                case "521c2799-f386-4ea2-ba2f-64a81f86fd9d": //'Student':
                    navigate('/student/weekly-schedule');
                    break;
                case "9282b9d9-4c59-41c9-859a-58d37551fcae": //'Guardian':
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

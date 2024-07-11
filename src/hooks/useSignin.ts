import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { AuthService } from '@core';

export const useSignin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            //   const user = await AuthService.login(data.username, data.password, data.profileId);
            const user = { role: 'Admin' };
            const role = user.role;

            switch (role) {
                case 'Admin':
                    navigate('/admin/events/all-events');
                    break;
                case 'Teacher':
                    navigate('/teacher/weekly-schedule');
                    break;
                case 'Student':
                    navigate('/student/weekly-schedule');
                    break;
                case 'Guardian':
                    navigate('/guardian/weekly-schedule');
                    break;
                default:
                    navigate('/authentication/signin');
            }
        } catch (err) {
            setError(t('LOGIN.LOGIN_ERROR'));
        } finally {
            setLoading(false);
        }
    };

    return {
        onSubmit,
        loading,
        error,
    };
};

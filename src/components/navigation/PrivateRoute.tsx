// PrivateRoute.tsx
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    children: React.ReactElement
    allowedProfiles: string[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedProfiles }) => {
    const { user, authStarted, loading } = useAppSelector((state) => state.auth);

    console.log(authStarted, user, loading)

    if (authStarted && !loading && !allowedProfiles.includes(user?.profileId!)) {
        return <Navigate to="/auth/signin" replace />
    }

    return children
}

export default PrivateRoute;

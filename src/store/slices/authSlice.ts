import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfoDTO, UserInfoDTO } from '../../models/User';
import axios from '../../library/axios';
import { AppThunk, RootState } from '../store';
import { AxiosError } from 'axios';

export interface AuthState {
    user: UserInfoDTO | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        },
        setAuthSuccess: (state, { payload }: PayloadAction<{ user: UserInfoDTO, token: string }>) => {
            state.user = payload.user
            state.token = payload.token
            state.error = null
            // state.isAuth = true
        },
        setLogOut: (state) => {
            // state.isAuth = false
            state.user = null
            state.token = null
            state.error = null
        },
        setAuthFailed: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            // state.isAuth = false
        },
        // setCustomSessionId: (state, { payload }: PayloadAction<string>) => {
        //     state.customSessionId = payload
        // }
    }
})

export const { setLoading, setAuthSuccess, setLogOut, setAuthFailed } = authSlice.actions

export const logIn = (username: string, password: string, profileId: number): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { data } = await axios.post<AuthInfoDTO>('api/auth/tkn', { username, password, profileId })
        localStorage.clear()
        localStorage.setItem('tkn', data.token)
        dispatch(setAuthSuccess({ user: data.user, token: data.token }))
    } catch (error) {
        const axiosError = error as AxiosError
        const errorData: string = axiosError.response?.status === 401 ? 'Forbidden' : 'Not Allowed'
        dispatch(setAuthFailed(errorData))
    } finally {
        dispatch(setLoading(false))
    }
}

export const logOut = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        // await axios.post('/auth/logout', {})
        localStorage.clear()
        dispatch(setLogOut())
    } catch (error) {
        dispatch(setAuthFailed(error as string))
    } finally {
        dispatch(setLoading(false))
    }
}

export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer

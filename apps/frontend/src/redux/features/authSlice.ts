import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@/types/auth';

type AuthPropsState = {
    user: TUser | null;
    access_token: string | null;
    refresh_token: string | null;
};

const initialState: AuthPropsState = {
    user: null,
    access_token: null,
    refresh_token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refresh_token = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        }
    }
});

export const {
    setAuthUser,
    setAccessToken,
    setRefreshToken,
    logOutUser
} = authSlice.actions;

export default authSlice.reducer;

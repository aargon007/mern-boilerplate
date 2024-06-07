import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthPropsState = {
    user: {
        name: string;
        email: string;
    } | null;
    access_token: string | null;
};

const initialState: AuthPropsState = {
    user: null,
    access_token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (
            state,
            action: PayloadAction<{ name: string; email: string } | null>
        ) => {
            state.user = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
        }
    }
});

export const { setAuthUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;

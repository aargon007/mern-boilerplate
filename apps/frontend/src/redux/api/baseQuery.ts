import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logOutUser, setAccessToken } from '../features/authSlice';
import { RootState } from '../store';

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        // Add app version header
        // headers.set('version', "web - v1.0.0");

        return headers;
    }
});

export const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    let result: any = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 || result?.data?.statusCode === 401 || result?.error?.statusCode === 401) {
        //* Send Refresh
        console.log('Sending refresh token');

        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult: any = await baseQuery(
                    {
                        url: "/auth/refresh",
                        method: 'GET'
                    },
                    api, extraOptions);

                if (refreshResult?.data?.statusCode === 200) {
                    api.dispatch(setAccessToken(refreshResult?.data?.data));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log('logouted');
                    api.dispatch(logOutUser());
                }
            } catch (err) {
                console.log(err);
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result;
};

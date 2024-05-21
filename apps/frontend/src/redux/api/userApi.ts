import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // send otp
        sendOtp: builder.mutation({
            query: data => {
                // console.log(data);
                return {
                    url: '/auth/send-otp',
                    method: "POST",
                    body: data
                }
            }
        }),
        // verify otp
        verifyOTP: builder.mutation({
            query: data => {
                // console.log(data);

                return {
                    url: `/auth/verify-otp`,
                    method: "POST",
                    body: data
                }
            }
        }),
        //activvate package
        setPackage: builder.mutation({
            query: data => {
                console.log(data);

                return {
                    url: "/subscription/active-package",
                    method: "POST",
                    body: data
                }
            }
        }),
        // emergency log out
        logout: builder.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: "POST"
            })
        }),
        // get user data
        // getUser: builder.query({
        //     query: () => ({
        //         url: "/auth"
        //     }),
        //     providesTags: ["user"]
        // }),
    }),
});


export const {
    useSendOtpMutation,
    useVerifyOTPMutation,
    useSetPackageMutation
} = userApi;

export default userApi;
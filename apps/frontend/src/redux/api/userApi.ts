import api from "./apiSlice";

const userApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // POST,PUT
        login: builder.mutation({
            query: (data) => {
                // console.log(data);
                return {
                    url: '/auth/send-otp',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['user']
        }),
        // GET user data
        getUser: builder.query({
            query: () => ({
                url: "/auth",
                method: "GET"
            }),
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     try {
            //         const result = (await queryFulfilled).data;
            //         dispatch(setUser(result?.data?.userData));

            //         console.log("user data synced.");
            //     } catch (error) {
            //         console.error("Failed to fetch user data:", error);
            //     }
            // },
            providesTags: ["user"]
        }),

    })
});

export const {
    useLoginMutation,
    useGetUserQuery
} = userApi;

export default userApi;

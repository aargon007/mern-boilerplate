import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";

const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefreshToken,

    tagTypes: ["user"],
    endpoints: () => ({}),
});

export default api;
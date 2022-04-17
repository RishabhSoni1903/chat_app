import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service user a base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001',
    }),

    endpoints: (builder) => ({

        // Signup user
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),

        // Login user
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user,
            }),
        }),

        // Logout user
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/logout',
                method: 'DELETE',
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;
export default appApi;
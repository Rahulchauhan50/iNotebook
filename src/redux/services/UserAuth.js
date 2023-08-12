import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}/auth/`,
    prepareHeaders: (headers) => {
      headers.set('auth-token', localStorage.getItem("token")) 
      headers.set('Content-Type', 'application/json')

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: ({profileImage, fristName, lastName, email, password }) => ({
        url: 'signup',
        method: 'POST',
        body:JSON.stringify({profileImage, fristName, lastName, email, password })
      }),
    }),
    userLogin: builder.mutation({
      query: ({email,password}) => ({
        url: 'login',
        method: 'POST',
        body:JSON.stringify({ email, password })
      }),
    }),
    userAuthentication: builder.mutation({
      query: () => ({
        url: 'getuser',
        method: 'POST',
    
      }),
    }),

  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
  useUserAuthenticationMutation,

} = UserAuthApi;
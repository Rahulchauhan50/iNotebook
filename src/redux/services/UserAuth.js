import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers) => {
      headers.set();

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getTopCharts: builder.query(),

  }),
});

export const {
  useGetTopChartsQuery,

} = UserAuthApi;
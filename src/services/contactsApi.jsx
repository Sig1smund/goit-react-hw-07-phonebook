import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://629e45693dda090f3c17082d.mockapi.io' }),
  endpoints: (builder) => ({
    getContactByName: builder.query({
      query: (name) => `/contacts/${name}`,
    }),
  }),
})

export const { useGetContactByNameQuery } = contactApi;
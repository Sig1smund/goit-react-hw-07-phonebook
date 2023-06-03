import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://629e45693dda090f3c17082d.mockapi.io/contacts",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: "/contacts",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} = contactApi;

export const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    elements: [],
  },
  reducers: {
    addContact(state, { payload }) {
      state.elements = [...state.elements, payload];
    },
    removeContact(state, { payload }) {
      state.elements = state.elements.filter((item) => item.id !== payload);
    },
  },
});

export const { addContact, removeContact } = contactSlice.actions;

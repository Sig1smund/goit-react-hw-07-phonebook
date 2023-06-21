import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
	reducerPath: 'contactApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://6492c9c8428c3d2035d0af1e.mockapi.io/',
	}),
	tagTypes: ['Contact'],
	endpoints: builder => ({
		fetchContacts: builder.query({
			query: () => '/contacts',
			providesTags: ['Contact'],
		}),
		deleteContact: builder.mutation({
			query: contactId => ({
				url: `/contacts/${contactId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Contact'],
		}),
		addContact: builder.mutation({
			query: newContact => ({
				url: '/contacts',
				method: 'POST',
				body: newContact,
			}),
			invalidatesTags: ['Contact'],
		}),
	}),
});

export const {
	useFetchContactsQuery,
	useDeleteContactMutation,
	useAddContactMutation,
} = contactApi;

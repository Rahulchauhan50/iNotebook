import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

export const UserDataApi = createApi({
  reducerPath: 'UserDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}/data/`,
    prepareHeaders: (headers) => {
      headers.set('auth-token', localStorage.getItem("token")) 
      headers.set('Content-Type', 'application/json')

      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getData: builder.query({ query: () => 'get-data' }),
    Notes: builder.mutation({
      query: ({folderName }) => ({
        url: 'notes',
        method: 'POST',
        body:JSON.stringify({folderName})
      }),
    }),
    SearchNotes: builder.mutation({
      query: ({folderName, titleSubstring }) => ({
        url: 'search-notes',
        method: 'POST',
        body:JSON.stringify({folderName, titleSubstring})
      }),
    }),
    addFolder: builder.mutation({
      query: ({folderName }) => ({
        url: 'add-folder',
        method: 'POST',
        body:JSON.stringify({folderName})
      }),
    }),
    addNote: builder.mutation({
      query: ({folderName, title, description }) => ({
        url: 'add-note',
        method: 'POST',
        body:JSON.stringify({folderName, title, description})
      }),
    }),
    addNoteContent: builder.mutation({
      query: ({folderName, title, content }) => ({
        url: 'add-note-content',
        method: 'POST',
        body:JSON.stringify({folderName, title, content})
      }),
    }),
    renameFolder: builder.mutation({
      query: ({oldFolderName,newFolderName }) => ({
        url: 'update-folder',
        method: 'POST',
        body:JSON.stringify({oldFolderName,newFolderName})
      }),
    }),
    deleteFolder: builder.mutation({
      query: ({folderNameToDelete }) => ({
        url: 'delete-folder',
        method: 'DELETE',
        body:JSON.stringify({folderNameToDelete})
      }),
    }),
    deleteNote: builder.mutation({
      query: ({folderName, title }) => ({
        url: 'delete-note',
        method: 'DELETE',
        body:JSON.stringify({folderName, title})
      }),
    }),

  }),
});

export const {
  useGetDataQuery,
  useSearchNotesMutation,
  useNotesMutation,
  useAddFolderMutation,
  useAddNoteMutation,
  useAddNoteContentMutation,
  useRenameFolderMutation,
  useDeleteFolderMutation,
  useDeleteNoteMutation,
} = UserDataApi;
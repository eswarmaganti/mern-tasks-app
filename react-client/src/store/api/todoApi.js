import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "http://localhost:5001/api/v1";

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todo"],
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/todo/` }),
  endpoints: (builder) => ({
    addNewTodo: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    fetchAllTodos: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    getATodo: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),

      providesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ data, todo_id }) => ({
        url: `/${todo_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useAddNewTodoMutation,
  useFetchAllTodosQuery,
  useDeleteTodoMutation,
  useLazyGetATodoQuery,
  useGetATodoQuery,
  useUpdateTodoMutation,
} = todoApi;

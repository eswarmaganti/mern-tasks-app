import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "/api/v1";

export const tasksApi = createApi({
  reducerPath: "tasks",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/tasks/` }),
  endpoints: (builder) => ({
    addNewTask: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    fetchAllTasks: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    getATask: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),

      providesTags: ["Tasks"],
    }),
    updateTasks: builder.mutation({
      query: ({ data, todo_id }) => ({
        url: `/${todo_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTaskStats: builder.query({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddNewTaskMutation,
  useFetchAllTasksQuery,
  useDeleteTaskMutation,
  useLazyGetATaskQuery,
  useGetATaskQuery,
  useUpdateTasksMutation,
  useGetTaskStatsQuery,
} = tasksApi;

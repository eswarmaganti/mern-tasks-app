import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "/api/v1";
export const taskUpdatesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/taskupdates`,
  }),
  reducerPath: "taskupdates",
  tagTypes: ["TaskUpdates"],
  endpoints: (builder) => {
    return {
      getTaskUpdates: builder.query({
        query: (taskid) => {
          return {
            url: `/${taskid}`,
            method: "GET",
          };
        },
        providesTags: ["TaskUpdates"],
      }),
      addTaskUpdate: builder.mutation({
        query: ({ taskid, description }) => {
          return {
            url: `${taskid}`,
            method: "POST",
            body: { description },
          };
        },
        invalidatesTags: ["TaskUpdates"],
      }),
    };
  },
});

export const { useGetTaskUpdatesQuery, useAddTaskUpdateMutation } =
  taskUpdatesApi;

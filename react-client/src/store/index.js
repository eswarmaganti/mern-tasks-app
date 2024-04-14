import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./api/tasksApi";
import { taskUpdatesApi } from "./api/taskUpdatesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [taskUpdatesApi.reducerPath]: taskUpdatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tasksApi.middleware,
      taskUpdatesApi.middleware
    ),
});

setupListeners(store.dispatch);

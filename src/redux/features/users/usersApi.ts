import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";


export type User = {
  id: string;
  name: string;
  age: string;
  city: string;
}


const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/users`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<User[], void>({
      query: () => "/",
      providesTags: ["Users"],
    }),
  }),
});

export const { useFetchAllUsersQuery } = usersApi;

export default usersApi;
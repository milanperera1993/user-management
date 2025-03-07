import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/common";


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
    addUser : builder.mutation({
      query: (user: User) =>({
        url: "/",
        method: 'POST',
        body: user
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useFetchAllUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation} = usersApi;

export default usersApi;
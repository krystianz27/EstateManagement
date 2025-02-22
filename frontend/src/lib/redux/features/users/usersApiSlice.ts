import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import {
  NonTenantResponse,
  ProfileData,
  ProfileResponse,
  ProfilesResponse,
  QueryParams,
} from "@/types";

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ProfilesResponse, QueryParams>({
      query: (params = {}) => {
        const queryString = new URLSearchParams();

        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        } else if (params.page) {
          queryString.append("page", params.page.toString());
        }

        return `/profiles/all/?${queryString.toString()}`;
      },
      providesTags: ["User"],
    }),

    getUserProfile: builder.query<ProfileResponse, void>({
      query: () => "/profiles/user/my-profile/",
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation<ProfileData, ProfileData>({
      query: (formData) => ({
        url: "/profiles/user/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    getAllTechnicians: builder.query<NonTenantResponse, QueryParams>({
      query: (params = {}) => {
        const queryString = new URLSearchParams();

        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        } else if (params.page) {
          queryString.append("page", params.page.toString());
        }
        return `/profiles/non-tenant-profiles/?${queryString.toString()}`;
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllTechniciansQuery,
} = usersApiSlice;

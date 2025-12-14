import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { AttendanceBrowseRequest, AttendanceBrowseResponse } from '@/types/attendance'
import { apiBaseQuery, mockApiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'attendance',
  baseQuery: apiBaseQuery,
  tagTypes: ['Attendance'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListAttendances: builder.query<AttendanceBrowseResponse, AttendanceBrowseRequest>({
      query: (params) => ({
        params,
        url: '/attendances',
      }),
      providesTags: ['Attendance'],
    }),
    clockIn: builder.mutation<any, void>({
      query: () => ({
        url: '/attendances/clockIn',
        method: 'POST',
      }),
      invalidatesTags: ['Attendance'],
    }),
    clockOut: builder.mutation<any, void>({
      query: () => ({
        url: '/attendances/clockOut',
        method: 'POST',
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const {
  useGetListAttendancesQuery,
  useClockInMutation,
  useClockOutMutation,
  util: exampleUtil
} = api

export default api

import { BaseResponse, Meta } from '@/types/common'

// same with the attribute on responses
export interface Attendance {
  type: string
  id: string
  staffId: string
  date: string
  clockIn: string | null
  clockOut: string | null
}

export type AttendanceBrowseRequest = {
  page: number
  pageSize: number
}

export type AttendanceBrowseResponse = BaseResponse<Attendance>

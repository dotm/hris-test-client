import attendance from '@/services/attendances'
import staff from '@/services/staffs'
import auth from '@/services/auth'

const rootServices = {
  reducers: {
    // attendance
    [attendance.reducerPath]: attendance.reducer,
    // staff
    [staff.reducerPath]: staff.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  middlewares: [
    // attendance
    attendance.middleware,
    // staff
    staff.middleware,
    auth.middleware,
  ],
}

export default rootServices

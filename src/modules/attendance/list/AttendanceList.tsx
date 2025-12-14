import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Skeleton from '@/components/Skeleton'
import Blank from '@/layouts/Blank'
import {
  useGetListAttendancesQuery,
  useClockInMutation,
  useClockOutMutation,
} from '@/services/attendances'
import { AttendanceBrowseRequest } from '@/types/attendance'

const AttendanceList: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'attendance'])

  const [query] = useState<AttendanceBrowseRequest>({
    page: 0,
    pageSize: 5,
  })

  const { data: attendances, isLoading } =
    useGetListAttendancesQuery(query)

  const [clockIn, {
    isError: isClockInError,
    error: clockInError,
    isLoading: isClockInLoading,
    isSuccess: isClockInSuccess,
  }] = useClockInMutation()

  const [clockOut, {
    isError: isClockOutError,
    error: clockOutError,
    isLoading: isClockOutLoading,
    isSuccess: isClockOutSuccess,
  }] = useClockOutMutation()


  useEffect(() => {
    if (isClockInSuccess) {
      alert(t('attendance:clockInSuccess'))
    }
  }, [isClockInSuccess, t])

  useEffect(() => {
    if (isClockOutSuccess) {
      alert(t('attendance:clockOutSuccess'))
    }
  }, [isClockOutSuccess, t])

  useEffect(() => {
    if (!isClockInError || !clockInError) return

    const message =
      (clockInError as any)?.data?.message

    if (message === 'Already clocked in before') {
      alert(t('attendance:alreadyClockedInToday'))
    }
  }, [isClockInError, clockInError, t])

  useEffect(() => {
    if (!isClockOutError || !clockOutError) return

    const message =
      (clockOutError as any)?.data?.message

    if (message === 'Already clocked out before') {
      alert(t('attendance:alreadyClockedOutToday'))
    }
  }, [isClockOutError, clockOutError, t])

  return (
    <Blank title={t('attendance:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>
              {t('attendance:title')}
            </h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link href={{ pathname: '/', query: { lang: router.query.lang } }}>
              <a className='mt-6 py-2 px-4 text-sm font-medium underline'>
                {t('common:backTo', { page: t('common:titles.home') })}
              </a>
            </Link>
          </div>

          {/* Clock In / Clock Out */}
          <div className='mt-6 flex flex-row justify-center gap-4'>
            <button
              onClick={() => clockIn()}
              disabled={isClockInLoading}
              className='rounded bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
            >
              {t('attendance:clockIn')}
            </button>

            <button
              onClick={() => clockOut()}
              disabled={isClockOutLoading}
              className='rounded bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
            >
              {t('attendance:clockOut')}
            </button>
          </div>
          <p className='text-center text-sm font-bold mt-2'>{t('attendance:oneClockInAndOutWarning')}</p>

          <div className='mx-3 mt-6 grid grid-cols-1 gap-y-10 gap-x-2 sm:grid-cols-1 lg:grid-cols-2'>
            {isLoading &&
              [1, 2, 3, 4].map((_, idx) => (
                <Skeleton
                  className='h-80 rounded-md'
                  key={idx}
                />
              ))}

            {attendances?.data?.map(({ attributes }, index: number) => (
              <div
                key={index}
                className='group relative'
              >
                <div className='mt-4'>
                  <h3 className='text-md text-gray-700'>
                    {t('attendance:date')}:{' '}
                    {new Date(attributes.date).toLocaleString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric' })
                    }
                  </h3>
                  <p className='text-sm text-gray-700'>
                    {t('attendance:clockInTime')}:{' '}
                    {attributes.clockIn
                      ? new Date(attributes.clockIn).toLocaleTimeString()
                      : '-'}
                  </p>
                  <p className='text-sm text-gray-700'>
                    {t('attendance:clockOutTime')}:{' '}
                    {attributes.clockOut
                      ? new Date(attributes.clockOut).toLocaleTimeString()
                      : '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default AttendanceList

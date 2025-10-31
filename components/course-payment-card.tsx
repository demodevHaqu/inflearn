'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  loadTossPayments,
  clearTossPayments,
  type TossPaymentsPayment,
} from '@tosspayments/tosspayments-sdk'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import type { Course } from '@/lib/types'

interface CoursePaymentCardProps {
  course: Course
}

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY

function parseAmount(price: string): number {
  if (!price) {
    return 0
  }

  const numeric = price.replace(/[^0-9]/g, '')
  return numeric ? Number.parseInt(numeric, 10) : 0
}

export function CoursePaymentCard({ course }: CoursePaymentCardProps) {
  const { toast } = useToast()
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const amountValue = useMemo(() => parseAmount(course.price), [course.price])
  const isFreeCourse = amountValue === 0
  const [customerKey] = useState(
    () => `customer-${course.id}-${Math.random().toString(36).slice(2, 12)}`,
  )

  useEffect(() => {
    let aborted = false

    async function initializePayment() {
      if (!CLIENT_KEY) {
        const message = 'NEXT_PUBLIC_TOSS_CLIENT_KEY 환경 변수가 설정되지 않았습니다.'
        console.error('[CoursePaymentCard] 클라이언트 키 누락', { courseId: course.id })
        setErrorMessage(message)
        toast({
          title: '결제 설정 필요',
          description: '환경 변수에 클라이언트 키를 추가한 뒤 다시 시도해주세요.',
        })
        return
      }

      try {
        setIsInitializing(true)
        const tossPayments = await loadTossPayments(CLIENT_KEY)
        if (aborted) {
          return
        }

        const paymentInstance = tossPayments.payment({ customerKey })
        if (aborted) {
          return
        }

        setPayment(paymentInstance)
        console.log('[CoursePaymentCard] 결제 SDK 초기화 완료', {
          courseId: course.id,
          customerKey,
        })
      } catch (error) {
        console.error('[CoursePaymentCard] 결제 SDK 초기화 실패', {
          courseId: course.id,
          error,
        })
        setErrorMessage('결제 모듈을 불러오는 데 실패했습니다.')
        toast({
          title: '결제 준비 실패',
          description: '잠시 후 다시 시도해주세요.',
        })
      } finally {
        if (!aborted) {
          setIsInitializing(false)
        }
      }
    }

    initializePayment()

    return () => {
      aborted = true
      clearTossPayments()
    }
  }, [CLIENT_KEY, course.id, customerKey, toast])

  const handlePayment = useCallback(async () => {
    if (isFreeCourse) {
      toast({
        title: '무료 강의입니다',
        description: '로그인 후 바로 수강 목록에 추가되는 기능을 준비 중이에요.',
      })
      console.log('[CoursePaymentCard] 무료 강의 결제 버튼 클릭', { courseId: course.id })
      return
    }

    if (!CLIENT_KEY) {
      toast({
        title: '클라이언트 키가 없어요',
        description: '환경 변수 NEXT_PUBLIC_TOSS_CLIENT_KEY를 설정해주세요.',
      })
      console.warn('[CoursePaymentCard] 클라이언트 키 누락으로 결제 시도 실패', {
        courseId: course.id,
      })
      return
    }

    if (!payment) {
      toast({
        title: '결제 준비 중입니다',
        description: '잠시 후 다시 시도해주세요.',
      })
      console.warn('[CoursePaymentCard] 결제 인스턴스가 아직 초기화되지 않음', {
        courseId: course.id,
      })
      return
    }

    const orderId = `order-${course.id}-${Date.now()}`
    const orderName = course.title.slice(0, 100)

    try {
      setIsProcessing(true)
      console.log('[CoursePaymentCard] 결제 요청 시작', {
        courseId: course.id,
        orderId,
        amount: amountValue,
      })
      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: amountValue,
        },
        orderId,
        orderName,
        successUrl: `${window.location.origin}/payments/success`,
        failUrl: `${window.location.origin}/payments/fail`,
        customerName: course.instructor,
        metadata: {
          courseId: course.id,
        },
      })
    } catch (error) {
      console.error('[CoursePaymentCard] 결제 요청 중 오류', {
        courseId: course.id,
        orderId,
        error,
      })
      toast({
        title: '결제에 실패했어요',
        description: error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.',
      })
    } finally {
      setIsProcessing(false)
    }
  }, [CLIENT_KEY, amountValue, course.id, course.instructor, course.title, isFreeCourse, payment, toast])

  const primaryButtonLabel = useMemo(() => {
    if (isProcessing) {
      return '결제창을 여는 중...'
    }

    if (isInitializing) {
      return '결제 준비 중...'
    }

    return isFreeCourse ? '무료 수강 신청' : '수강 신청'
  }, [isFreeCourse, isInitializing, isProcessing])

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-muted">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 360px, 100vw"
          priority={false}
        />
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
              {course.discount && (
                <Badge variant="destructive" className="text-base">
                  {course.discount}
                </Badge>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{course.price}</span>
              {course.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {course.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full text-lg"
              data-slot="button"
              type="button"
              onClick={handlePayment}
              disabled={isProcessing || isInitializing || Boolean(errorMessage)}
            >
              {primaryButtonLabel}
            </Button>

            <Button size="lg" variant="outline" className="w-full" type="button">
              장바구니
            </Button>
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <p className="text-center text-sm text-muted-foreground">30일 환불 보장</p>
        </div>
      </div>
    </Card>
  )
}



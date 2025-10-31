import Link from 'next/link'

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    paymentKey?: string
    orderId?: string
    amount?: string
  }>
}

interface PaymentConfirmationResponse {
  orderName?: string
  orderId?: string
  paymentKey?: string
  approvedAt?: string
  totalAmount?: number
  receipt?: {
    url?: string
  }
  metadata?: {
    courseId?: string
    [key: string]: unknown
  }
}

async function confirmPayment({
  paymentKey,
  orderId,
  amount,
}: {
  paymentKey: string
  orderId: string
  amount: number
}): Promise<PaymentConfirmationResponse> {
  const secretKey = process.env.TOSS_SECRET_KEY

  if (!secretKey) {
    console.error('[PaymentSuccessPage] 시크릿 키 미설정')
    throw new Error('TOSS_SECRET_KEY 환경 변수가 설정되지 않았습니다.')
  }

  const basicToken = Buffer.from(`${secretKey}:`).toString('base64')
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
    cache: 'no-store',
  })

  const payload = (await response.json()) as PaymentConfirmationResponse & {
    message?: string
  }

  if (!response.ok) {
    console.error('[PaymentSuccessPage] 결제 승인 API 실패', {
      orderId,
      paymentKey,
      status: response.status,
      payload,
    })
    throw new Error(payload?.message ?? '결제 승인에 실패했습니다.')
  }

  console.log('[PaymentSuccessPage] 결제 승인 완료', { orderId, paymentKey })
  return payload
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDateTime(isoString?: string) {
  if (!isoString) {
    return null
  }

  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'medium',
  }).format(date)
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = await searchParams
  const { paymentKey, orderId, amount } = params

  console.log('[PaymentSuccessPage] 리다이렉트 파라미터 수신', params)

  if (!paymentKey || !orderId || !amount) {
    return (
      <section className="container py-12">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold">결제 정보가 올바르지 않아요</h1>
            <p className="text-muted-foreground">
              결제 완료 정보가 누락되어 결제 승인에 실패했습니다. 브라우저에서 뒤로가기를 눌러 다시 시도해주세요.
            </p>
            <Link href="/" className="text-primary underline">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const amountNumber = Number.parseInt(amount, 10)

  if (!Number.isFinite(amountNumber)) {
    console.error('[PaymentSuccessPage] 잘못된 금액 파라미터', { orderId, amount })
    return (
      <section className="container py-12">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold">결제 금액이 올바르지 않아요</h1>
            <p className="text-muted-foreground">
              결제 금액 정보가 유효하지 않아 결제 승인을 완료할 수 없었습니다. 동일한 문제가 반복되면 관리자에게 문의해주세요.
            </p>
            <Link href="/" className="text-primary underline">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    )
  }

  try {
    const confirmation = await confirmPayment({ paymentKey, orderId, amount: amountNumber })
    const approvedAtText = formatDateTime(confirmation.approvedAt)
    const confirmedAmount = confirmation.totalAmount ?? amountNumber
    const metadata = confirmation.metadata ?? {}
    const courseId = typeof metadata?.courseId === 'string' ? metadata.courseId : undefined

    return (
      <section className="container py-12">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold">결제가 완료되었어요 🎉</h1>
              <p className="text-muted-foreground">
                결제 승인 번호는 브라우저 콘솔에서도 확인할 수 있습니다. 영수증은 아래 링크에서 확인해주세요.
              </p>
            </div>

            <dl className="grid gap-4">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">주문 번호</dt>
                <dd className="text-right font-medium">{confirmation.orderId ?? orderId}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">주문 상품</dt>
                <dd className="text-right font-medium">{confirmation.orderName}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">결제 금액</dt>
                <dd className="text-right font-semibold text-primary">
                  {formatCurrency(confirmedAmount)}
                </dd>
              </div>
              {approvedAtText && (
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">승인 시간</dt>
                  <dd className="text-right font-medium">{approvedAtText}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-col gap-3">
              {confirmation.receipt?.url && (
                <Link href={confirmation.receipt.url} className="text-primary underline" target="_blank">
                  영수증 확인하기
                </Link>
              )}
              {courseId ? (
                <Link href={`/course/${courseId}`} className="text-primary underline">
                  강의 상세 페이지로 이동
                </Link>
              ) : (
                <Link href="/" className="text-primary underline">
                  홈으로 돌아가기
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : '결제 승인 중 알 수 없는 오류가 발생했어요.'
    console.error('[PaymentSuccessPage] 결제 승인 처리 실패', {
      orderId,
      paymentKey,
      error,
    })

    return (
      <section className="container py-12">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold">결제 확인에 실패했어요</h1>
            <p className="text-muted-foreground">
              {message}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-primary underline">
                홈으로 돌아가기
              </Link>
              <a href="mailto:support@example.com" className="text-sm text-muted-foreground underline">
                문제가 지속되면 관리자에게 문의해주세요
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}



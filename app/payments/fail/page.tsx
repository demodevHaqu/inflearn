import Link from 'next/link'

interface PaymentFailPageProps {
  searchParams: Promise<{
    code?: string
    message?: string
    orderId?: string
  }>
}

export default async function PaymentFailPage({ searchParams }: PaymentFailPageProps) {
  const params = await searchParams
  const { code, message, orderId } = params

  console.warn('[PaymentFailPage] 결제 실패 콜백', params)

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">결제에 실패했어요</h1>
            <p className="text-muted-foreground">
              결제창에서 전달받은 오류 정보를 아래에서 확인하고, 다시 시도하거나 다른 결제수단을 선택해주세요.
            </p>
          </div>

          <dl className="grid gap-4">
            {code && (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">에러 코드</dt>
                <dd className="text-right font-medium">{code}</dd>
              </div>
            )}
            {orderId && (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">주문 번호</dt>
                <dd className="text-right font-medium">{orderId}</dd>
              </div>
            )}
            {message && (
              <div className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                {message}
              </div>
            )}
          </dl>

          <div className="flex flex-col gap-3">
            <Link href="/" className="text-primary underline">
              홈으로 돌아가기
            </Link>
            <a href="mailto:support@example.com" className="text-sm text-muted-foreground underline">
              문제가 계속되면 관리자에게 문의해주세요
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}



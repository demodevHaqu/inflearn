# 토스페이먼츠 단건 결제 연동 가이드

## 1. 환경 변수 설정

루트 경로에 `.env.local` 파일을 만들고 아래 값을 추가하세요. 테스트 키는 사용자로부터 전달받은 값을 사용하면 됩니다.

```dotenv
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_Z1aOwX7K8m7jLg50gBAQVyQxzvNP
TOSS_SECRET_KEY=test_sk_PBal2vxj811g1BBo4kAe85RQgOAN
```

> **주의**: 시크릿 키는 절대 깃 저장소에 커밋하지 마세요. `.env.local`은 gitignore에 포함되어 있습니다.

## 2. 동작 방식

1. 강의 상세 페이지 우측의 `수강 신청` 버튼을 클릭하면 토스페이먼츠 결제창이 열립니다.
2. 결제가 성공하면 `/payments/success` 페이지로 리디렉션되며, 서버에서 시크릿 키로 결제 승인을 완료합니다.
3. 결제 승인 응답은 화면과 콘솔 로그(`PaymentSuccessPage`) 모두에서 확인할 수 있습니다.
4. 결제가 실패하거나 취소되면 `/payments/fail` 페이지로 이동합니다.

핵심 기능에는 다음과 같은 디버깅 로그가 남아 있습니다.

- `CoursePaymentCard` : SDK 초기화, 버튼 클릭, 결제 요청 시작/실패
- `PaymentSuccessPage` : 리디렉션 파라미터 수신, 승인 성공/실패
- `PaymentFailPage` : 실패 파라미터 수신

## 3. 테스트 방법

1. 의존성 설치: `pnpm install`
2. 개발 서버 실행: `pnpm run dev`
3. 브라우저에서 강의 상세 페이지 접속: `http://localhost:3000/course/1`
4. `수강 신청` 버튼을 눌러 결제 플로우를 테스트합니다.

테스트 키로 실행되므로 실제 결제는 처리되지 않습니다. 성공 후에는 테스트 결제 내역이 토스페이먼츠 대시보드에도 기록됩니다.



'use server'

import { Client } from '@notionhq/client'

// 노션 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export interface LeadSubmitResult {
  success: boolean
  error?: string
}

/**
 * 강의 신청 정보를 노션 데이터베이스에 저장하는 서버 액션
 * @param name - 신청자 이름
 * @param email - 신청자 이메일
 */
export async function submitLead(
  name: string,
  email: string
): Promise<LeadSubmitResult> {
  // 핵심 로그: 서버 액션 시작
  console.log('[ServerAction:submitLead] 시작', { name, email })

  try {
    // 입력값 검증
    if (!name || !email) {
      console.warn('[ServerAction:submitLead] 입력값 누락', { name, email })
      return {
        success: false,
        error: '이름과 이메일을 모두 입력해주세요.',
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn('[ServerAction:submitLead] 이메일 형식 오류', { email })
      return {
        success: false,
        error: '올바른 이메일 형식이 아닙니다.',
      }
    }

    // 환경변수 확인
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.error(
        '[ServerAction:submitLead] 환경변수 누락',
        {
          hasApiKey: !!process.env.NOTION_API_KEY,
          hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
        }
      )
      return {
        success: false,
        error: '서버 설정 오류가 발생했습니다.',
      }
    }

    // 핵심 로그: 노션 API 호출 시작
    console.log('[ServerAction:submitLead] 노션 API 호출 시작', {
      databaseId: process.env.NOTION_DATABASE_ID,
    })

    // 노션 데이터베이스에 페이지 생성
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        '이름': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        '이메일': {
          email: email,
        },
      },
    })

    // 핵심 로그: 노션 API 성공
    console.log('[ServerAction:submitLead] 노션 저장 성공', {
      pageId: response.id,
      name,
      email,
    })

    return {
      success: true,
    }
  } catch (error) {
    // 핵심 로그: 에러 발생
    console.error('[ServerAction:submitLead] 에러 발생', {
      error: error instanceof Error ? error.message : String(error),
      name,
      email,
    })

    return {
      success: false,
      error: '신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    }
  }
}


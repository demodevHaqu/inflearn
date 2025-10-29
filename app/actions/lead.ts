'use server'

import { supabaseAdmin } from '@/lib/supabase'

export interface LeadSubmitResult {
  success: boolean
  error?: string
}

/**
 * 강의 신청 정보를 Supabase 데이터베이스에 저장하는 서버 액션
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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error(
        '[ServerAction:submitLead] 환경변수 누락',
        {
          hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        }
      )
      return {
        success: false,
        error: '서버 설정 오류가 발생했습니다.',
      }
    }

    // 핵심 로그: Supabase API 호출 시작
    console.log('[ServerAction:submitLead] Supabase API 호출 시작')

    // Supabase에 데이터 저장
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase()
        }
      ])
      .select()

    if (error) {
      console.error('[ServerAction:submitLead] Supabase 에러', { error })
      
      // 이메일 중복 에러 처리
      if (error.code === '23505') {
        return {
          success: false,
          error: '이미 신청된 이메일입니다.',
        }
      }
      
      return {
        success: false,
        error: '데이터베이스 저장 중 오류가 발생했습니다.',
      }
    }

    // 핵심 로그: Supabase 저장 성공
    console.log('[ServerAction:submitLead] Supabase 저장 성공', {
      id: data?.[0]?.id,
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


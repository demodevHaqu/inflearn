import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone } = body ?? {}

    console.log("[API:/api/lead] receive", { name, email, phone })

    if (!name || !email || !phone) {
      console.warn("[API:/api/lead] validation_failed")
      return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 })
    }

    // Supabase에 데이터 저장
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim()
        }
      ])
      .select()

    if (error) {
      console.error("[API:/api/lead] supabase_error", error)
      
      // 이메일 중복 에러 처리
      if (error.code === '23505') {
        return NextResponse.json({ ok: false, error: "EMAIL_EXISTS" }, { status: 409 })
      }
      
      return NextResponse.json({ ok: false, error: "DATABASE_ERROR" }, { status: 500 })
    }

    console.log("[API:/api/lead] success", { id: data?.[0]?.id })
    return NextResponse.json({ ok: true, data: data?.[0] })
  } catch (error) {
    console.error("[API:/api/lead] error", error)
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 })
  }
}



import { NextRequest, NextResponse } from "next/server"

// 노션 연동 전 스텁: 요청/응답 및 핵심 로그만 처리
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body ?? {}

    console.log("[API:/api/lead] receive", { name, email })

    if (!name || !email) {
      console.warn("[API:/api/lead] validation_failed")
      return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 })
    }

    // TODO: 노션 SDK 연동 (databases.createPage 등)
    // const notion = new Client({ auth: process.env.NOTION_TOKEN })
    // await notion.pages.create({ ... })

    console.log("[API:/api/lead] success")
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[API:/api/lead] error", error)
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 })
  }
}



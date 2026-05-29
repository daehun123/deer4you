import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 💡 테스트용 임시 관리자 계정 하드코딩
    const TEMP_ADMIN_EMAIL = "admin@smu.ac.kr";
    const TEMP_ADMIN_PASSWORD = "admin"; // 테스트 비번

    // 관리자 이메일, 비밀번호가 맞을 경우 (성공)
    if (email === TEMP_ADMIN_EMAIL && password === TEMP_ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: true,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_test_token_12345", // 임시 더미 JWT 토큰
        },
        { status: 200 },
      );
    }
    // 계정 정보가 틀렸을 경우 (401 에러)
    else {
      return NextResponse.json(
        { success: false, message: "아이디 또는 비밀번호가 틀렸습니다." },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}

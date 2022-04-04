import { CallPost } from "api"

export async function CallCodeVerification({ email, code }) {
    const res = await CallPost("/api/auth/verify-email", {
        user_email: email,
        code,
    })
    return res
}
export async function CallResendVerification(email) {
    const res = await CallPost("/api/auth/resend-verification", { email })
    return res
}

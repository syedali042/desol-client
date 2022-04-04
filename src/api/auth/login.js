import { CallPost } from "api";

export async function CallLogin({ email, password }) {
    const res = await CallPost('/task/login', { email, password })
    return res
}
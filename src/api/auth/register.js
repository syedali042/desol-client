import { CallPost } from "api";

export async function CallRegister({ name, email, password }) {
    const res = await CallPost('/api/auth/register', {name, email, password })
    return res
}
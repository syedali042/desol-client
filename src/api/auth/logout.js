import { CallGet } from "../index"

export async function CallLogout() {
  const res = await CallGet("/api/auth/logout")
  return res
}

export var da = '';
export var ca = '';
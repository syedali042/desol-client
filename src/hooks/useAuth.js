import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { useDispatch } from "react-redux"

import { setUserData } from "redux/user"

import { CallGet } from "api"

export default function useAuth() {
  const [isLoading, setLoading] = useState(true)
  const { push: redirectTo } = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const getInfo = async () => {
      const info = await CallGet(`/api/auth/user`)

      if (info.ok === 0) {
        redirectTo("/auth/login")
      } else if (info.ok === 1) {
        const data = info.res.data

        dispatch(
          setUserData({
            name: data.name,
            email: data.email,
          })
        )
        setLoading(false)
      }
    }

    getInfo()
  }, [])

  return isLoading
}

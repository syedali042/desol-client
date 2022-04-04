import { useEffect } from "react"

import { useDispatch } from "react-redux"

import { setGoBack } from "redux/app"

export default function useGoBack(goBackTrigger) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGoBack({ goBackTrigger }))

        return () => dispatch(setGoBack({ goBackTrigger: null }))
    }, [])
}

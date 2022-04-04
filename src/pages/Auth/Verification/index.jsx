import { useEffect, useState } from "react"

import { Button, message } from "antd"

import ReactCodeInput from "react-verification-code-input"

import {
    CallCodeVerification,
    CallResendVerification,
} from "api/auth/verification"

import { ERRS } from "utils/exceptions"

import {
    VerificationWrapper,
    InnerWrapper,
    Heading,
    Paragraph,
    Img,
    Email,
    CodeInputWrapper,
} from "./style"

import EmailIcon from "assets/email.png"

export default function VerificationFlash({
    emailAddress,
    onSuccess,
    sendCodeAuto,
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [codeInput, setCodeInput] = useState("")
    const [isResendLoading, setResendLoading] = useState(false)

    useEffect(() => {
        if (sendCodeAuto) onResend(false)
    }, [])

    const onSubmit = async () => {
        setIsLoading(true)

        const res = await CallCodeVerification({
            email: emailAddress,
            code: Number(codeInput),
        })

        if (res.ok === 0) {
            if (res.code === ERRS.SERVER_ERROR) {
                message.error(
                    "Oops! Unknown Error Occurred on the Server, Please Try again"
                )
            } else if (res.code === ERRS.INVALID_BODY) {
                message.error("Invalid Verification Code or Email Address")
            } else if (res.code === ERRS.NOT_FOUND) {
                message.error("Email Address not found")
            } else if (res.code === ERRS.ALREADY_VERIFIED) {
                message.error("Email Address is already verified")
            } else if (res.code === ERRS.INVALID_TOKEN) {
                message.error("Invalid Verification Code")
            }
        }

        if (res.ok === 1) onSuccess()
        setIsLoading(false)
    }

    const onResend = async (isButtonClick = true) => {
        if (isButtonClick) {
            setResendLoading(true)
        }

        const res = await CallResendVerification(emailAddress)

        if (res.ok === 0) {
            if (res.code === ERRS.SERVER_ERROR) {
                message.error(
                    "Oops! Unknown Error Occurred on the Server, Please Try again"
                )
            } else if (res.code === ERRS.INVALID_BODY) {
                message.error("Invalid Email Address")
            } else if (res.code === ERRS.NOT_FOUND) {
                message.error("Email Address not found")
            } else if (res.code === ERRS.ALREADY_VERIFIED) {
                message.error("Email Address is already verified")
            }
        } else {
            if (isButtonClick) {
                message.success("Verification Code Resent")
            }
        }

        setResendLoading(false)
    }

    return (
        <VerificationWrapper>
            <InnerWrapper>
                <Img>
                    <img src={EmailIcon} alt='email icon' />
                </Img>
                <Heading>We sent a verification code</Heading>
                <Email>
                    On Email:{" "}
                    <span className='utl__highlight'>{emailAddress}</span>
                </Email>
                <CodeInputWrapper>
                    <ReactCodeInput
                        onChange={value => setCodeInput(value)}
                        type='number'
                        fields={5}
                        className='code-input'
                    />
                </CodeInputWrapper>
                <Paragraph>
                    Still can't find the email?{" "}
                    <Button
                        loading={isResendLoading}
                        type='link'
                        style={{ padding: "5px" }}
                        onClick={onResend}>
                        Resend Code
                    </Button>
                </Paragraph>

                <Button
                    loading={isLoading}
                    type='primary'
                    size='large'
                    style={{ width: "100%", marginTop: "40px" }}
                    onClick={onSubmit}>
                    Submit
                </Button>
            </InnerWrapper>
        </VerificationWrapper>
    )
}

import { useState, useRef } from "react"

import { Form, Input, Button, message } from "antd"
import Heading from "components/Heading"

import styled from "styled-components"
import { ERRS } from "utils/exceptions"
import { CallRegister } from "api/auth/register"
import { useHistory } from "react-router-dom"

import Verification from "../Verification"

export default function Register() {
  const [isLoading, setLoading] = useState(false)
  const [isOk, setIsOk] = useState(false)
  const userEmail = useRef("")

  const { push: redirectTo } = useHistory()

  const onFinish = async values => {
    setLoading(true)
    const res = await CallRegister(values)

    if (res.ok === 0) {
      if (res.code === ERRS.DUP_ERROR) {
        message.error("Email Address is already in use")
      } else if (res.code === ERRS.SERVER_ERROR) {
        message.error(
          "Oops! Unknown Error Occurred on the Server, Please Try again"
        )
      } else if (res.code === ERRS.INVALID_BODY) {
        message.error("Please check your Email and Password")
      }
    } else if (res.ok === 1) {
      userEmail.current = values.email
      setIsOk(true)
    }
    setLoading(false)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  if (isOk)
    return (
      <Verification
        onSuccess={() => (window.location.href = "/data-forecast")}
        emailAddress={userEmail.current}
      />
    )
  return (
    <>
    <Wrapper>
      <Form
        size='large'
        name='userLogin'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout={"vertical"}
        onFinishFailed={onFinishFailed}
        autoComplete='on'>
        <Heading style={{ textAlign: "center", marginBottom: "25px" }}>
          Sign Up
        </Heading>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please enter your Name",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please enter your Email",
            },
            {
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid Email Address",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: "Please enter your Password",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            style={{ width: "100%", marginTop: "10px" }}
            type='primary'
            htmlType='submit'>
            Sign Up
          </Button>
        </Form.Item>
        <Button
          type='link'
          onClick={() => redirectTo("/auth/login")}
          style={{ padding: "3px", marginTop: "-10px" }}>
          Already Registered? Sign In.
        </Button>
      </Form>
    </Wrapper>
    <div style={{position:'fixed', bottom:'0', padding:'20px', width:'100%'}}>
        <center>
          <p>Made with <span style={{color:'red'}}> &#10084;</span></p>
        </center>
    </div>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 90%;
    max-width: 500px;

    label::before {
      display: none !important;
    }

    .ant-form-item-explain-error {
      margin-bottom: 12px;
    }

    .ant-form-item-label {
      padding-bottom: 3px;
      & > label {
        font-size: 16px;
      }
    }
  }
`

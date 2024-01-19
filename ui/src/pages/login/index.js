import React, { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css"
import _ from "../../_"
import API from "../../api"

const Login = () => {

  // _.auth()

  const InitState = -1
  const UserVerificationPending = 0
  const OTPSendingPending = 2
  const OTPVerificationPending = 4
  const OTPVerificationTimedOut = 5
  const OTPVerificationFailed = 6
  const SigningIn = 7

  const initUserPrompt = "Enter your registered WhatsApp number or registered Email ID"
  const expirySeconds = 3

  var [ loginState, setLoginState ] = useState(InitState)
  var [ statusText, setStatusText ] = useState("")
  var [ buttonText, setButtonText ] = useState("Send OTP")
  var [ promptText, setPromptText ] = useState(initUserPrompt)
  var [ timerOn, setTimerOn ] = useState(false)

  var id = useRef()
  var target = useRef()
  var timerID = useRef()
  var expiry = useRef()

  const handleSendOTP = ()=>{
    if(loginState==OTPSendingPending){
      return
    }
    setLoginState(UserVerificationPending)
    new API().call("/verify-user", { id: id.current.value })
    .then(()=>{
      setLoginState(OTPSendingPending)
    }).catch(err=>{
      setLoginState(InitState)
      if(err.response.status==404){
        toast.error("This user is not found in our records!")
      }else{
        toast.error("User could not be verified!")
      }
    })
  }

  useEffect(()=>{
    if(loginState == InitState){
      setStatusText("")
      setButtonText("Send OTP")
      setPromptText(initUserPrompt)
    } else if(loginState == UserVerificationPending){
      setStatusText("Verifying user..")
      setButtonText("Verifying user..")
    } else if(loginState == OTPSendingPending){
      setStatusText("Sending OTP...")
      setButtonText("Sending OTP...")
    } else if(loginState == OTPVerificationPending){
      setButtonText("Verify OTP")
      setPromptText(`Enter the 6-digit OTP sent to ${target.current}`)
      setTimerOn(true)
      expiry.current = moment().add(expirySeconds, 'seconds')
    } else{
      setStatusText("")
    }
  }, [loginState])

  useEffect(()=>{
    if(loginState == OTPSendingPending){
      new API().call("/send-otp", { 
        id: `vseva-login-${id.current.value}`,
        target: id.current.value
      }).then(()=>{
        setLoginState(OTPVerificationPending)
        target.current = id.current.value
        id.current.value = ""
      }).catch(err=>{
        setLoginState(InitState)
        toast.error(`Could not send OTP: ${err.response.data}. Please try again!`)
      })
    }
  }, [loginState])

  useEffect(()=>{
    if(timerOn){
      setStatusText(`OTP will expire in 05:00`)
      timerID.current = setInterval(()=>{
        const secondsRemaining = moment.utc(expiry.current.diff(moment()))/1000
        if(secondsRemaining <= 1){
          setTimerOn(false)
          setLoginState(InitState)
          toast.error("OTP expired! Please try again.")
          return
        }
        setStatusText(`OTP will expire in ${moment.utc(expiry.current.diff(moment())).format('mm:ss')}`)
      }, 1000)
    }else{
      clearInterval(timerID.current)
    }
  }, [timerOn])

  return (
    <div className="login-container">
        <img src="/img/header/logo.png" className="login-logo" />

        <div className='login-status'>{statusText}</div>

        <div className='login-form'>
          <label className='login-label'>{promptText}</label>
          <input
            type="text"
            className="login-input"
            ref={id}
            defaultValue={"6364903722"}
          />

          <button
            className="login-send-button"
            onClick={handleSendOTP}
            disabled={loginState==OTPSendingPending}
          >
            {buttonText}
          </button>
        </div>
    </div>
  )
}

export default Login
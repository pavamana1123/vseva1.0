import React, { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css"
import _ from "../../_"
import API from "../../api"
import {Spinner} from "../../components/spinner"

const Login = () => {

  _.auth()

  const InitState = 0
  const UserVerificationPending = 1
  const OTPSendingPending = 2
  const OTPSendingSuccessful = 3
  const OTPVerificationPending = 4
  const SignInPending = 5

  const initUserPrompt = "Enter your registered WhatsApp number or registered Email ID"
  const expirySeconds = 300

  var [ loginState, setLoginState ] = useState(InitState)
  var [ statusText, setStatusText ] = useState("")
  var [ buttonText, setButtonText ] = useState("Send OTP")
  var [ promptText, setPromptText ] = useState(initUserPrompt)
  var [ inputType, setInputType ] = useState("text")
  var [ inputMaxLen, setInputMaxLen ] = useState(-1)
  var [ timerOn, setTimerOn ] = useState(false)

  var id = useRef()
  var target = useRef()
  var timerID = useRef()
  var expiry = useRef()
  var users = useRef()

  const handleSendOTP = ()=>{
    if(loginState==OTPSendingPending){
      return
    }
    setLoginState(UserVerificationPending)
    new API().call("/verify-user", { id: id.current.value.trim() })
    .then(res=>{
      users.current = res.data
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

  const handleVerifyOTP = ()=>{

    if(loginState==UserVerificationPending){
      return
    }
    setLoginState(OTPVerificationPending)
    new API().call("/verify-otp", { 
      id: `vseva-login-${target.current}`,
      otp: id.current.value.trim()
    }).then(()=>{
      setLoginState(SignInPending)
      _.setSave({
        index: 0,
        users: users.current
      })
      window.open("/home", "_self")
    }).catch(err=>{
      setLoginState(OTPSendingSuccessful)
      if(err.response.status==403){
        id.current.value=""
        toast.error(`Incorrect OTP. Please enter again.`)
      }else{
        toast.error(`Could not verify OTP: ${err.response.data}. Please try again!`)
      }
    })
  }

  useEffect(()=>{
    if(loginState == InitState){
      setStatusText("")
      setButtonText("Send OTP")
      setPromptText(initUserPrompt)
      setInputType("text")
      setInputMaxLen(-1)
    } else if(loginState == UserVerificationPending){
      setStatusText("Verifying user..")
      setButtonText("Verifying user..")
    } else if(loginState == OTPSendingPending){
      setStatusText("Sending OTP...")
      setButtonText("Sending OTP...")
    } else if(loginState == OTPSendingSuccessful){
      setButtonText("Verify OTP")
      setPromptText(`Enter the 6-digit OTP sent to ${target.current}`)
      setTimerOn(true)
      setInputType("number")
      setInputMaxLen(6)
      id.current.focus()
      expiry.current = moment().add(expirySeconds, 'seconds')
    } else if (loginState == OTPVerificationPending){
      setButtonText("Verifying OTP...")
    } else if (loginState == SignInPending) {
      setStatusText("Signing you in..")
      setTimerOn(false)
    } else {
      setStatusText("")
    }
  }, [loginState])

  useEffect(()=>{
    if(loginState == OTPSendingPending){
      new API().call("/send-otp", { 
        id: `vseva-login-${id.current.value.trim()}`,
        target: id.current.value.trim()
      }).then(()=>{
        setLoginState(OTPSendingSuccessful)
        target.current = id.current.value.trim()
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

  const handleSubmit = (e)=>{
    if(e.code=="Enter"){
      if(loginState == OTPSendingSuccessful){
        handleVerifyOTP()
      }else{
        handleSendOTP()
      }
    }
  }

  return (
    <div className="login-container">
        <img src="/img/header/logo.png" className="login-logo" />

        <div className='login-status'>{statusText}</div>
        {loginState==SignInPending?<Spinner size={5}/>:null}

        {loginState<SignInPending?
          <div className='login-form'>
            <label className='login-label'>{promptText}</label>
            <input
              className="login-input"
              ref={id}
              type={inputType}
              maxLength={inputMaxLen}
              onKeyDown={handleSubmit}
            />

            <button
              className="login-send-button"
              onClick={loginState == OTPSendingSuccessful? handleVerifyOTP: handleSendOTP}
              disabled={loginState==OTPSendingPending || loginState == OTPVerificationPending}
            >
              {buttonText}
            </button>
          </div>:null
        }
    </div>
  )
}

export default Login
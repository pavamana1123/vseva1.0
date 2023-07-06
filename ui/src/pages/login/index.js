// TODO
// - change inputID feature
// - resend OTP feature


import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css"
import _ from "../../_"

const Login = () => {

  _.auth()

  const otpExpirationSeconds = 300
  const [inputID, setinputID] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(otpExpirationSeconds)
  const [timerID, setTimerID] = useState()
  const [sendOTPEnabled, setSendOTPEnabled] = useState(false)
  const [verifyOTPEnabled, setVerifyOTPEnabled] = useState(false)
  const [sendOTPWaiting, setSendOTPWaiting] = useState(false)
  const [verifyOTPWaiting, setVerifyOTPWaiting] = useState(false)
  const [otpVerified, setOTPVerified] = useState(false)

  var loginInput = useRef()
  var otpTimestamp = useRef(null)
  var userData = useRef()

  useEffect(()=>{
    loginInput.current.focus()
  }, [])


  const isValidInputID = (input)=> {
    const numberRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return numberRegex.test(input) || emailRegex.test(input);
  }

  const isValidOTP = (input)=> {
    const numberRegex = /^\d{6}$/;
    return numberRegex.test(input) 
  }

  const handleInputIDChange = (e) => {
    setinputID(e.target.value.trim().replace(/\s/g, ''))
    if(isValidInputID(e.target.value)){
      setSendOTPEnabled(true)
    }else{
      setSendOTPEnabled(false)
    }
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value.trim().replace(/\s/g, ''))
    if(isValidOTP(e.target.value)){
      setVerifyOTPEnabled(true)
    }else{
      setVerifyOTPEnabled(false)
    }
  }

  const handleSendOtp = () => {
    const endpoint = '/api'
    const requestData = {
      id: `vseva-${inputID}`,
    }

    if (inputID.includes('@')) {
      requestData.email = inputID
    } else {
      requestData.phone = inputID
    }

    setSendOTPWaiting(true)
    setSendOTPEnabled(false)
    axios
      .post(endpoint, requestData, {
        headers: {
          'endpoint': '/send-otp',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        userData.current = response.data
        toast.success(`OTP is sent to your ${isNaN(inputID)?'Email ID':'WhatsApp number'}`)
        setOtpSent(true)
        startOTPTimer()
      })
      .catch((error) => {
        toast.error(error.response.status==404?`Invalid ${requestData.email?'Email ID':'WhatsApp number'}`:'Could not send OTP. Please contact the admin.')
      })
      .finally(()=>{
        setSendOTPWaiting(false)
        loginInput.current.focus()
      })
  }

  const handleVerifyOtp = () => {
    const endpoint = '/api'
    const requestData = {
      id: `vseva-${inputID}`,
      otp
    }

    setVerifyOTPWaiting(true)
    setVerifyOTPEnabled(false)

    axios.post(endpoint, requestData, {
        headers: {
          'endpoint': '/verify-otp',
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        Cookies.set('save', JSON.stringify(userData.current))
        window.location.href = new URLSearchParams(window.location.search).get('redirect') || '/home'
      })
      .catch((error) => {
        setOtp('')
        toast.error((()=>{
          switch(error.response.status){
              case 403:
                return 'Incorrect OTP! Please check and try again.'
              case 404:
                return 'OTP has expired! Refresh page and try again.'
              default:
                return 'Unable to verify OTP. Please contact the admin.'
            }
          })()
        )
      })
      .finally(()=>{
        setOTPVerified(true)
      })
  }

  const startOTPTimer = () => {
    otpTimestamp.current = moment()
    setTimerID(setInterval(() => {
      var s = otpExpirationSeconds - moment.duration(moment().diff(otpTimestamp.current)).asSeconds()
      setSecondsRemaining(s)
      if (s <= 0) {
        clearInterval(timerID)
        setOtpSent(false)
        setinputID('')
        setSecondsRemaining(otpExpirationSeconds)
        otpTimestamp.current=null
        toast.error('OTP has expired! Try again.')
      }
    }, 1000))
  }

  return (
    <div className="login-container">
      {otpVerified?
      <div className='login-success'>
        Login successful! Redirecting...
      </div>
      :<>
        <img src="/img/header/logo.png" className="login-logo" />
        <div className='login-title'>ISKCON Mysore Volunteering</div>
        <label className='login-label-1'>
        {otpSent?`Enter 6-digit OTP sent to your ${isNaN(inputID)?'Email ID':'WhatsApp number'} ${inputID}`:'To login enter registered 10-digit WhatsApp number or Email-ID below'}
        </label>
        <input
          type="text"
          value={otpSent?otp:inputID}
          onChange={otpSent?handleOtpChange:handleInputIDChange}
          placeholder={otpSent?'Enter OTP':''}
          className="login-input"
          ref={loginInput}
        />

        <button
          onClick={otpSent?handleVerifyOtp:handleSendOtp}
          disabled={otpSent?!verifyOTPEnabled:!sendOTPEnabled}
          className="login-send-button"
        >
          {otpSent?(verifyOTPWaiting?'Verifying...':'Verify OTP'):(sendOTPWaiting?'Sending...':'Send OTP')}
        </button>

        {otpSent && (
          <div className="login-timer">
            <span>{`Your OTP expires in  ${Math.floor(secondsRemaining / 60).toString().padStart(2, '0')}:${Math.floor(secondsRemaining % 60 < 10 ? `0${secondsRemaining % 60}` : secondsRemaining % 60).toString().padStart(2, '0')}`}</span>
          </div>
        )}
      </>}
    </div>
  )
}

export default Login
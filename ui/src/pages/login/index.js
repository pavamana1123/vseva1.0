import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css"

const Login = () => {
  const [inputID, setinputID] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpExpired, setOtpExpired] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(180)
  const [sendOTPEnabled, setSendOTPEnabled] = useState(false)
  const [verifyOTPEnabled, setVerifyOTPEnabled] = useState(false)
  const [sendOTPWaiting, setSendOTPWaiting] = useState(false)
  const [verifyOTPWaiting, setVerifyOTPWaiting] = useState(false)

  var loginInput = useRef()

  useEffect(()=>{
    // document.getElementById("login-input").focus()
    loginInput.current.focus()
  }, [])


  const isValidInputID = (input)=> {
    const numberRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return numberRegex.test(input) || emailRegex.test(input);
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
    setOtp(e.target.value)
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
        // Successful API call
        toast.success('OTP is sent to your WhatsApp number/email ID')
        setOtpSent(true)
        startOtpExpirationTimer()
      })
      .catch((error) => {
        // Error occurred during API call
        console.log(error.response.status)
        toast.error(error.response.status==404?`Invalid ${requestData.email?'Email ID':'WhatsApp number'}`:'Could not send OTP. Please contact the admin.')
      })
      .finally(()=>{
        setSendOTPWaiting(false)
      })
  }

  const handleVerifyOtp = () => {
    const endpoint = '/verify-otp'
    const requestData = {
      id: `vseva-${inputID}`,
      otp: otp,
    }

    axios
      .post(endpoint, requestData)
      .then((response) => {
        // Successful OTP verification
        window.location.href = '/home' // Redirect to the home page
      })
      .catch((error) => {
        // Error occurred during OTP verification
        toast.error('Unable to verify OTP. Please contact the admin.')
      })
  }

  const startOtpExpirationTimer = () => {
    let secondsRemaining = 180 // Set the initial countdown time (180 seconds = 3 minutes)

    const timer = setInterval(() => {
      secondsRemaining--

      if (secondsRemaining <= 0) {
        clearInterval(timer)
        setOtpExpired(true)
      }
    }, 1000)
  }

  return (
    <div className="login-container">
      <img src="/img/header/logo.png" className="login-logo" />
      <div className='login-title'>ISKCON Mysore Volunteering</div>
      <label className='login-label-1'>
       {otpSent?`Enter OTP sent to your ${isNaN(inputID)?'Email ID':'phone'} ${inputID}`:'To login enter registered 10-digit WhatsApp number or Email-ID below'}
      </label>
      <input
        type="text"
        value={otpSent?otp:inputID}
        onChange={otpSent?handleOtpChange:handleInputIDChange}
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

      {otpSent && !otpExpired && (
        <div className="login-timer">
          Your OTP expires in <span>{Math.floor(secondsRemaining / 60)}</span>:
          <span>{secondsRemaining % 60 < 10 ? `0${secondsRemaining % 60}` : secondsRemaining % 60}</span>
        </div>
      )}
    </div>
  )
}

export default Login
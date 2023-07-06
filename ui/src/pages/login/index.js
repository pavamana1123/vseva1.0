import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./index.css"

const Login = () => {
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

  var loginInput = useRef()
  var otpTimestamp = useRef(null)

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
        // Successful API call
        toast.success('OTP is sent to your WhatsApp number/email ID')
        setOtpSent(true)
        startOTPTimer()
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

    const endpoint = '/api'
    const requestData = {
      id: `vseva-${inputID}`,
    }

    axios.post(endpoint, requestData, {
        headers: {
          'endpoint': '/verify-otp',
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        console.log('response')
        // window.open('/home', '_self')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Unable to verify OTP. Please contact the admin.')
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
      <img src="/img/header/logo.png" className="login-logo" />
      <div className='login-title'>ISKCON Mysore Volunteering</div>
      <label className='login-label-1'>
       {otpSent?`Enter 6-digit OTP sent to your ${isNaN(inputID)?'Email ID':'phone'} ${inputID}`:'To login enter registered 10-digit WhatsApp number or Email-ID below'}
      </label>
      <form className='login-form'>
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
      </form>

      {otpSent && (
        <div className="login-timer">
          <span>{`Your OTP expires in  ${Math.floor(secondsRemaining / 60).toString().padStart(2, '0')}:${Math.floor(secondsRemaining % 60 < 10 ? `0${secondsRemaining % 60}` : secondsRemaining % 60).toString().padStart(2, '0')}`}</span>
        </div>
      )}
    </div>
  )
}

export default Login
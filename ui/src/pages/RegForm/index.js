import React, { useEffect, useState } from 'react';
import "./index.css"
import Header from '../../components/header';
import API from '../../api';
import _ from "../../_"
import { useParams } from 'react-router-dom';

function FormFeild(props){

    var { label, desc, type, mandatory, processor, updater, validator } = props

    var [value, setValue] = useState('')
    var [valid, setValid] = useState(true)

    type = type || 'text'

    return(
        <div className={`form-feild-cont  ${valid?'':'ffinvalid'}`}>
            <div className='form-feild-marginer'>
                <div className='form-feild-label'>
                    <span>{label}</span>
                    {mandatory && <span className='form-feild-mandatory'>{' *'}</span>}
                </div>
                {desc && <div className='form-feild-desc'>
                    {desc}
                </div>}
                {
                    (()=>{
                        switch(type){
                            case 'tel':
                            case 'email':
                            case 'date':
                            case 'text':
                                return (
                                    <input
                                        className={`form-feild-input fftext`}
                                        type={type}
                                        onBlur={(e)=>{
                                            var processedValue = (processor?processor(e.target.value):e.target.value)

                                            updater(processedValue)
                                            setValue(processedValue)
                                            setValid((mandatory?e.target.value!='':true) && (validator?!validator(processedValue):true))
                                        }}
                                        onChange={(e)=>{
                                            setValue(e.target.value)
                                            updater(e.target.value)
                                        }}
                                        value={value}
                                    />
                                )
                        }
                    })()
                }
                <div className='form-feild-warning'>
                    {!valid? validator? validator(value):'* This is a mandatory feild':''}
                </div>
            </div>
        </div>
    )
}

function FestForm(props){
    var { eventData, updaters } = props

    return (
        <div className='event-form-container'>
            <div className='event-form-header'>
                <div className='event-form-title'>
                    {eventData.isGroup? eventData.group.name: eventData.events.name}
                </div>
                <hr className='event-form-hr'/>
                <div className='event-form-description'>
                    {eventData.isGroup? eventData.group.formDesc: eventData.events.formDesc}
                </div>
            </div>

            <FormFeild
                label="Enter your full-name"
                type="text"
                processor = {(v)=>{
                    return (v || '').toNameCase()
                }}
                updater = {updaters.setName}
                mandatory
            />

            <FormFeild
                label="Enter your 10-digit mobile number (preferably WhatsApp number)"
                type="tel"
                processor = {(v)=>{
                    return (v || '').toPhoneCase()
                }}
                updater = {updaters.setPhone}
                validator = {(v)=>{
                    if(!_.phoneRegex.test(v)){
                        return 'Invalid phone number!'
                    }
                }}
                mandatory
            />

            <FormFeild
                label="Enter E-mail ID"
                type="email"
                updater = {updaters.setEmail}
                validator = {(v)=>{
                    if(!_.emailRegex.test(v)){
                        return 'Invalid E-mail!'
                    }
                }}
            />

            <FormFeild
                label="Date of Birth"
                type="date"
                updater = {updaters.setDOB}
                mandatory
            />
        </div>
    )
}

function RegForm(props){

    var { id } = useParams()

    var [eventDataReady, setEventDataReady] = useState(false)
    var [eventData, setEventData] = useState()
    var [eventDataError, setEventDataError] = useState(false)

    var [name, setName] = useState()
    var [phone, setPhone] = useState()
    var [email, setEmail] = useState()
    var [dob, setDOB] = useState()

    useEffect(()=>{
        new API().call('/get-event-details', { id })
        .then((resp)=>{
            setEventData(resp.data)
        })
        .catch((err)=>{
            setEventDataError(true)
        })
        .finally(()=>{
            setEventDataReady(true)
        })
    }, [])

    return (
        <div className='reg-root'>
            <Header hideMenus/>
            <div className='reg-container'>
                {
                    eventDataReady?
                        eventData.length!=0?
                            <FestForm
                                eventData={eventData}
                                updaters = {
                                    {
                                        setName,
                                        setPhone,
                                        setEmail,
                                        setDOB
                                    }
                                }
                            />
                            :
                            <div className='reg-data-loading'>
                                {`No events found with name ${id}`}
                            </div>
                    :
                    <div className='reg-data-loading'>
                        {eventDataError?'Unable to load form!':'Hare Krishna!\nLoading registration form...'}
                    </div>
                }
            </div>
        </div>

    )
}


export default RegForm

import React, { useEffect, useState, useRef } from 'react';
import "./index.css"
import Header from '../../components/header';
import API from '../../api';
import _ from "../../_"
import { useParams } from 'react-router-dom';
import moment from 'moment';

function Radio(props){
    var { options, updater, updaterKey, validator, val } = props
    var [sel, setSel] = useState()

    const handleSelect = (o)=>{
        setSel(o)
        updater.current[updaterKey] = o
        val(o)
        validator(o)
    }

    return (
        <div className='input-radio' tabIndex={0} onBlur={()=>{
            validator(sel)
        }}>
            {
                options.map(o=>{
                    return (
                        <div
                            key={o}
                            onClick={()=>{
                                handleSelect(o)
                            }}
                            onKeyDown={(e)=>{
                                if (e.key === "Enter") {
                                    handleSelect(o)
                                  }
                            }}
                            tabIndex={0}
                            className='form-radio-cont'>
                            <div className='form-radio-circle'>
                                <div className={`form-radio-inner-circle${o==sel?'-sel':''}`}></div>
                            </div>
                            <div className='form-radio-value'>{o}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function Checkbox(props){
    var { options, updater, updaterKey, val, validator, processor } = props
    var [sel, setSel] = useState('[]')

    const handleSelect = (o)=>{
        var s = JSON.parse(sel)

        if(s.indexOf(o)==-1){
            s.push(o)
            if(processor){
                s = processor(s)
            }
            updater.current[updaterKey] = JSON.stringify(s)
            setSel(JSON.stringify(s))
            val(s)
            validator(s)
        }else{
            s.splice(s.indexOf(o), 1)
            if(processor){
                s = processor(s)
            }
            updater.current[updaterKey] = JSON.stringify(s)
            setSel(JSON.stringify(s))
            val(s)
            validator(s)
        }
    }

    return (
        <div className='input-checkbox' tabIndex={0} onBlur={()=>{
            validator(JSON.parse(sel))
        }}>
            {
                options.map(o=>{
                    return (
                        <div
                            key={o}
                            onClick={()=>{
                                handleSelect(o)
                            }}
                            onKeyDown={(e)=>{
                                if (e.key === "Enter") {
                                    handleSelect(o)
                                  }
                            }}
                            tabIndex={0}
                            className='form-checkbox-cont'>
                            <div className='form-checkbox-box'>
                                {JSON.parse(sel).indexOf(o)==-1?'☐':'☑'}
                            </div>
                            <div className='form-checkbox-value'>{o}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function FormFeild(props){

    var { label, desc, type, mandatory, processor, updater, updaterKey, validator, options, max, min } = props

    var [value, setValue] = useState('')
    var [valid, setValid] = useState(true)

    type = type || 'text'
    options = options || []

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
                            case 'number':
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

                                            updater.current[updaterKey] = processedValue
                                            setValue(processedValue)
                                            setValid((mandatory?e.target.value!='':true) && (validator?!validator(processedValue):true))
                                        }}
                                        onChange={(e)=>{
                                            setValue(e.target.value)
                                            updater.current[updaterKey] = e.target.value
                                        }}
                                        value={value}
                                        max={max}
                                        min={min}
                                    />
                                )
                            case "radio":
                                return <Radio
                                            options={options}
                                            updater={updater}
                                            updaterKey={updaterKey}
                                            val={(o)=>{
                                                setValue(o)
                                            }}
                                            validator={(v)=>{
                                                if(!v && mandatory){
                                                    setValid(false)
                                                    return true
                                                }else{
                                                    setValid(true)
                                                    return false
                                                }
                                            }}
                                        />
                            case "checkbox":
                                return <Checkbox
                                            options={options}
                                            processor={processor}
                                            updater={updater}
                                            updaterKey={updaterKey}
                                            val={(v)=>{
                                                setValue(v)
                                            }}
                                            validator={(v)=>{
                                                if(!v.length && mandatory){
                                                    setValid(false)
                                                    return true
                                                }else{
                                                    setValid(true)
                                                    return false
                                                }
                                            }}
                                        />
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

function EventForm(props){
    var { eventData, updater } = props

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
                updaterKey = {'name'}
                updater = {updater}
                mandatory
            />

            <FormFeild
                label="Enter your 10-digit mobile number (preferably WhatsApp number)"
                type="tel"
                processor = {(v)=>{
                    return (v || '').toPhoneCase()
                }}
                updaterKey = {'phone'}
                updater = {updater}
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
                updaterKey = {'email'}
                updater = {updater}
                validator = {(v)=>{
                    if(!_.emailRegex.test(v)){
                        return 'Invalid E-mail!'
                    }
                }}
            />

            <FormFeild
                label="Date of Birth"
                type="date"
                updaterKey = {'dob'}
                updater = {updater}
                validator = {(v)=>{
                    const minAge = moment().subtract(90, "years");
                    const maxAge = moment().subtract(5, "years");
                  
                    if (!moment(v, "YYYY-MM-DD", true).isValid()) {
                      return "Invalid date";
                    }
                  
                    if (moment(v).isBefore(minAge) || moment(v).isAfter(maxAge)) {
                      return "Date of birth outside acceptable range";
                    }
                }}
                mandatory
            />

            <FormFeild
                label="Gender"
                type="radio"
                options={['Male', 'Female']}
                updaterKey = {'gender'}
                updater = {updater}
                mandatory
            />

            <FormFeild
                label="How many rounds of Hare Krishna mantra do you chant daily?"
                type="number"
                updaterKey = {'japaRounds'}
                updater = {updater}
                validator = {(v)=>{
                    v = v || -1
                    return v<0||v>64?'Must be between 0 and 64':null
                }}
                mandatory
            />

            <FormFeild
                label="Which one of the following devotees are you in touch with?"
                type="radio"        
                options={_.preacherList.sort().concat(["None"])}
                updaterKey = {'preacher'}
                updater = {updater}
                mandatory
            />

            {
                eventData.dates.map((d)=>{
                    return (
                        <FormFeild
                            label={`Select the slots in which you will be availabale for service on ${ moment(d.date, "YYYY-MM-DD").format("dddd, Do MMMM YYYY")} (${d.day})`}
                            type="checkbox"        
                            options={d.slots.split(",").map(s=> {return s.trim()})}
                            updaterKey = {`${d.eventId}:${d.date}`}
                            updater = {updater}

                            mandatory
                        />
                    )
                })
            }

            
        </div>
    )
}

function RegForm(props){

    var { id } = useParams()

    var [eventDataReady, setEventDataReady] = useState(false)
    var [eventData, setEventData] = useState()
    var [eventDataError, setEventDataError] = useState(false)
    var [test, settest] = useState(0)

    var updater = useRef()


    useEffect(()=>{
        new API().call('/get-event-details', { id })
        .then((resp)=>{
            setEventData(resp.data)
            updater.current = {
                name: '',
                phone: '',
                email: '',
                dob: '',
                gender: '',
                japaRounds: '',
                preacher: '',
            }
            resp.data.dates.forEach(d => {
                updater.current[`${d.eventId}:${d.date}`]=''
            })
        })
        .catch((err)=>{
            setEventDataError(true)
        })
        .finally(()=>{
            setEventDataReady(true)
        })
    }, [])


    const testclick = ()=>{
        settest(Math.random())
        console.log(updater.current)
    }


    return (
        <div className='reg-root'>
            <Header hideMenus/>
            <button onClick={testclick}>OK</button>
            <div className='reg-container'>
                {
                    eventDataReady?
                        eventData.length!=0?
                            <EventForm
                                eventData={eventData}
                                updater={updater}
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

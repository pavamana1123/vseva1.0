import React, { useEffect, useState, useRef } from 'react'
import "./index.css"
import Header from '../../components/header'
import API from '../../api'
import _ from "../../_"
import { useParams } from 'react-router-dom'
import config from './config'
import Form from '../../components/form'
import moment from 'moment'

function RegForm(props){
    var { id } = useParams()

    var [componentData, setComponentData] = useState(
        {
            eventData: {},
            dataReady: false,
            apiError: null,
            config
        }
    )
    var [test, settest] = useState(0)
    var data = useRef({})

    useEffect(()=>{
        new API().call('/get-event-details', { id })
        .then((resp)=>{
            config.title = resp.data.isGroup? resp.data.group.name: resp.data.events.name
            config.desc = resp.data.isGroup? resp.data.group.formDesc: resp.data.events.formDesc
            var availabilityFeilds = resp.data.dates.map(d=>{
                return {
                    label:`Select the slots in which you will be availabale for service on ${moment(d.date, "YYYY-MM-DD").format("dddd, Do MMMM YYYY")} (${d.day})`,
                    type:"checkbox",
                    options:d.slots.split(",").map(s=> {return s.trim()}),
                    id: `${d.eventId}:${d.date}`,
                    mandatory: true
                }
            })
            var splitIndex = 0 
            for(var i=0; i<config.feilds.length; i++){
                if(config.feilds[i].id=="self"){
                    splitIndex=i-1
                    break
                }
            }
            config.feilds = [...config.feilds.slice(0, splitIndex), ...availabilityFeilds, ...config.feilds.slice(splitIndex)];
            setComponentData(
                {
                    eventData: resp.data,
                    dataReady: true,
                    apiError: false,
                    config
                }
            )
        })
        .catch((err)=>{
            setComponentData(
                {
                    eventData: {},
                    dataReady: false,
                    apiError: true,
                }
            )
        })       
    }, [])

    const testclick = ()=>{
        settest(Math.random())
        console.log(data.current)
    }

    const onSubmit = ()=>{
        
    }

    return (
        <div className='reg-root'>
            <Header hideMenus/>
            {/* <button onClick={testclick}>OK</button> */}
            <div className='reg-container'>
                {
                    componentData.dataReady?
                        !!componentData.eventData?
                            <Form
                                data={data}
                                config={componentData.config}
                                onSubmit={onSubmit}
                            />
                            :
                            <div className='reg-data-loading'>
                                {`No events found with name ${id}`}
                            </div>
                    :
                    <div className='reg-data-loading'>
                        {componentData.apiError?'Unable to load form!':'Hare Krishna!\nLoading registration form...'}
                    </div>
                }
            </div>
        </div>

    )
}


export default RegForm

import React, { useEffect, useState } from 'react';
import "./index.css"
import Header from '../../components/header';
import API from '../../api';
import _ from "../../_"
import { useParams } from 'react-router-dom';

function FestForm(props){
    var { festivalData } = props

    return (
        <div className='fest-container'>
            <div className='fest-header'>
                <div className='fest-logo-cont'>
                    <div className='fest-logo'>
                        SKJ
                    </div>
                </div>
                <div className='fest-title'>
                    <div className='fest-name'>Sri Krishna Janmasthtami</div>
                    <div className='fest-dates'>September 6th & 7th</div>
                </div>
            </div>
            <div className='fest-desc'>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
            <div className='fest-phone-check'>
                <label>Enter your 10-digit phone number to proceed</label>
                <input type='text' className='fest-phone'/>
                <button>Proceed</button>
            </div>
        </div>
    )
}

function RegForm(props){

    var { id } = useParams()

    var [festivalDataReady, setFestivalDataReady] = useState(false)
    var [festivalData, setFestivalData] = useState()
    var [festivalDataError, setFestivalDataError] = useState(false)

    useEffect(()=>{
        new API().call('/get-festival-details', { id })
        .then((resp)=>{
            setFestivalData(resp.data)
        })
        .catch((err)=>{
            setFestivalDataError(true)
        })
        .finally(()=>{
            setFestivalDataReady(true)
        })
    }, [])

    return (
        <div className='reg-root'>
            <Header hideMenus/>
            <div className='reg-container'>
                {
                    festivalDataReady?
                        festivalData.length!=0?
                            <FestForm festivalData={festivalData}/>
                            :
                            <div className='reg-data-loading'>
                                {`No festivals found with name ${id}`}
                            </div>
                    :
                    <div className='reg-data-loading'>
                        {festivalDataError?'Unable to load form!':'Hare Krishna!\nLoading registration form...'}
                    </div>
                }
            </div>
        </div>

    )
}


export default RegForm

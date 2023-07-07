import React, { useState } from 'react'
import "./index.css"
import _ from "../../_"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Radio(props){
    var { options, data, id, setValue } = props
    var [sel, setSel] = useState()

    const handleSelect = (o)=>{
        setSel(o)
        data.current[id] = o
        setValue(o)
    }

    return (
        <div className='input-radio' tabIndex={0} onBlur={()=>{ setValue(sel) }}>
            {
                options.map(o=>{
                    return (
                        <div
                            onBlur={()=>{ setValue(sel) }}
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
    var { options, data, id, setValue } = props
    var [sel, setSel] = useState([])

    const handleSelect = (o)=>{
        var s1 = JSON.parse(JSON.stringify(sel))
        if(s1.indexOf(o)==-1){
            s1.push(o)
        }else{
            s1.splice(s1.indexOf(o), 1)
        }
        var s2 = JSON.parse(JSON.stringify(s1))
        data.current[id] = s2
        setSel(s2)
        setValue(s2)
    }

    return (
        <div className='input-checkbox' tabIndex={0} onBlur={()=>{ setValue(sel) }}>
            {
                options.map(o=>{
                    return (
                        <div
                            onBlur={()=>{ setValue(sel) }}
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
                                {sel.indexOf(o)==-1?'☐':'☑'}
                            </div>
                            <div className='form-checkbox-value'>{o}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function Feild(props){

    var { label, desc, type, mandatory, processor, data, id, invalidator, options, max, min } = props

    var [value, setValue] = useState('')
    var [valid, setValid] = useState(true)

    type = type || 'text'
    options = options || []

    return(
        type!="section"?
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


                                                data.current[id] = processedValue
                                                setValue(processedValue)
                                                setValid((mandatory?e.target.value!='':true) && (invalidator?!invalidator(processedValue):true))
                                            }}
                                            onChange={(e)=>{
                                                setValue(e.target.value)
                                                data.current[id] = e.target.value
                                            }}
                                            value={value}
                                            max={max}
                                            min={min}
                                        />
                                    )
                                case "radio":
                                    return <Radio
                                                options={options}
                                                data={data}
                                                id={id}
                                                setValue={(o)=>{
                                                    setValue(o)
                                                    setValid(!(mandatory && !o))
                                                }}
                                            />
                                case "checkbox":
                                    return <Checkbox
                                                options={options}
                                                processor={processor}
                                                data={data}
                                                id={id}
                                                setValue={(v)=>{
                                                    setValue(v)
                                                    setValid(!(mandatory && v.length==0))
                                                }}
                                            />
                            }
                        })()
                    }
                    <div className='form-feild-warning'>
                        {!valid? invalidator? invalidator(value):'* This is a mandatory feild':''}
                    </div>
                </div>
            </div>
        :
            <div className='form-section'>{label}</div>
    )
}

function Form(props){
    var { data, config, onSubmit } = props

    const invalidForm = ()=>{
        var invalidity = config.feilds.reduce((invalid, feild)=>{
            return invalid || (
                (feild.mandatory && !(typeof(data.current[feild.id])=="object"?data.current[feild.id].length:data.current[feild.id]))
                ||
                (feild.invalidator && !!feild.invalidator(data.current[feild.id]))
            )
        }, false)
        return invalidity
    }

    const handleSubmit = ()=>{
        if(invalidForm()){
            toast.error('Some feilds may be incorrect. Please check again!',{
                position: 'top-right',
                className: 'form-submit-error'
              })
        }else{
            onSubmit()
        }
    }

    return (
        <div className='form-container'>
            <div className='form-header'>
                <div className='form-title'>
                    {config.title}
                </div>
                <hr className='form-hr'/>
                <div className='form-description'>
                    {config.desc}
                </div>
            </div>
            {
                config.feilds.map(config=>{
                    return (
                        <Feild
                            label={config.label}
                            type={config.type}
                            processor={config.processor}
                            id={config.id} 
                            data={data}
                            mandatory={config.mandatory}
                            invalidator={config.invalidator}
                            options={config.options}
                        />                        
                    )
                })
            }
            <button
                className='form-submit'
                onClick={handleSubmit}
            >Submit</button>     
        </div>
    )
}

export default Form
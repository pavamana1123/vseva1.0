import { useEffect, useRef, useState } from "react"
import Header from '../../components/header';
import DP from '../../components/dp';
import "./index.css"
import _ from "../../_";

const EditProfile = (props) => {

    var [user, setUser] = useState()
    var imgip = useRef()

    useEffect(()=>{
        let save = _.getSave()
        setUser(save.users[save.index])
    }, [])

    const initImageSelect = ()=>{
        imgip.current.click()
    }
    
    return(
        <div className="edit-profile-root">
            <Header/>
            <input ref={imgip} id="image-picker" type="file" accept="image/*"/>
            {user?<div className="edipro-content">
                <div className="edipro-dp-holder" onClick={initImageSelect}>
                    <DP className="edipro-dp" user={user} size={"40vw"}/>
                    <img src="img/common/pen.svg" className="edipro-pen"/>
                </div>
            </div>:null}
        </div>
    )
}

export default EditProfile
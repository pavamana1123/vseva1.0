import { useEffect, useRef, useState, useCallback } from "react"
import Header from '../../components/header';
import DP from '../../components/dp';
import "./index.css"
import _ from "../../_";

import Cropper from 'react-easy-crop'

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

    const ImageCropper = () => {
        const [crop, setCrop] = useState({ x: 0, y: 0 })
        const [zoom, setZoom] = useState(1)
        const [rotation, setRotation] = useState(0)
        
        const onCropChange = useCallback((crop) => {
            setCrop(crop)
        }, [])
        
        const onZoomChange = useCallback((zoom) => {
            setZoom(zoom)
        }, [])
        
        const onRotationChange = useCallback((rotation) => {
            setRotation(rotation)
        }, [])
    
        return (
            <Cropper
                image={"https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"} // replace with your image source
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onRotationChange={onRotationChange}
                aspect={1} // set the aspect ratio for 1:1 cropping
            />
        )
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
            <ImageCropper/>
        </div>
    )
}

export default EditProfile
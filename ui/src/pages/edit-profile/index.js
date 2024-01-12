import { useEffect, useRef, useState, useCallback } from "react"
import Header from '../../components/header';
import DP from '../../components/dp';
import "./index.css"
import _ from "../../_";

import Cropper from 'react-easy-crop'

const EditProfile = () => {

    var [user, setUser] = useState()
    var [image, setImage] = useState(null)
    var imgip = useRef()

    useEffect(()=>{
        let save = _.getSave()
        setUser(save.users[save.index])
    }, [])

    const initImageSelect = ()=>{
        imgip.current.click()
    }

    const ImageCropper = ({src}) => {
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
            <div>
                <div className="edipro-crop-head">
                    <div className="edipro-crop-head-left">
                        <div>{"<"}</div>
                        <div>{"Crop Photo"}</div>
                    </div>
                    <div className="edipro-crop-head-done">Done</div>
                </div>
                <Cropper
                    image={src} // replace with your image source
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onRotationChange={onRotationChange}
                    aspect={1} // set the aspect ratio for 1:1 cropping
                    onCropComplete={(a)=>{
                        console.log(a)
                    }}
                    cropShape="round"
                    zoomSpeed={0.1}
                    classes={{
                        cropAreaClassName: "edipro-crop-area",
                        containerClassName: "edipro-crop-container"
                    }}
                />
            </div>
        )
    }

    // useEffect(()=>{
    //     const canvas = document.createElement('canvas')
    //     var x = 150
    //     canvas.width = x
    //     canvas.height = x
    //     const ctx = canvas.getContext('2d')

    //     var img = new Image()
    //     img.onload = ()=>{
    //         ctx.drawImage(img, 200, 0, x, x, 0, 0, x, x)
    //         setImage(canvas.toDataURL('image/jpeg'))
    //     }
    //     img.src = "/img/header/logo.png"
    // }, [])

    const onUserPictureSelect = (e) => {
        if(!e.target.files){
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    return(
        <div className="edit-profile-root">
            <Header/>
            <input ref={imgip} id="image-picker" type="file" accept="image/*" onChange={onUserPictureSelect}/>
            {user?<div className="edipro-content">
                <div className="edipro-dp-holder" onClick={initImageSelect}>
                    <DP className="edipro-dp" user={user} size={"40vw"}/>
                    <img src="img/common/pen.svg" className="edipro-pen"/>
                </div>
            </div>:null}
            {image && <ImageCropper src={image}/>}
            {/* {image && <img src={image}/>} */}
        </div>
    )
}

export default EditProfile 
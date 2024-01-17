import { useEffect, useRef, useState, useCallback } from "react"
import Header from '../../components/header';
import DP from '../../components/dp';
import "./index.css"
import _ from "../../_";

import Cropper from 'react-easy-crop'
import Icon from "../../components/icon";

const EditUserPhoto = ({deviceInfo}) => {

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
                <div className="editup-crop-head">
                    <div className="editup-crop-head-left">
                        <div>{"<"}</div>
                        <div>{"Crop Photo"}</div>
                    </div>
                    <div className="editup-crop-head-done">Done</div>
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
                        cropAreaClassName: "editup-crop-area",
                        containerClassName: "editup-crop-container"
                    }}
                />
            </div>
        )
    }

    useEffect(()=>{
    }, [])

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
            <div className="editup-img-sel-cont">
            {!deviceInfo.isComp?
                <div className="editup-drag-space"></div>:
                <div className="editup-img-sel" onClick={initImageSelect}>
                    <div>{"Click here"}</div>
                    <div className="editup-flex">
                        <Icon name="image" color={"black"}/>
                        <div>{"to select image from gallery"}</div>
                    </div>
                    <div>{"OR"}</div>
                    <div className="editup-flex">
                        <Icon name="photo-camera" color={"black"}/>
                        <div>{"to open camera"}</div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default EditUserPhoto 
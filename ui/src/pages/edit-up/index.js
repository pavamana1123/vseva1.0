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
    var [croppedImage, setCroppedImage] = useState(null)
    var imgip = useRef()

    useEffect(()=>{
        let save = _.getSave()
        setUser(save.users[save.index])
    }, [])

    const initImageSelect = ()=>{
        imgip.current.click()
    }

    const ImageCropper = ({src, onComplete}) => {
        const [crop, setCrop] = useState({ x: 0, y: 0 })
        const [zoom, setZoom] = useState(1)
        const [rotation, setRotation] = useState(0)
        const [cropValue, setCropValue] = useState()
        
        const onCropChange = useCallback((crop) => {
            setCrop(crop)
        }, [])
        
        const onZoomChange = useCallback((zoom) => {
            setZoom(zoom)
        }, [])
        
        const onRotationChange = useCallback((rotation) => {
            setRotation(rotation)
        }, [])

        const onCropValueChange = useCallback((cropValue) => {
            setCropValue(cropValue)
        }, [])

        const onDone = ()=>{
            const img = new Image()
            img.onload = () => {
                onComplete({
                    x: img.naturalWidth * (cropValue.x/100),
                    y: img.naturalHeight * (cropValue.y/100),
                    width: img.naturalWidth * (cropValue.width/100),
                    height: img.naturalHeight * (cropValue.height/100)
                })
            }
            img.src = src
        }
    
        return (
            <div>
                <div className="editup-crop-head">
                    <div className="editup-crop-head-left">
                        <div>{"<"}</div>
                        <div>{"Crop Photo"}</div>
                    </div>
                    <div className="editup-crop-head-done" onClick={onDone}>Done</div>
                </div>
                <Cropper
                    image={src}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onRotationChange={onRotationChange}
                    aspect={1}
                    onCropComplete={onCropValueChange}
                    cropShape="round"
                    zoomSpeed={0.1}
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

    const onComplete = useCallback(cropValue=>{

        const canvas = document.createElement('canvas')
        canvas.width = cropValue.width
        canvas.height = cropValue.height
        const ctx = canvas.getContext('2d')

        var img = new Image()
        img.onload = ()=>{
            ctx.drawImage(img, -cropValue.x, -cropValue.y)
            setCroppedImage(canvas.toDataURL('image/jpeg'))
            setImage(null)
        }
        img.src = image
    }, [image])

    return(
        <div className="edit-profile-root">
            {!image && <Header/>}
            <input ref={imgip} id="image-picker" type="file" accept="image/*" onChange={onUserPictureSelect}/>

            {image?
                <ImageCropper src={image} onComplete={onComplete}/>
                :
                <div className="editup-img-sel-cont">
                    {!deviceInfo.isComp?
                        <div className="editup-drag-space"></div>:
                        <div className="editup-img-sel" onClick={initImageSelect}>
                            <div style={{marginBottom: "1vw"}}><b>{"Tap here to"}</b></div>
                            <div className="editup-flex">
                                <Icon className="editup-img-sel-icon" name="image" color={"black"}/>
                                <div>{"Select image from gallery"}</div>
                            </div>
                            <div className="editup-or">{"OR"}</div>
                            <div className="editup-flex">
                                <Icon className="editup-img-sel-icon" name="photo-camera" color={"black"}/>
                                <div>{"Open camera"}</div>
                            </div>
                        </div>}
                </div>
            }

            {croppedImage && <img src={croppedImage}/>}

        </div>
    )
}

export default EditUserPhoto 
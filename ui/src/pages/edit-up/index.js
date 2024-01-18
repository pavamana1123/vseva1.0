import { useEffect, useRef, useState, useCallback } from "react"
import Header from '../../components/header';
import axios from "axios";
import "./index.css"
import _ from "../../_";
import ImageCropper from "./cropper";

import Icon from "../../components/icon";

const EditUserPhoto = ({deviceInfo}) => {

    const minPhotoSize = 800

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

    const onUserPictureSelect = (e) => {
        if(!e.target.files){
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            var img = new Image()
            img.onload = ()=>{
                var min = img.naturalHeight>=img.naturalWidth?img.naturalWidth:img.naturalHeight
                if(min>=800){
                    setImage(e.target.result)
                }else{
                    alert(`This image is small in size. Please select an image that is atleast 800 pixels in width and height.`)
                }
            }
            img.src = e.target.result
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

            const scaledCanvas = document.createElement('canvas')
            scaledCanvas.width = minPhotoSize
            scaledCanvas.height = minPhotoSize
            const scaledCtx = scaledCanvas.getContext('2d')
            scaledCtx.drawImage(canvas, 0, 0, minPhotoSize, minPhotoSize)

            scaledCanvas.toBlob(blob => {
                const formData = new FormData()
                formData.append('file', blob, `${user.id}.jpg`)
    
                axios.post(`https://cdn.iskconmysore.org/content?path=vseva/dp/${user.id}.jpg`, formData, {
                    headers: {
                        'api-key': '0fd429a8-89b8-4524-8d12-a3dd7b6b1dc7',
                        'Content-Type': 'image/jpeg',
                    },
                })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error uploading image:', error)
                });
            }, 'image/jpg')
            
            setImage(null)
        }
        img.src = image
    }, [image])

    return(
        <div className="edit-profile-root">
            {!image && <Header/>}
            <input ref={imgip} id="image-picker" type="file" accept="image/*" onChange={onUserPictureSelect}/>

            {image?
                <ImageCropper src={image} minSize={minPhotoSize} onComplete={onComplete}/>
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
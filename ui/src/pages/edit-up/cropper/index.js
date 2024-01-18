import { useCallback, useState, useEffect } from "react"
import "./index.css"
import Cropper from 'react-easy-crop'

const ImageCropper = ({src, minSize, onComplete}) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [cropValue, setCropValue] = useState()

    var [ imageSize, setImageSize ] = useState()

    useEffect(()=>{
        const img = new Image()
        img.onload = () => {
            setImageSize({
                width: img.naturalWidth,
                height: img.naturalHeight,
                min: img.naturalHeight>=img.naturalWidth?img.naturalWidth:img.naturalHeight
            })
        }
        img.src = src
    }, [src])
    
    const onCropChange = useCallback((crop) => {
        setCrop(crop)
    }, [])
    
    const onZoomChange = useCallback((zoom) => {
        setZoom(zoom)
    }, [imageSize])

    const onRotationChange = useCallback((rotation) => {
        setRotation(rotation)
    }, [])

    const onCropValueChange = useCallback((cropValue) => {
        setCropValue(cropValue)
    }, [])

    const onDone = ()=>{
        onComplete({
            x: imageSize.width * (cropValue.x/100),
            y: imageSize.height * (cropValue.y/100),
            width: imageSize.width * (cropValue.width/100),
            height: imageSize.height * (cropValue.height/100)
        })
    }

    return (
        <div>
            <div className="imgcropup-crop-head">
                <div className="imgcropup-crop-head-left">
                    <div>{"<"}</div>
                    <div>{"Crop Photo"}</div>
                </div>
                <div className="imgcropup-crop-head-done" onClick={onDone}>Done</div>
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
                maxZoom={imageSize?imageSize.min/minSize:3}
            />
        </div>
    )
}

export default ImageCropper
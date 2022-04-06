import React, { useState } from "react"
import { Button } from "react-bootstrap"
export const UploadImages = ({obj, update}) => {
    const [uploadedImage, setUploadedImage] = useState("")
    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = {...obj}
            copy.img = resultEvent.info.secure_url
            update(copy)
            setUploadedImage(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
        }
    }
    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "ehils", 
            uploadPreset: "ehils_preset"}, 
            (error, result) => {checkUploadResult(result)})
        widget.open()
    }
    return (
        <>
            <Button variant="flat" id="uploadBtn" color ="success" outline type="file" onClick={showWidget} >Upload an image</Button>
            <p>{uploadedImage}</p>
        </>
    )
}















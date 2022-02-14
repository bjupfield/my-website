import { useState } from "react";
import "../Style/DownloadFileButton.css"
function DownloadFileButton({file, inCreator}){
    const [mustSave, setMustSave] = useState(false);
    const url = URL.createObjectURL(file)
    function sayMustDownload(){
        setMustSave(!mustSave)
    }
    return mustSave ? <div className={inCreator ? "inCreator" : "inDisplay"}>
            {file.size === 0 ? <div onClick={()=>sayMustDownload()}>Download</div>: <a style={{textDecoration:"none", color: "#2f953d"}} href={url} download={file.name}>Download</a>}
            <div className="overlay" onClick={()=>sayMustDownload()}><div className="overlayText" onClick={()=>sayMustDownload()}>You Must SAVE To Download</div></div>
        </div> 
    : 
        <div className={inCreator ? "inCreator" : "inDisplay"}>
            {file.size === 0 ? <div onClick={()=>sayMustDownload()}>Download</div>: <a style={{textDecoration:"none", color: "white"}} href={url} download={file.name}>Download</a>}
        </div>
}
export default DownloadFileButton;
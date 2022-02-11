import { useState } from "react";
function DownloadFileButton({file}){
    const [mustSave, setMustSave] = useState(false);
    const url = URL.createObjectURL(file)
    function sayMustDownload(){
        setMustSave(!mustSave)
    }
    return mustSave ? <div style={{cursor:"pointer", border:"solid", borderWidth:"1px", borderColor:"blanchedalmond", color: "#2f953d"}}>
            {file.size === 0 ? <div onClick={()=>sayMustDownload()}>Download</div>: <a style={{textDecoration:"none", color: "#2f953d"}} href={url} download={file.name}>Download</a>}
            <div style={{position: "fixed", top: "0px", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.5)"}} onClick={()=>sayMustDownload()}><div style={{position: 'absolute' ,top: "45%", width: "100%", textAlign: "center", color: "blue", fontWeight: "700", fontSize: "50px"}} onClick={()=>sayMustDownload()}>YOU MUST SAVE TO Download</div></div>
        </div> 
    : 
        <div style={{cursor:"pointer", border:"solid", borderWidth:"1px", borderColor:"blanchedalmond", color: "#2f953d"}}>
            {file.size === 0 ? <div onClick={()=>sayMustDownload()}>Download</div>: <a style={{textDecoration:"none", color: "#2f953d"}} href={url} download={file.name}>Download</a>}
        </div>
}
export default DownloadFileButton;
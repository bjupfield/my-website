import { useEffect, useState } from "react";
import IntepretFile from "../Functions/InterpretFile";
import "../Style/CreatorAccountDisplayStyling.css"
import DownloadFileButton from "./DownloadFileButton";
function CreatorAccountDisplay({file}){
    const [color, setColor] = useState("")
    const [path, setPath] = useState("")
    const [viewbox, setViewBox] = useState("")
    const [render, norender] = useState(false)
    const [sharedOrNot, setSharedOrNot] = useState(file.shared)
    const z = IntepretFile(file)
    useEffect(()=>{
        z.text()
        .then(r=>{
            const b = r.split("path(\"")
            const c = b[1].split("\");")
            const path = c[0]
            const color = c[1].split(/(fill:)/)[2].split(";")[0].replace(" ", "")
            setViewBox(b[0].split("\"")[1])
            setPath(path)
            setColor(color)
        })}, [])
    function deleteButton(){
        fetch(`http://localhost:3000/saveFile/${file.id}`,{
            method: "DELETE",
            credentials: "include",
            headers : {
                "Content-Type": "application/json"
            },
        })
        .then(r=>r.json())
        .then(r=>{
            if(r === true){
                norender(true)
            }
        })
    }
    function editButton(){
        console.log("edit")
    }
    function shareButton(){
        fetch(`http://localhost:3000/share/${file.id}`,{
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(true)
        })
        .then(r=>r.json())
        .then(r=>{
            if(r === true){
                setSharedOrNot(!sharedOrNot)
            }
        })
    }
    const createdAt = file.created_at.replaceAll("-","/").split("T")
    let amorpm = "AM";
    createdAt[1] = createdAt[1].split(":").map((element, ind) => {
        if(ind === 0 && parseFloat(element) + 1 > 12){
            amorpm = "PM"
        };
        return ind === 0 ? parseFloat(element) + 1 > 12 ? parseFloat(element) - 11 : parseFloat(element) + 1 : parseFloat(element) + 1
    }).slice(0, 2).join(":").concat(" " + amorpm);
    return render ? "" : <div className="styling">
        <svg viewBox={viewbox}><path d={path} fill={color}></path></svg>
        <div className= "name">{z.name.split(".")[0]}</div>
        <div className="info">{`Created at: ${createdAt[0]}`}</div>
        <div className="time">{createdAt[1]}</div>
        <div className="edit" onClick={()=>editButton()}>
            Edit
        </div>
        <DownloadFileButton file={z}></DownloadFileButton>
        {!sharedOrNot ? <div className="share" onClick={()=>shareButton()}>
            Share
        </div> :
        <div className="unshare" onClick={()=>shareButton()}>
            Remove Share
        </div>}
        <div className="delete" onClick={()=>deleteButton()}>
            Delete
        </div>
        <div className="GodfuckingDammit"></div>
        </div>
}
export default CreatorAccountDisplay;
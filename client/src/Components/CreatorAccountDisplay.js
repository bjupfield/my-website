import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import IntepretFile from "../Functions/InterpretFile";
import "../Style/CreatorAccountDisplayStyling.css"
import DownloadFileButton from "./DownloadFileButton";
function CreatorAccountDisplay({file, ind, inBrowse = false, setLoginPath}){
    const [color, setColor] = useState("")
    const [path, setPath] = useState("")
    const [viewbox, setViewBox] = useState("")
    const [render, norender] = useState(false)
    const [likes, setLikes] = useState(file.likes.length);
    const [liked, setLiked] = useState( (file.likes.find(likearray=>likearray.ifUser) !== undefined))
    const [sharedOrNot, setSharedOrNot] = useState(file.share)
    const [renderLogin, setRenderLogin] = useState(false);
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
    function checkLike(){
        fetch(`http://localhost:3000/like/${file.id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(r=>r.json())
        .then(r=>{
            if(r){
                if(r.error){
                    if(r.error === "Couldn't find User without an ID"){
                        setLoginPath("/creator/browse")
                        setRenderLogin(true)
                    }
                    else{
                        console.log("File doesnt exist")
                    }
                }
                // else i)
                else{
                    console.log(r)
                    setLikes(likes + 1)
                    setLiked(true)
                }
            }
            else{
                setLikes(likes - 1)
                setLiked(false)
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
    return renderLogin ? <Navigate to={"/login"}></Navigate> : render ? "" : <div className={ind === 0 ? "first" : "styling"}>
        <svg viewBox={viewbox}><path d={path} fill={color}></path></svg>
        <div className= "name">{z.name.split(".")[0]}</div>
        <div className="likeButton">{" : " + likes}</div>
        <div className={inBrowse ? liked ? "likedHeart" : "browseHeart" : "likeHeart"} onClick={inBrowse ?()=> checkLike() : ()=>console.log("hello")}>❤</div>
        {inBrowse ? <div className="name">Author: {file.user.username}</div> : ""}
        <div className="info">{`Created at: ${createdAt[0]}`}</div>
        <div className="time">{createdAt[1]}</div>
        <div className="edit" onClick={()=>editButton()}>
            Edit
        </div>
        <DownloadFileButton file={z}></DownloadFileButton>
        {inBrowse ? "" :
        !sharedOrNot ? <div className="share" onClick={()=>shareButton()}>
            Share
        </div> :
        <div className="unshare" onClick={()=>shareButton()}>
            Remove Share
        </div>
        }
        {inBrowse ? "" :
        <div className="delete" onClick={()=>deleteButton()}>
            Delete
        </div>
        }
        <div className="GodfuckingDammit"></div>
        </div>
}
export default CreatorAccountDisplay;
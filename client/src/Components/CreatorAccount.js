import { useEffect, useState } from "react";
import CreatorAccountDisplay from "./CreatorAccountDisplay";
import CreatorHeaders from "./CreatorHeaders";
import { Navigate } from "react-router-dom";

function CreatorAccount({setLoginPath, setEditNum}){
    const [filesList, setFilesList] = useState([])
    const [renderLogin, setRenderLogin] = useState(false)
    useEffect(()=>{
        fetch("https://svg-website.herokuapp.com/checkLoggedIn",
        {
            method: "GET",
            credentials: "include",
        })
        .then(r=>r.json())
        .then(r=>{
            if(r){
                fetch("https://svg-website.herokuapp.com/filesUser", {
                    method: "GET",
                    credentials: "include",
                })
                .then(r=>r.json())
                .then(r=>{
                    setFilesList(r)
                })
            }
            else{
                setLoginPath("/creator/account")
                setRenderLogin(true)
            }
        })
    },[])
    return renderLogin ? <Navigate to="/login"></Navigate> : <div className="overflowsetter">
        <CreatorHeaders page={"/creator/account"}></CreatorHeaders>
        {filesList.map((elemen, ind)=><CreatorAccountDisplay file={elemen} ind={ind} setEditNum={setEditNum} length={filesList.length}></CreatorAccountDisplay>)}
    </div>
}
export default CreatorAccount;
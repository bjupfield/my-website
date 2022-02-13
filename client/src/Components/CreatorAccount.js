import { useEffect, useState } from "react";
import CreatorAccountDisplay from "./CreatorAccountDisplay";
import CreatorHeaders from "./CreatorHeaders";
import { Navigate } from "react-router-dom";

function CreatorAccount({setLoginPath}){
    const [filesList, setFilesList] = useState([])
    const [renderLogin, setRenderLogin] = useState(false)
    useEffect(()=>{
        fetch("http://localhost:3000/checkLoggedIn",
        {
            method: "GET",
            credentials: "include",
        })
        .then(r=>r.json())
        .then(r=>{
            if(r){
                fetch("http://localhost:3000/filesUser", {
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
        {filesList.map((elemen, ind)=><CreatorAccountDisplay file={elemen} ind={ind}></CreatorAccountDisplay>)}
    </div>
}
export default CreatorAccount;
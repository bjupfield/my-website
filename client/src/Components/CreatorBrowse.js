import { useEffect, useState } from "react";
import CreatorHeaders from "./CreatorHeaders";
import CreatorAccountDisplay from "./CreatorAccountDisplay";
import "../Style/CreatorAccount.css"

function CreatorBrowse({setLoginPath, setEditNum}){
    const [Files, setFiles] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/filesAntiUser", {
            method: "GET",
            headers:{
                "Content-Type" : "application/json"
            },
            credentials: "include"
        })
        .then(r=>r.json())
        .then(r=>{
            console.log(r)
            setFiles(r)
            console.log(r)
        })
    }, [])
    return <div className="overflowsetter">
        <CreatorHeaders page={"/creator/browse"}></CreatorHeaders>
        {Files.map((elemen, ind)=><CreatorAccountDisplay file={elemen} ind={ind} inBrowse={true} setLoginPath={setLoginPath} setEditNum={setEditNum}></CreatorAccountDisplay>)}
    </div>
}
export default CreatorBrowse;
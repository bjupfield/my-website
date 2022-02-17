import { useEffect, useState } from "react";
import CreatorAccountDisplay from "./CreatorAccountDisplay";
import CreatorHeaders from "./CreatorHeaders";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
function CreatorAccount({setLoginPath, setEditNum, helm}){
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
        <Helmet
    >
      <title>SVGs</title>
      <link  rel="icon"
          type="image/png"
          href={helm}
          sizes="16x16"></link>
    </Helmet>
        <CreatorHeaders page={"/creator/account"}></CreatorHeaders>
        {filesList.map((elemen, ind)=><CreatorAccountDisplay file={elemen} ind={ind} setEditNum={setEditNum} length={filesList.length}></CreatorAccountDisplay>)}
    </div>
}
export default CreatorAccount;
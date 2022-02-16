import {useState } from "react";
import LoginBar from "./LoginBar";
import {Navigate} from "react-router-dom";
import "../Style/Login.css"
function LoginCreator({ setLoggedIn }){
    const [intro, setIntro] = useState("Must Login to Save")
    const [logins, setLogins] = useState("")
    const [passwords, setPasswords] = useState("")
    function doPassword(e){
        setPasswords(e.value)
    }
    function doLogin(e){
        setLogins(e.value)
    }
    function create(){
        fetch("https://svg-website.herokuapp.com/user",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: logins,
                password: passwords,
            })
        })
        .then(r=>r.json())
        .then(r=>{
            if(r.errors){
                if(r.errors.username){
                    setIntro(`Username ${r.errors.username[0]}!!!`)
                }
                else{
                    setIntro(`Password ${r.errors.password[0]}!!!`)
                }
            }
            else{
                setLoggedIn(false)
            }
        })
    }
    function login(){
        fetch("http://localhost:3000/login",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: logins,
                password: passwords
            })
        })
        .then(r=>r.json())
        .then(r=>{
            if(r.error){
                setIntro(r.error)
            }
            else{
                setLoggedIn(false)
            }
        })
    }
    return <div className="big"
    >
        <div className="intro" >{intro}</div>
        <LoginBar textMess={"Login"} value={logins} valueChange={doLogin}/>
        <LoginBar textMess={"Password"} value={passwords} valueChange={doPassword}/>
        <div style={{padding:"5%"}}></div>
        <div className="margin">
            <div className="left" onClick={()=>create()}>
                Create
            </div>
            <div className="right" onClick={()=>login()}>
                Login
            </div>
        </div>
    </div>
}
export default LoginCreator;
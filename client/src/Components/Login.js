import {useState } from "react";
import LoginBar from "./LoginBar";
import {Navigate} from "react-router-dom";
import "../Style/Login.css"
function Login({ afterloginpath = "/homepage" }){
    const [intro, setIntro] = useState("Plz Enter Password")
    const [navigateNow, setNavigateNow] = useState(false)
    const [logins, setLogins] = useState("")
    const [passwords, setPasswords] = useState("")
    function doPassword(e){
        setPasswords(e.value)
    }
    function doLogin(e){
        setLogins(e.value)
    }
    function create(){
        fetch("http://localhost:3000/user",{
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
                setNavigateNow(true)
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
                setNavigateNow(true)
            }
        })
    }
    console.log(afterloginpath)
    return navigateNow ? <Navigate to={`${afterloginpath}`}/> : <div>
        <div className="padding"></div>
        <div
        className="big"
        >
            <div className=""></div>
            <div className="intro">{intro}</div>
            <LoginBar textMess={"Login"} value={logins} valueChange={doLogin}/>
            <LoginBar textMess={"Password"} value={passwords} valueChange={doPassword}/>
            <div style={{padding:"3%"}}></div>
            <div className="margin">
                <div onClick={()=>create()} className="left">
                    Create
                </div>
                <div onClick={()=>login()} className="right">
                    Login
                </div>
            </div>
        </div>
    </div>
}
export default Login;
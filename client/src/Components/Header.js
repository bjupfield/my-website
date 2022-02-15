import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import IntepretFile from "../Functions/InterpretFile";
import "../Style/Header.css"
function Header({CurrentPlace}){
    const placelist = ["Creator", "HomePage"]
    const [imgFile, setImgFile] = useState(new File([""], "", {
        type: "image/png"
    }))
    const [doNavigator, setDoNavigator] = useState("");
    function selectChanger(selected){
        if(selected === CurrentPlace){
            console.log(selected)
        }
        else{
            setDoNavigator(selected)
        }
    }
    useEffect(()=>{
        fetch(`http://localhost:3000/privateFile/${1}`).then(r=>r.json()).then(r=>{
        const v = IntepretFile(r)
        setImgFile(v)
    })
    },[])
    const interpretedImage = URL.createObjectURL(imgFile);
    return doNavigator !== "" ? <Navigate to={`/${doNavigator}`}/> : <div className="Header">
        <div className="carrion" onChange={e=>selectChanger(e.target.value)}>
            <select>
                <option>{CurrentPlace}</option>
                {placelist.filter(e=>!(e===CurrentPlace)).map(e=><option>{e}</option>)}
            </select>
        </div>
        <Link to="/login"style={{float: "Right", height:"38px", width:"38px", backgroundColor: "#664591", marginLeft: "5px", boxShadow: "inset 0px 0px 5px 0px black"}}>
            <img
                style={{height: "37px", margin: ".5px", color: "transparent", backgroundColor: "transparent"}}
                src={interpretedImage}
                alt="Account"
                layout="fill"
                // objectFit="contain"
            /></Link>
    </div>
}
export default Header;
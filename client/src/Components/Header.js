import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../Style/Header.css"
function Header({CurrentPlace}){
    const placelist = ["Creator", "HomePage"]
    const [doNavigator, setDoNavigator] = useState("");
    function selectChanger(selected){
        if(selected === CurrentPlace){
            console.log(selected)
        }
        else{
            setDoNavigator(selected)
        }
    }
    return doNavigator !== "" ? <Navigate to={`/${doNavigator}`}/> : <div style={{width: "max", height: "40px", backgroundColor: "grey", boxShadow: "0px 0px  10px 0px pink inset"}}>
        <div className="carrion" onChange={e=>selectChanger(e.target.value)}>
            <select>
                <option>{CurrentPlace}</option>
                {placelist.filter(e=>!(e===CurrentPlace)).map(e=><option>{e}</option>)}
            </select>
        </div>
        <Link to="/login"style={{float: "Right", height:"100%", backgroundColor: "purple", marginLeft: "5px"}}>
            <img
                style={{height: "100%"}}
                src="https://png.pngtree.com/png-vector/20190909/ourlarge/pngtree-outline-user-icon-png-image_1727916.jpg"
                alt="Account"
                layout="fill"
                objectFit="contain"
            /></Link>
    </div>
}
export default Header;
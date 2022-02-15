import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import "../Style/SideBar.css"
function SideBar({sideBarList, page}){
    const [goTo, setGoTo] = useState("")
    const [heightNum, setHeightNum] = useState(0)
    const [ToPad, setToPad] = useState(null)
    function toNavigate(where){
        setGoTo(where)
    }
    useEffect(()=>{
        const b = document.querySelector(".sidebar").getBoundingClientRect()
        setHeightNum(b.height)
    }, [])
    useEffect(()=>{
        setGoTo("")
    }, [goTo])
    const height =  (heightNum / (sideBarList.length));
    return goTo !== "" ? <Navigate to={goTo}></Navigate>: <div className="sidebar">
        {sideBarList.map((element, uid)=>{
            return page === element[1] ? <div id={uid} onClick={()=>toNavigate(element[1])} onMouseOver={(e)=>setToPad(e.target.id)} onMouseLeave={()=>setToPad(null)} style={{height: `${height - 2}px`, width: "65px", color: "#6d30ba", border: "solid", borderWidth: "1px", borderColor: "#6d30ba", cursor: "pointer", textAlign: "center", textOverflow:"ellipsis", textShadow: "0px 0px 2px blue", paddingRight: `${ToPad ==uid ? "10" : "0"}px`, backgroundColor: "#46276E"}}>
            {element[0]}
        </div>
            :
            <div id={uid} onClick={()=>toNavigate(element[1])} onMouseOver={(e)=>setToPad(e.target.id)} onMouseLeave={()=>setToPad(null)} style={{height: `${height - 2}px`, width: "65px", border:"solid", borderWidth: "1px", borderColor: "black", cursor: "pointer", textAlign: "center", textOverflow:"ellipsis", paddingRight: `${ToPad ==uid ? "10" : "0"}px`, backgroundColor: "#46276E"}}>
                {element[0]}
            </div>
        })}
    </div>
}
export default SideBar;
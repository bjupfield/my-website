import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import "../Style/SideBar.css"
function SideBar({sideBarList, page}){
    const [goTo, setGoTo] = useState("")
    const [heightNum, setHeightNum] = useState(0)
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
        {sideBarList.map(element=>{
            return page === element[1] ? <div onClick={()=>toNavigate(element[1])} style={{height: `${height - 2}px`, width: "65px", border: "dotted", borderWidth: "1px", borderColor: "#ol2dp1", cursor: "pointer", textAlign: "center", textOverflow:"ellipsis", borderTopRightRadius: "20px", borderBottomRightRadius: "20px", textShadow: "0px 0px 2px blue", color: "red"}}>
            {element[0]}
        </div>
            :
            <div onClick={()=>toNavigate(element[1])} style={{height: `${height - 2}px`, width: "65px", border: "dotted", borderWidth: "1px", borderColor: "#ol2dp1", cursor: "pointer", textAlign: "center", textOverflow:"ellipsis", borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}>
                {element[0]}
            </div>
        })}
    </div>
}
export default SideBar;
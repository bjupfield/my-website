import { useEffect, useRef, useState } from "react";
import '../Style/DivEditor.css';
function DivEditor(){
    const [mouseDownPos, setMouseDownPos] = useState([]);
    const [clientBorder, setClientBorder] = useState([]);
    const [pathD, setPathD] = useState("");
    const [pathTrue, setPathTrue] = useState("M 25 25 L 75 25 L 75 75 L 25 75 z")
    const [points, setPoints] = useState([])
    const [pointId, setPointId] = useState(null);
    const [viewBoxStuff, setViewBoxStuff] = useState([100, 100]);
    const observer = useRef(null)
    function resizePathTrue(path, x, y){
        const test = path.split("L");
        const line = test.map((line)=>{
            let lineTest = line.split(" ").filter((element)=>{
                if(element === ""){
                    return false;
                }
                    return true;
            });        
            switch(lineTest.length){
            case 2:
                const newx = (parseFloat(lineTest[0]) / viewBoxStuff[0]) * x;
                const newy = (parseFloat(lineTest[1]) / viewBoxStuff[1]) * y;
                lineTest = ["L", newx.toString(), newy.toString()];
                break;
            case 3:
                if(lineTest[0] === "M"){
                    const newx = (parseFloat(lineTest[1]) / viewBoxStuff[0]) * x;
                    const newy = (parseFloat(lineTest[2]) / viewBoxStuff[1]) * y;
                    lineTest = ["M", newx.toString(), newy.toString()]
                }
                else{
                    const newx = (parseFloat(lineTest[0]) / viewBoxStuff[0]) * x;
                    const newy = (parseFloat(lineTest[1]) / viewBoxStuff[1]) * y;
                    lineTest = ["L", newx.toString(), newy.toString(), "z"]
                }
                break;
            }
            return lineTest.join(" ")
        });
        setPoints(line);
        setPathTrue(line.join(" "))
    }
    function changePoints(points, x, y){
        const test = pathTrue.split("L");
        const line = test.map((line, ind)=>{
            let lineTest = line.split(" ").filter((element)=>{
                if(element === ""){
                    return false;
                }
                    return true;
            });
            const c = ind === parseFloat(points) ? true : false;
            switch(lineTest.length){
                case 2:
                    const a = c ? x.toString() : lineTest[0];
                    const b = c ? y.toString() : lineTest[1];
                    lineTest = ["L", a, b];
                    break;
                case 3:
                    if(lineTest[0] === "M"){
                        const a = c ? x.toString() : lineTest[1];
                        const b = c ? y.toString() : lineTest[2];
                        lineTest = ["M", a, b]
                    }
                    else{
                        const a = c ? x.toString() : lineTest[0];
                        const b = c ? y.toString() : lineTest[1];
                        lineTest = ["L", a, b, "z"]
                    }
                    break;
                }
            return lineTest.join(" ")
        })
        setPoints(line)
        setPathTrue(line.join(" "))
    }
    let e = 1;
    useEffect(()=>{
        const d = document.querySelector("#absolute");
        const c = d.getBoundingClientRect();
        resizePathTrue(pathTrue, c.width, c.height)
        setViewBoxStuff([c.width, c.height])
    }, [])
    useEffect(()=>{
        observer.current = new ResizeObserver(entries =>{
            for(let entry of entries){
                if(e !== 1)
                {
                    const d = entry.target.getBoundingClientRect();
                    resizePathTrue(pathTrue, d.width, d.height)
                    setViewBoxStuff([d.width, d.height])
                }
                ++e;
            }
        }); 
        const d = document.querySelector("#absolute");
        observer.current.observe(d);
        return ()=> observer.current.unobserve(d)
    })
    function onMouseDownCall(e){
        const client = e.target.getBoundingClientRect();
        const x = (e.clientX - client.x);
        const y = (e.clientY - client.y);
        setClientBorder([client.width, client.height, client.x, client.y]);
        setMouseDownPos([x, y]);
    }
    function onMouseUpCall(){
        setMouseDownPos([])
        setClientBorder([])
        setPathD("")
        setPointId(null)
    }
    function onMouseMoveCall(e){
        const currx = (e.clientX - clientBorder[2]);
        const curry = (e.clientY - clientBorder[3]);
        if(mouseDownPos[1]){
            setPathD(`M ${mouseDownPos[0]} ${mouseDownPos[1]} L ${currx} ${curry} z`)
        }
        if(pointId){
            changePoints(pointId, currx, curry)
        }
    }
    function onMouseDownAdjustor(e){
        let c = e.target;
        while(c.id === ""){
            c = c.parentElement
        }
        const client = document.querySelector("#absolute").getBoundingClientRect();
        setClientBorder([client.width, client.height, client.x, client.y]);
        setPointId(c.id)
    }
    return <div className="fullpage" onMouseMove={(e)=>onMouseMoveCall(e)} onMouseUp={()=>onMouseUpCall()}>
        <div className="CreatorDiv">
            <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                <path  d={pathTrue}></path>
            </svg>
            <div id="absolute"  onMouseDown={(e)=>onMouseDownCall(e)}>
                <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                    <path fill="#S28A53" stroke="red" strokeWidth={.15} d={pathD}></path>
                </svg>
            </div>
            {points.map((point, ind)=>{
                const f = point.split(" ");
                if(f[2] === "z"){
                    return <div className="adjustor" id={`${ind}`} style={{position:"absolute", top:`${parseFloat(f[1]) - 5}px`, left:`${parseFloat(f[0]) - 5}px`, height:"10px", width:"10px"}}
                    onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 10, 10"><circle cx={5} cy={5} r={5} fill="red"></circle></svg></div>
                }
                return <div className="adjustor" id={`${ind}`} style={{position:"absolute", top:`${parseFloat(f[2]) - 5}px`, left:`${parseFloat(f[1]) - 5}px`, height:"10px", width:"10px"}}
                onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 10, 10"><circle cx={5} cy={5} r={5} fill="red"></circle></svg></div>
            })}
        </div>
    </div>
}
export default DivEditor;
import { useEffect, useRef, useState } from "react";
import IntepretFile from "../Functions/InterpretFile";
import CutTool from "../Functions/CutTool";
import '../Style/DivEditor.css';
import '../Style/Header.css';
import CreatorHeaders from "./CreatorHeaders";
import DownloadFileButton from "./DownloadFileButton";
import LoginCreator from "./LoginCreator";
import SaveButton from "./SaveButton";
import SelectorButton from "./SelectorButton";
import MovePoints from "../Functions/MovePoints";
import BoxGrab from "../Functions/BoxGrab";
import ExtrudeTool from "../Functions/ExtrudeToolImLazy";
function DivEditor({ editNum, setEditNum }){
    const [pathTrue, setPathTrue] = useState("M 25 25 L 75 25 L 75 75 L 25 75 z")
    const [points, setPoints] = useState([])
    const [pointId, setPointId] = useState([]);
    const [viewBoxStuff, setViewBoxStuff] = useState([100, 100]);
    const [svgName, setSvgName] = useState("");
    const [svgColor, setSvgColor] = useState("");
    const [svgLineThickness, setSvgLineThickness] = useState(3)
    const [svgStrokeColor, setSvgStrokeColor] = useState("red")
    const [file, setFile] = useState(new File([], ""));
    const [needLogin, setNeedLogin] = useState(false)
    const [editNum2, setEditNum2] = useState(null)
    const [selected, setSelected] = useState("");
    const observer = useRef(null)
    const [firstMouseDown, setFirstMouseDown] = useState([]);
    const [currMouseDown, setCurrMouseDown] = useState([]);
    const [doMovePoint, setDoMovePoint] = useState(false);
    const [eventListenerAdded, setEventListenerAdded] = useState(false);
    const [keyPress, setKeyPress] = useState("");
    const [usingAdjustor, setUsingAdjustor] = useState(false);
    const [shift, setShift] = useState(false)
    let newPathD = "";
    function changeSelected(stringPath){
        setSelected(stringPath);
    }
    function newOnMouseDown(e){
        const client = e.target.getBoundingClientRect();
        const x = (e.clientX - client.x);
        const y = (e.clientY - client.y);
        setFirstMouseDown([x, y]);
    }
    function newOnMouseMove(e){
        const d = document.querySelector("#absolute").getBoundingClientRect();
        const client = e.target.getBoundingClientRect();
        const x = e.clientX - d.x;
        const y = e.clientY - d.y;
        setCurrMouseDown([x, y]);
        if(doMovePoint){
            const line = MovePoints(pathTrue, pointId, e.movementX, e.movementY)
            setPoints(line)
            setPathTrue(line.join(" "))
        }
    }
    function newOnMouseUp(e){
        // console.log(`${usingAdjustor} || ${shift}`)
        if(firstMouseDown !== currMouseDown){
            switch(selected){
                case "boxGrab":
                    if(usingAdjustor){
                        if(!shift){
                            setPointId([]);
                        }
                        else{
                            console.log("plz")
                        }
                    }
                    else{
                        BoxGrab(firstMouseDown, currMouseDown, points, setPointId);
                    }
                    break;
                case "cutTool":
                    const newTruePath = CutTool(newPathD, pathTrue, points);
                    setPoints(newTruePath);
                    setPathTrue(newTruePath.join(" "));
                    break;
                case "extrude":
                    if(usingAdjustor){
                        if(!shift){
                            setPointId([]);
                        }
                        else{
                            // console.log("plz")
                        }
                    }
                    else{
                        ExtrudeTool(currMouseDown[0], currMouseDown[1], points, pointId, setPointId, pathTrue, setPathTrue, setPoints);
                        setPointId([])
                    }
                    break;
                case "":
                    if(!shift){
                        setPointId([]);
                    }
                    else{
                        console.log("plz")
                    }
                    break;
            }
        }
        setUsingAdjustor(false);
        setDoMovePoint(false);
        setFirstMouseDown(null);
        setCurrMouseDown(null);
    }
    function onToolReload(){
        if(currMouseDown !== null && firstMouseDown !== null){
            switch(selected){
                case "boxGrab":
                    const lineTopArray = [];
                    const lineBottomArray = [];
                    const center = (currMouseDown[0] - firstMouseDown[0]) > 0 ? 1 : -1;
                    const centerMount = Math.floor(Math.abs((currMouseDown[0] - firstMouseDown[0]) / 7))
                    const lineLeftArray = [];
                    const lineRightArray = [];
                    const side = (currMouseDown[1] - firstMouseDown[1]) > 0 ? 1 : -1;
                    const sideMount = Math.floor(Math.abs(currMouseDown[1] - firstMouseDown[1]) / 7);
                    for(let c = 0; c <= centerMount; ++c){
                        lineTopArray.push(`M${firstMouseDown[0] + c * 7 * center} ${firstMouseDown[1]} L ${center === 1 ? Math.min(firstMouseDown[0] + (c * 7 + 5) * center, currMouseDown[0]) : Math.max(firstMouseDown[0] + (c * 7 + 5) * center, currMouseDown[0])} ${firstMouseDown[1]} Z`)
                    };
                    for(let c = 0; c <= centerMount; ++c){
                        lineBottomArray.push(`M${firstMouseDown[0] + c * 7 * center}  ${currMouseDown[1]} L ${center === 1 ? Math.min(firstMouseDown[0] + (c * 7 + 5) * center, currMouseDown[0]) : Math.max(firstMouseDown[0] + (c * 7 + 5) * center, currMouseDown[0])} ${currMouseDown[1]} Z`)
                    }
                    for(let c = 0; c <= sideMount; ++c){
                        lineLeftArray.push(`M${firstMouseDown[0]} ${firstMouseDown[1] + c * 7 * side} L ${firstMouseDown[0]} ${side === 1 ? Math.min(firstMouseDown[1] + (c * 7 + 5) * side, currMouseDown[1]) : Math.max(firstMouseDown[1] + (c * 7 + 5) * side, currMouseDown[1])} Z`)
                    }
                    for(let c = 0; c <= sideMount; ++c){
                        lineRightArray.push(`M${currMouseDown[0]} ${firstMouseDown[1] + c * 7 * side} L ${currMouseDown[0]} ${side === 1 ? Math.min(firstMouseDown[1] + (c * 7 + 5) * side, currMouseDown[1]) : Math.max(firstMouseDown[1] + (c * 7 + 5) * side, currMouseDown[1])} Z`)
                    }
                    const lineTop = lineTopArray.join(" ")
                    const lineBottom = lineBottomArray.join(" ")
                    const lineLeft = lineLeftArray.join(" ")
                    const lineRight =  lineRightArray.join(" ")
                    newPathD = lineTop + " " + lineBottom + " " + lineLeft + " " + lineRight
                    break;
                case "cutTool": 
                    newPathD = `M${firstMouseDown[0]} ${firstMouseDown[1]} L ${currMouseDown[0]} ${currMouseDown[1]}`;
                    break;
                case "":
                    break;
            }
        }
    }
    function resizePathTrue(path, x, y, vx, vy){
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
                const newx = (parseFloat(lineTest[0]) / vx) * x;
                const newy = (parseFloat(lineTest[1]) / vy) * y;
                lineTest = ["L", newx.toString(), newy.toString()];
                break;
            case 3:
                if(lineTest[0] === "M"){
                    const newx = (parseFloat(lineTest[1]) / vx) * x;
                    const newy = (parseFloat(lineTest[2]) / vy) * y;
                    lineTest = ["M", newx.toString(), newy.toString()]
                }
                else{
                    const newx = (parseFloat(lineTest[0]) / vx) * x;
                    const newy = (parseFloat(lineTest[1]) / vy) * y;
                    lineTest = ["L", newx.toString(), newy.toString(), "z"]
                }
                break;
            }
            return lineTest.join(" ")
        });
        setPoints(line);
        setPathTrue(line.join(" "))
    }
    let e = 1;
    useEffect(()=>{
        if(editNum !== null){
            fetch(`http://localhost:3000/saveFile/${editNum}`)
            .then(r=>r.json())
            .then(r=>{
                const z = IntepretFile(r)
                z.text()
                .then(r=>{
                    const b = r.split("path(\"")
                    const c = b[1].split("\");")
                    const d = b[1].split("\n")
                    const e = b[0].split("\"")[1].split(" ")
                    const path = c[0]
                    const color = c[1].split(/(fill:)/)[2].split(";")[0].replace(" ", "")
                    const strokeColr = d[2].split(":")[1] ? d[2].split(":")[1].replace(/[ px;]/ig, ""): "";
                    const strokeThick = d[3] ?  d[3].split(":")[1].replace(/[ px;]/ig, "") : "";
                    const viewBox = [parseFloat(e[2].replace(",", "")), parseFloat(e[3].replace(",", ""))]
                    setSvgColor(color)
                    setSvgStrokeColor(strokeColr)
                    setSvgLineThickness(strokeThick)
                    const cc = document.querySelector("#absolute").getBoundingClientRect();
                    resizePathTrue(path, cc.width, cc.height, viewBox[0], viewBox[1])
                    setViewBoxStuff([cc.width, cc.height])
                })
                setSvgName(r.file_name.split(/[.]/)[0])
                setFile(z)
                setEditNum(null)
                setEditNum2(editNum)
        })
        }
        else{
            const d = document.querySelector("#absolute");
            const c = d.getBoundingClientRect();
            resizePathTrue(pathTrue, c.width, c.height, viewBoxStuff[0], viewBoxStuff[1])
            setViewBoxStuff([c.width, c.height])
        }
    }, [])
    useEffect(()=>{
        observer.current = new ResizeObserver(entries =>{
            for(let entry of entries){
                if(e !== 1)
                {
                    const d = entry.target.getBoundingClientRect();
                    resizePathTrue(pathTrue, d.width, d.height, viewBoxStuff[0], viewBoxStuff[1])
                    setViewBoxStuff([d.width, d.height])
                }
                ++e;
            }
        }); 
        const d = document.querySelector("#absolute");
        observer.current.observe(d);
        return ()=> observer.current.unobserve(d)
    })
    function onMouseDownAdjustor(e){
        let c = e.target;
        while(c.id === ""){
            c = c.parentElement
        }
        const client = document.querySelector("#absolute").getBoundingClientRect();
        // setClientBorder([client.width, client.height, client.x, client.y]);
        if(!shift){
            setPointId([c.id])
        }
        else{
            if(pointId.find(x=>x===c.id)!==undefined){
                console.log("already selected")
                const newDealings = pointId.filter(x=>x!==c.id)
                setPointId(newDealings)
            }
            else{
                const newDealings = pointId;
                newDealings.push(c.id)
                setPointId(newDealings)
            }
        }
        setDoMovePoint(true)
        setUsingAdjustor(true);
    }
    function onButtonClick(e){
        onUploadSvg();
    }
    function onUploadSvg(){
        const e = new File([`.${svgName}{
    viewbox: "0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}"
        }
.${svgName} path{
        d: path("${pathTrue}");
        fill: ${svgColor};
        stroke: ${svgStrokeColor};
        stroke-width: ${svgLineThickness}px;
    }`], `${svgName}.css`, {
            type: "text/css"
        })
        e.arrayBuffer()
        .then(r=>{
            const view = new Uint8Array(r)
            fetch(`http://localhost:3000/saveFile`,{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    file_data: view,
                    file_name: e.name,
                    file_mime: e.type,
                    share: false,
                    editNum: editNum2,
                })
            })
            .then(r=>r.json())
            .then(r=>{
                if(r.error){
                    setNeedLogin(!needLogin)
                }
                else{
                    const z = IntepretFile(r)
                    setFile(z)
                }
            })
            .catch(r=>r)
            .then(r=>console.log(r))
        })
    }
    const w = window.innerWidth
    const h = window.innerHeight
    function logKey(e){
        switch(e.key){
            case "g":
                setKeyPress("g");
                setDoMovePoint(true)
                break;
            case "Shift":
                setShift(true);
                break;
        }
    }
    function logdKey(e){
        switch(e.key){
            case "g":
                setKeyPress("")
                setDoMovePoint(false)
                break;
            case "Shift":
                setShift(false);
                break;
        }
    }
    if(!eventListenerAdded){
        document.addEventListener('keydown', logKey)
        document.addEventListener("keyup", logdKey)
        setEventListenerAdded(true);
    }
    onToolReload();
    return <div className="fullpage" onMouseMove={(e)=>newOnMouseMove(e)} onMouseUp={()=>newOnMouseUp()}>
        <CreatorHeaders page={"/creator"}></CreatorHeaders>
        <div style={{height: "41px"}}></div>
        <div className="CreatorDiv">
            <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                <path fill={svgColor} d={pathTrue} strokeWidth={ (svgLineThickness !== "" ? svgLineThickness : 0) + "px"} stroke={svgStrokeColor}></path>
            </svg>
            <div id="absolute"  onMouseDown={(e)=>newOnMouseDown(e)}>
                <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                    <path fill="none" stroke="red" strokeWidth={1} d={newPathD}></path>
                </svg>
            </div>
            {points.map((point, ind)=>{
                const f = point.split(" ");
                if(f[2] === "z"){
                    return <div className={pointId.find(x=>parseFloat(x) === ind) !== undefined ? "adjusting" : "adjustor"} id={`${ind}`} style={{position:"absolute", top:`${(parseFloat(f[1]) / viewBoxStuff[1]) * h * .8 + 39.5}px`, left:`${(parseFloat(f[0]) / viewBoxStuff[0]) * w * .8 + 67.5}px`, height:"10px", width:"10px"}}
                    onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 12, 12"><circle cx={5} cy={5} r={5}></circle></svg></div>
                }
                if(f[0] === "l"){
                    return ""
                }
                return <div className={pointId.find(x=>parseFloat(x) === ind) !== undefined ? "adjusting" : "adjustor"} id={`${ind}`} style={{position:"absolute", top:`${(parseFloat(f[2]) / viewBoxStuff[1]) * h * .8 + 39.5}px`, left:`${(parseFloat(f[1]) / viewBoxStuff[0]) * w * .8 + 67.5}px`, height:"10px", width:"10px"}}
                onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 12, 12"><circle cx="5" cy="5" r="5"></circle></svg></div>
            })}
        </div>
        <div className="sideBarSelector">
            <SelectorButton selected={selected === "boxGrab"} selectFunc={changeSelected} toSelect={"boxGrab"} smallDescrip={"BoxGrab"} path={"M0 0 L 0 50 L 50 50 L 50 0 Z M28 28 L 23 37 L 13 13 L 37 23 Z"}></SelectorButton>   
            <SelectorButton selected={selected === "cutTool"} selectFunc={changeSelected} toSelect={"cutTool"} smallDescrip={"CutTool"} path={"M0 0 L 50 0 L 50 50 L 0 50 Z M10 10 L 15 10 L 30 25 L 27 27 Z M30 25 L 40 25 L 5 25 L 10 30 L 30 30 L  25 25 L 35 35"}/>
            <SelectorButton selected={selected === "extrude"} selectFunc={changeSelected} toSelect={"extrude"} smallDescrip={"Extrude"} path={"M0 0 L 0 50 L 50 50 L 50 0 Z"}/>
        </div>
        <div className="addMargin">
            <div className="inputer">
                <div className="label">Color: </div>
                <input type="color" value={svgColor} className="color" onChange={e=>setSvgColor(e.target.value)}></input>
            </div>
            <div className="inputer">
                <div className="label">Line-Thickness: </div>
                <input type="number" value={svgLineThickness} placeholder="Numbers only fool..." className="number" onChange={e=>setSvgLineThickness(e.target.value)}></input>
            </div >
            <div className="inputer">
                <div className="label">Line-Color: </div>
                <input type="color" value={svgStrokeColor} className="color" onChange={e=>setSvgStrokeColor(e.target.value)}></input>
            </div>
            <div className="inputer">
                <div className="label">Name: </div>
                <input className="namer" value={svgName} onChange={e=>setSvgName(e.target.value.replace(/[ ]/ig, ""))}></input>
            </div>
            <SaveButton named={(svgName !== "")} saveButtonFunc={onButtonClick}></SaveButton>
            <DownloadFileButton file={file} inCreator={true}></DownloadFileButton>
        </div>
        { needLogin ? <div className="overlaying"><LoginCreator setLoggedIn={setNeedLogin}/></div> : ""}
    </div>
}
export default DivEditor;
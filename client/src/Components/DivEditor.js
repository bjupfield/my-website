import { useEffect, useRef, useState } from "react";
import IntepretFile from "../Functions/InterpretFile";
import '../Style/DivEditor.css';
import '../Style/Header.css';
import CreatorHeaders from "./CreatorHeaders";
import DownloadFileButton from "./DownloadFileButton";
import LoginCreator from "./LoginCreator";
import SaveButton from "./SaveButton";
import SelectorButton from "./SelectorButton";
function DivEditor({ editNum, setEditNum }){
    const [mouseDownPos, setMouseDownPos] = useState([]);
    const [clientBorder, setClientBorder] = useState([]);
    const [pathD, setPathD] = useState("");
    const [pathTrue, setPathTrue] = useState("M 25 25 L 75 25 L 75 75 L 25 75 z")
    const [points, setPoints] = useState([])
    const [pointId, setPointId] = useState(null);
    const [viewBoxStuff, setViewBoxStuff] = useState([100, 100]);
    const [svgName, setSvgName] = useState("");
    const [svgColor, setSvgColor] = useState("");
    const [svgLineThickness, setSvgLineThickness] = useState(0)
    const [svgStrokeColor, setSvgStrokeColor] = useState("")
    const [file, setFile] = useState(new File([], ""));
    const [needLogin, setNeedLogin] = useState(false)
    const [editNum2, setEditNum2] = useState(null)
    const [selected, setSelected] = useState("");
    const observer = useRef(null)
    function changeSelected(stringPath){
        setSelected(stringPath);
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
    function cutTool(){
        const test = pathD.split(" ");
        const line = [test[1], test[2], test[4], test[5]];
        const slope = (parseFloat(line[3]) - parseFloat(line[1])) / (parseFloat(line[2]) - parseFloat(line[0]));
        const lineEquat = [slope, parseFloat(line[1]) - (slope * parseFloat(line[0]))]
        const lines = pathTrue.split("L").map(point=>{
            const b = point.split(" ").filter(factor =>{
                if(factor === ""){
                    return false;
                }
                return true
            })
            return b
        })
        const pointIntersect = lines.map((point, ind) =>{
            const secondPoint = lines[ind + 1];
            let intersectLine = [];
            if(point[point.length - 1] === "z"){
                switch(point.length){
                    case 3:
                        intersectLine = [point[0], point[1], lines[0][1], lines[0][2]] // make cover cases for if m happens in other places
                }
            }
            else{
                switch(point.length){
                    case 3:
                        if(point[0] === "M"){
                        switch(secondPoint.length){
                            case 3:
                                if(secondPoint[0] === "M"){
                                    return [false, 0, 0]
                                }
                                else{
                                    intersectLine = [point[1], point[2], secondPoint[0], secondPoint[1]]
                                }
                                break;
                            case 2:
                                intersectLine = [point[1], point[2], secondPoint[0], secondPoint[1]]
                                break;
                        }
                        }
                        else{    
                        console.log("shouldnt happen");
                        }
                        break;
                    case 2:
                    switch(secondPoint.length){
                        case 3:
                            if(secondPoint[0] === "M"){
                                return [false, 0, 0]
                            }
                            else{
                                intersectLine = [point[0], point[1], secondPoint[0], secondPoint[1]]
                            }
                            break;
                        case 2:
                            intersectLine = [point[0], point[1], secondPoint[0], secondPoint[1]]
                            break;
                    }   
                    break;
                }
            }
            switch(intersectLine.length){
                case 4: 
                    const sloped = (parseFloat(intersectLine[3]) - parseFloat(intersectLine[1])) / (parseFloat(intersectLine[2]) - parseFloat(intersectLine[0]));
                    const lineEquat2 = [sloped, parseFloat(intersectLine[1]) - (parseFloat(intersectLine[0]) * sloped)]
                    let x;
                    if(lineEquat[0] === Infinity || lineEquat[0] ===  -Infinity){
                        if(lineEquat2[0] === Infinity || lineEquat2[0] === -Infinity){
                            return [false, 0, 0]
                        }
                        else{
                            x = parseFloat(line[0])
                        }
                    }
                    else{
                        if(lineEquat2[0] === Infinity || lineEquat2[0] === -Infinity){
                            x = parseFloat(intersectLine[0])
                            const y = lineEquat[1] + (lineEquat[0] * intersectLine[0]);
                            const newLine = line.map(li=>parseFloat(li));
                            const newIntersect = intersectLine.map(li=>parseFloat(li));
                            if(x >= (newLine[0] <= newLine[2] ? newLine[0] : newLine[2]) && x <= (newLine[0] >= newLine[2] ? newLine[0] : newLine[2])){
                                if(y >= (newIntersect[1] <= newIntersect[3] ? newIntersect[1] : newIntersect[3]) && y <= (newIntersect[1] >= newIntersect[3] ? newIntersect[1] : newIntersect[3])){
                                    return [true, x, slope * x + lineEquat[1]]
                                }
                                else{
                                    return [false, 0, 0]
                                }
                            }
                            else {return[false, 0, 0]}
                        }
                        else{
                            x = (lineEquat[1] - lineEquat2[1]) / (lineEquat2[0] - lineEquat[0]);
                        }
                    }
                    const newLine = line.map(li=>parseFloat(li));
                    const newIntersect = intersectLine.map(li=>parseFloat(li));
                    if(x >= (newIntersect[0] <= newIntersect[2] ? newIntersect[0] : newIntersect[2]) && x <= (newIntersect[0] >= newIntersect[2] ? newIntersect[0] : newIntersect[2])){
                        if(x >= (newLine[0] <= newLine[2] ? newLine[0] : newLine[2]) && x <= (newLine[0] >= newLine[2] ? newLine[0] : newLine[2])){
                            return [true, x, slope * x + lineEquat[1]]
                        }
                        else{
                            return [false, 0, 0]
                        }
                    }
                    else{
                        return [false, 0, 0]
                    }
                    break;
            }
        });
        addPoints(pointIntersect)
    }
    function addPoints(points){
        let sanityCount = 0;
        let newTruePath = pathTrue.split("L").map(path=>path.split(" ").filter(b=>b !== ""));
        points.forEach((arr , ind)=>{
            if(arr[0] === true){
                const previousPoint = newTruePath[ind + sanityCount];
                switch(previousPoint.length){
                    case 3:
                        if(previousPoint[0] === "M"){
                            newTruePath.splice(ind + sanityCount + 1, 0, [arr[1].toString(), arr[2].toString()])
                        }
                        else{
                            newTruePath.splice(ind + sanityCount, 1, [previousPoint[0], previousPoint[1]], [arr[1], arr[2], previousPoint[2]])
                        }
                        break;
                    case 2:
                        newTruePath.splice(ind + sanityCount + 1, 0, [arr[1].toString(), arr[2].toString()])
                        break;
                }
                ++sanityCount;
            }
            else{
            }
        })
        newTruePath = newTruePath.map((path, ind)=>{
            switch(path.length){
                case 3:
                    if(path[0] === "M"){
                    }
                    else{
                        switch(newTruePath[ind - 1].length){
                            case 2:
                                path = ["L", path[0], path[1], path[2]]
                                break;
                        }
                    }
                    break;
                case 2:
                    path = ["L", path[0], path[1]]
                    break;
            }
            return path.join(" ")
        })
        setPoints(newTruePath);
        setPathTrue(newTruePath.join(" "));
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
    function onMouseDownCall(e){
        const client = e.target.getBoundingClientRect();
        const x = (e.clientX - client.x);
        const y = (e.clientY - client.y);
        setClientBorder([client.width, client.height, client.x, client.y]);
        setMouseDownPos([x, y]);
    }
    function onMouseUpCall(){
        if(pathD !== ""){
            cutTool()
        }
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
    return <div className="fullpage" onMouseMove={(e)=>onMouseMoveCall(e)} onMouseUp={()=>onMouseUpCall()}>
        <CreatorHeaders page={"/creator"}></CreatorHeaders>
        <div style={{height: "41px"}}></div>
        <div className="CreatorDiv">
            <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                <path fill={svgColor} d={pathTrue} strokeWidth={ (svgLineThickness !== "" ? svgLineThickness : 0) + "px"} stroke={svgStrokeColor}></path>
            </svg>
            <div id="absolute"  onMouseDown={(e)=>onMouseDownCall(e)}>
                <svg viewBox={`0, 0, ${viewBoxStuff[0]}, ${viewBoxStuff[1]}`}>
                    <path fill="#S28A53" stroke="red" strokeWidth={.15} d={pathD}></path>
                </svg>
            </div>
            {points.map((point, ind)=>{
                const f = point.split(" ");
                if(f[2] === "z"){
                    return <div className={ind === parseFloat(pointId)? "adjusting" : "adjustor"} id={`${ind}`} style={{position:"absolute", top:`${(parseFloat(f[1]) / viewBoxStuff[1]) * h * .8 + 39.5}px`, left:`${(parseFloat(f[0]) / viewBoxStuff[0]) * w * .8 + 67.5}px`, height:"10px", width:"10px"}}
                    onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 12, 12"><circle cx={5} cy={5} r={5}></circle></svg></div>
                }
                return <div className={ind === parseFloat(pointId)? "adjusting" : "adjustor"} id={`${ind}`} style={{position:"absolute", top:`${(parseFloat(f[2]) / viewBoxStuff[1]) * h * .8 + 39.5}px`, left:`${(parseFloat(f[1]) / viewBoxStuff[0]) * w * .8 + 67.5}px`, height:"10px", width:"10px"}}
                onMouseDown={(e)=>onMouseDownAdjustor(e)} ><svg viewBox="0, 0, 12, 12"><circle cx="5" cy="5" r="5"></circle></svg></div>
            })}
        </div>
        <div className="sideBarSelector">
            <SelectorButton selected={selected === "boxGrab"} selectFunc={changeSelected} toSelect={"boxGrab"} smallDescrip={"BoxGrab"} path={"M0 0 L 0 50 L 50 50 L 50 0 Z M28 28 L 23 37 L 13 13 L 37 23 Z"}></SelectorButton>   
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
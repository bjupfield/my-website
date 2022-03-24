function ExtrudeTool(x, y, points, pointId, setPointId, pathTrue, setPathTrue, setPoints){
    const mostRecentPoint = points[pointId[pointId.length - 1]].split(" ").filter(x=>x!== "");
    const movement = [x - parseFloat(mostRecentPoint[1]), y - parseFloat(mostRecentPoint[2])];
    let newTruePath = pathTrue.split("L").map(path=>path.split(" ").filter(b=>b !== ""));
    newTruePath = newTruePath.map(x=>{
        if(x[0] !== ("M" || "L")){
            const b = x;
            b.unshift("L")
            return b;
        }
        return x;
    })
    for(let x = 0; x < newTruePath.length; x++){
        const point = newTruePath[x];
        console.log(newTruePath.length)
        console.log(point);
        if(point.includes("l") && point[0] !== "l"){
            const c = [[point[0], point[1], point[2]], [point[3], point[4], point[5]]]
            newTruePath.splice(x, 1, ...c)
        }
    }
    console.log(newTruePath)
    for(let x = 0; x < pointId.length; x++){
        const before = newTruePath[pointId[x]];
        let toAdd;
        toAdd = [["L", (parseFloat(before[1]) + movement[0]).toString(), (parseFloat(before[2]) + movement[1]).toString()], ["l", -movement[0], -movement[1]]]
        newTruePath.splice(parseFloat(pointId[x]) + x + 1, 0, ...toAdd)
        console.log(newTruePath)
        console.log(parseFloat(pointId[x]) + x)
    }
    const newestPath = newTruePath.map(x=>{
        const b = x;
        if(x.length === 2){
            b.unshift("L")
        }
        if(x[x.length - 1] === "z" && x.length === 3){
            b.unshift("L")
        }
        return b.join(" ")
    })
    console.log(newestPath)
    setPointId([])
    setPoints(newestPath)
    setPathTrue(newestPath.join(" "))
}
export default ExtrudeTool;
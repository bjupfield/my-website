function BoxGrab(firstPos, secondPos, points, setPointId){
    const lesserX =  firstPos[0] < secondPos[0] ? firstPos[0] : secondPos[0];
    const greaterX = firstPos[0] < secondPos[0] ? secondPos[0] : firstPos[0];
    const lesserY = firstPos[1] < secondPos[1] ? firstPos[1] : secondPos[1];
    const greaterY = firstPos[1] < secondPos[1] ? secondPos[1] : firstPos[1];
    const newArray = points.map(x=>{
        return x.replace(/[M|L|z]/ig, "")
    });
    const pointId = newArray.map((value, id)=>{
        const b = value.split(" ").filter(x=>x!== "")
        if(parseFloat(b[0]) >= lesserX && parseFloat(b[0]) <= greaterX && parseFloat(b[1]) >= lesserY && parseFloat(b[1]) <= greaterY){
            return id;
        }
    })
    setPointId(pointId.filter(x=>x!==undefined))
}
export default BoxGrab;
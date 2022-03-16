function AddPoints(points, pathTrue){
    console.log(pathTrue);
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
    return newTruePath
}
export default AddPoints;
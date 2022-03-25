import AddPoints from ".//AddPoints"
function CutTool(pathD, pathTrue, points){
    const test = pathD.split(" ");
    const line = [test[0].slice(1), test[1], test[3], test[4]];
    const slope = (parseFloat(line[3]) - parseFloat(line[1])) / (parseFloat(line[2]) - parseFloat(line[0]));
    const lineEquat = [slope, parseFloat(line[1]) - (slope * parseFloat(line[0]))]
    console.log(line);
    console.log(parseFloat(line[0]))
    console.log(slope)
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
        // console.log(newTruePath.length)
        // console.log(point);
        if(point.includes("l") && point[0] !== "l"){
            console.log(point);
            const c = point.join(" ").split("l").map(x=>{
                const c = x.split(" ").filter(b=>b!== "")
                console.log(c)
                if(c.length < 3 || (!c.includes(/[L|B|C|]/) && c.includes("z"))){
                    const b = c;
                    b.unshift("l")
                    return b;
                }
                else{
                    return c;
                }
            })
            newTruePath.splice(x, 1, ...c)
        }
    }
    console.log(newTruePath)
    const lines = pathTrue.split("L").map(point=>{
        const b = point.split(" ").filter(factor =>{
            if(factor === ""){
                return false;
            }
            return true
        })
        return b
    })
    console.log(lines)
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
    return AddPoints(pointIntersect, pathTrue)
}
export default CutTool;
import AddPoints from ".//AddPoints"
function CutTool(pathD, pathTrue, points){
    const test = pathD.split(" ");
    const line = [test[0].slice(1), test[1], test[3], test[4]];
    const slope = (parseFloat(line[3]) - parseFloat(line[1])) / (parseFloat(line[2]) - parseFloat(line[0]));
    const lineEquat = [slope, parseFloat(line[1]) - (slope * parseFloat(line[0]))]
    console.log(line);
    console.log(pathTrue);
    // console.log(parseFloat(line[0]))
    // console.log(slope)
    let newTruePath = pathTrue.split("L").map(path=>path.split(" ").filter(b=>b !== ""));
    newTruePath = newTruePath.map(x=>{
        if(x[0] !== ("M" || "L")){
            const b = x;
            b.unshift("L")
            return b;
        }
        return x;
    })
    let cutInto = 0;
    for(let x = 0; x < newTruePath.length; x++){
        const point = newTruePath[x];
        // console.log(newTruePath.length)
        // console.log(point);
        if(point.includes("l") && point[0] !== "l"){
            // console.log(point);
            const c = point.join(" ").split("l").map(x=>{
                const c = x.split(" ").filter(b=>b!== "")
                // console.log(c)
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
    for(let x = 0; x < newTruePath.length; x++){
        const firstPoint = newTruePath[x];
        let secondPoint;
        if(firstPoint[firstPoint.length - 1] === "z"){
            let found = false;
            while(found === false){
                for(let j = x-1; j > -1; j--){
                    // console.log(newTruePath[j])
                    if(newTruePath[j][0]==="M"){
                        secondPoint = newTruePath[j]
                        found = true;
                    }
                }
            }
        }
        else{
            secondPoint = newTruePath[x+1]
        }
        // console.log(`First Point: ${firstPoint} ||| Second Point: ${secondPoint}`)
        // console.log(secondPoint[0]);
        let actualFirstPoint;
        let actualSecondPoint;
        switch(firstPoint[0]){
            case "M":
                {
                    actualFirstPoint = [parseFloat(firstPoint[1]), parseFloat(firstPoint[2])]
                    break;
                }
            case "L":
                {
                    actualFirstPoint = [parseFloat(firstPoint[1]), parseFloat(firstPoint[2])]
                    break;
                }
            case "l":
                {
                    actualFirstPoint = findActuall(firstPoint, x, newTruePath)
                    break;
                }
        }
        switch(secondPoint[0]){
            case "M":
                {
                    actualSecondPoint = [parseFloat(secondPoint[1]), parseFloat(secondPoint[2])]
                    break;
                }
            case "L":
                {
                    actualSecondPoint = [parseFloat(secondPoint[1]), parseFloat(secondPoint[2])]
                    break;
                }
            case "l":
                {
                    actualSecondPoint = findActuall(secondPoint, x + 1, newTruePath)
                    break;
                }
        }
        const intersectingAt = findIntersect(actualFirstPoint, actualSecondPoint, lineEquat, line.map(x=>parseFloat(x)));
        // console.log(intersectingAt)
        if(intersectingAt !== false){
            switch(secondPoint[0]){
                    case "M":
                        {
                            //splice with L point at intersectingAt
                            const c = [[firstPoint[0], firstPoint[1], firstPoint[2]], ["L", intersectingAt[0], intersectingAt[1], "z"]]
                            console.log(c)
                            newTruePath.splice(x, 1, ...c)
                            break;
                        }
                    case "L":
                        {
                            //splice with L point at interesctingAt
                            newTruePath.splice(x + 1, 0, ["L", intersectingAt[0], intersectingAt[1]])
                            break;
                        }
                    case "l":
                        {
                            const adjustL = findAdjustL(x, newTruePath)
                            // console.log(adjustL)
                            // console.log(intersectingAt)
                            // console.log(secondPoint)
                            const xchange = intersectingAt[0] - adjustL[0];
                            const ychange = intersectingAt[1] - adjustL[1]
                                if(secondPoint.includes("z")){
                                    console.log("OVER HERE MATE")
                                    //splice with l point at intersectingAt and adjust the consequent l
                                    const c = [["l", xchange, ychange], ["l", secondPoint[1] - xchange, secondPoint[2] - ychange, "z"]];
                                    newTruePath.splice(x + 1, 1, ...c)
                                }
                                else{
                                    const after = newTruePath[x + 2]
                                    console.log(after + "||" + secondPoint)
                                    if((after[1] * 1 + secondPoint[1] * 1) === 0 && (after[2] * 1 + secondPoint[2] * 1) === 0){
                                        console.log("THIS SHOULD NOT OCCUR")
                                        const c = [["L", intersectingAt[0], intersectingAt[1]], ["l", secondPoint[1] - xchange, secondPoint[2] - ychange]];
                                        newTruePath.splice(x + 1, 1, ...c)
                                        //splice with L point at intersectingAt and adjust the consequent l
                                    }
                                    else{
                                        const c = [["l", xchange, ychange], ["l", secondPoint[1] - xchange, secondPoint[2] - ychange]];
                                        newTruePath.splice(x + 1, 1, ...c)
                                        //splice with l point at intersectingAt and adjust the consequent l
                                    }  
                                }
                            break;
                        }
                }
        }
        console.log(newTruePath)
    }
    return newTruePath.map(x=>x.join(" "))
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
                        if(x > (newLine[0] <= newLine[2] ? newLine[0] : newLine[2]) && x <= (newLine[0] > newLine[2] ? newLine[0] : newLine[2])){
                            if(y > (newIntersect[1] <= newIntersect[3] ? newIntersect[1] : newIntersect[3]) && y < (newIntersect[1] >= newIntersect[3] ? newIntersect[1] : newIntersect[3])){
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
                if(x > (newIntersect[0] <= newIntersect[2] ? newIntersect[0] : newIntersect[2]) && x < (newIntersect[0] >= newIntersect[2] ? newIntersect[0] : newIntersect[2])){
                    if(x > (newLine[0] <= newLine[2] ? newLine[0] : newLine[2]) && x < (newLine[0] >= newLine[2] ? newLine[0] : newLine[2])){
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
function findIntersect(firstPoint, secondPoint, intersectLine, intersectPoints){
    const secondSlope = (secondPoint[1] - firstPoint[1]) / (secondPoint[0] - firstPoint[0])
    const secondLine = [secondSlope, firstPoint[1] - (firstPoint[0] * secondSlope)];
    let xPoint;
    if(Math.abs(secondLine[0]) === Math.abs(intersectLine[0])){
        return false;
    }
    if(intersectLine[0] === Infinity || intersectLine[0] === -Infinity){
        xPoint = firstPoint[0];
    }
    else if(secondLine[0] === Infinity || secondLine[0] === -Infinity){
        xPoint = secondPoint[0]
        const y = intersectLine[1] + (intersectLine[0] * firstPoint[0]);
        if(xPoint > ((intersectPoints[0] <= intersectPoints[2] ? intersectPoints[0] : intersectPoints[2]) + .05) && xPoint < ((intersectPoints[0] >= intersectPoints[2] ? intersectPoints[0] : intersectPoints[2]) - .05)){
            if(y > ((firstPoint[1] <= secondPoint[1] ? firstPoint[1] : secondPoint[1]) + .05) && y < ((firstPoint[1] >= secondPoint[1] ? firstPoint[1] : secondPoint[1]) - .05)){
                //return point at this y and x
                return [xPoint, y]
            }
        }
        return false;
    }
    else{//no straight lines upon the axis
        xPoint = (intersectLine[1] - secondLine[1]) / (secondLine[0] - intersectLine[0]);
    }
    if(xPoint > ((firstPoint[0] <= secondPoint[0] ? firstPoint[0] : secondPoint[0]) + .05) && xPoint < ((firstPoint[0] >= secondPoint[0] ? firstPoint[0] : secondPoint[0]) - .05)){
        if(xPoint > ((intersectPoints[0] <= intersectPoints[2] ? intersectPoints[0] : intersectPoints[2]) + .05) && xPoint < ((intersectPoints[0] >= intersectPoints[2] ? intersectPoints[0] : intersectPoints[2]) - .05)){
            //return point at this y and x
            return [xPoint, intersectLine[0] * xPoint + intersectLine[1]]
        }
    }
    return false;
}
function findActuall(l, lIndex, splitPath){
    let before = splitPath[lIndex - 1]
    let beforeX = parseFloat(before[1]) + parseFloat(l[1]);
    let beforeY = parseFloat(before[2]) + parseFloat(l[2]);
    if(before[0] === "l"){
        let currInd = lIndex - 1;
        while(before[0] === "l"){
            currInd -= 1;
            before = splitPath[currInd]
            beforeX += parseFloat(before[1])
            beforeY += parseFloat(before[2])
        }
    }
    return [beforeX, beforeY]
}
function findAdjustL(lIndex, splitpath){
    let b = splitpath[lIndex];
    // console.log(b)
    let amountX = parseFloat(b[1])
    let amountY = parseFloat(b[2])
    let currInd = lIndex;
    while(b[0] === "l"){
        currInd -= 1;
        b = splitpath[currInd]
        amountX += parseFloat(b[1])
        amountY += parseFloat(b[2])
    }
    return [amountX, amountY]
}
export default CutTool;
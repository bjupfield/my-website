function MovePoints(pathTrue, points, x, y){
    const test2 = pathTrue.split("L").map(x=>{
        if(!x.match(/M|B|C/ig)){
            return "L" + x
        }
        else{
            return x
        }
    })
    const test3 = test2.map(x=>{
        const b = x.split(/l/).map(x=>{
            if(!x.match(/M|B|C|L|c|b/)){
                return "l" + x
            }
            else{
                return x
            }
        })
        return b;
    })
    const test4 = [];
    test3.forEach(x=>{
        x.forEach(x=>{
            test4.push(x)
        })
    })
    console.log(test4)
    const line = test4.map((line, ind)=>{
        let lineTest = line.split(" ").filter((element)=>{
            if(element === ""){
                return false;
            }
                return true;
        });
        const d = points.find(x=>parseFloat(x) === ind) !== undefined ? true: false;
        const c = lineTest.length;
        switch(lineTest[0]){
            case "L":
                {
                const a = d ? (x + parseFloat(lineTest[1])).toString() : lineTest[1];
                const b = d ? (y + parseFloat(lineTest[2])).toString() : lineTest[2];
                lineTest = ["L", a, b];
                }
                break;
            case "l": 
                {
                    let a = parseFloat(lineTest[1])
                    let b = parseFloat(lineTest[2])
                    // console.log(`X: ${a} || Y: ${b}`)
                    let before = test4[ind - 1].split(" ").filter((element)=>{
                        if(element === ""){
                            return false;
                        }
                            return true;
                    });;
                    if(before[0] === "l"){
                        let currInd = ind - 1;
                        let beforeX = parseFloat(before[1]);
                        let beforeY = parseFloat(before[2]);
                        // console.log(beforeX + "|||||||||||||||||||||||")
                        while(before[0] === "l"){
                            currInd -= 1;
                            before = test4[currInd].split(" ").filter((element)=>{
                                if(element === ""){
                                    return false;
                                }
                                    return true;
                            });;
                            beforeX += parseFloat(before[1])
                            beforeY += parseFloat(before[2])
                            // console.log(beforeX + "|||||||||||||||||")
                        }
                        // console.log("In while loop section |||||" + before + " |||| beforeX :" + beforeX + "|||| beforeY: " + beforeY)
                        before = test4.findIndex(x=>{
                            const d = x.split(" ").filter((element)=>{
                                if(element === ""){
                                    return false;
                                }
                                    return true;
                            });
                            // console.log(`X: ${beforeX} || Y: ${beforeY}`)
                            // console.log(`X: ${d[1]} || Y: ${d[2]}`)
                            if(parseFloat(d[1]) === beforeX && parseFloat(d[2]) === beforeY){
                                console.log("found: " + x)
                                return true;
                            }
                            return false;
                        })
                    }
                    const onTop = test4.findIndex(x=>{
                        const d = x.split(" ").filter((element)=>{
                            if(element === ""){
                                return false;
                            }
                                return true;
                        });
                        // console.log(`XTotal Before[1]: ${test4[before]}`)
                        let possibleCheck;
                        if(before.length === undefined){
                            console.log('here')
                            console.log(before)
                            console.log(test4[before])
                            possibleCheck = test4[before].split(" ").filter((element)=>{
                                if(element === ""){
                                    return false;
                                }
                                    return true;
                            });
                        }
                        const xTotal = before.length !== undefined ? parseFloat(before[1]) + a : parseFloat(possibleCheck[1]) + a;
                        const yTotal = before.length !== undefined ? parseFloat(before[2]) + b: parseFloat(possibleCheck[2]) + b;
                        // console.log(`X: ${xTotal} || Y: ${yTotal}`)
                        // console.log(`X: ${d[1]} || Y: ${d[2]}`)
                        // console.log(`Before Plus X Result ${parseFloat(before[1]) + a}`)
                        if(parseFloat(d[1]) === xTotal && parseFloat(d[2]) === yTotal){
                            // console.log("GREAT SUCCESS ||||||||||||||||||||||||||||||")
                            return true;
                        }
                        return false;
                    })
                    if(points.find(x=>parseFloat(x) === (before.length > 1 ? ind - 1 : before)) !== undefined){
                        // console.log(points.find(x=>parseFloat(x) === (before.length > 1 ? ind - 1 : before)))
                        // console.log(ind)
                        a -= x;
                        b -= y;
                    }
                    if(points.find(x=>parseFloat(x) === onTop) !== undefined){
                        console.log("or here")
                        a += x;
                        b += y;
                    }
                    console.log("does thistrigger")
                    lineTest = ["l", a.toString(), b.toString()]
                }
                break;
            case "M":
                {
                const a = d ? (x + parseFloat(lineTest[1])).toString() : lineTest[1];
                const b = d ? (y + parseFloat(lineTest[2])).toString() : lineTest[2];
                lineTest = ["M", a, b]
                }
                break;
            }
        if(line.includes("z")){
            console.log(line)
            console.log(lineTest)
            lineTest.push("z")
        }
        return lineTest.join(" ")
    })
    // console.log('reset')
    return line;
}
export default MovePoints;
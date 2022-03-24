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
            if(!x.match(/M|B|C|L|c|b|z/)){
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
                    let before = test4[ind - 1];
                    if(before[0] === "l"){
                        let currInd = ind - 1;
                        let beforeX = parseFloat(before[1]);
                        let beforeY = parseFloat(before[2]);
                        while(before[0] === "l"){
                            currInd -= 1;
                            before = test4[currInd]
                            beforeX += parseFloat(before[1])
                            beforeY += parseFloat(before[2])
                        }
                        before = test4.findIndex(x=>{
                            if(x[1] === beforeX && x[2] === beforeY){
                                return true;
                            }
                            return false;
                        })
                    }
                    const onTop = test4.findIndex(x=>{
                        const xTotal = before[1] + a;
                        const yTotal = before[1] + b;
                        if(x[1] === xTotal && x[2] === yTotal){
                            return true;
                        }
                        return false;
                    })
                    if(points.find(x=>x === before) !== undefined){
                        a -= before[1];
                        b -= before[2]
                    }
                    if(points.find(x=>x === onTop) !== undefined){
                        a += onTop[1];
                        b -= onTop[2];
                    }
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
        if(test4[ind].length === 4){
            lineTest.push("z")
        }
        return lineTest.join(" ")
    })
    console.log('reset')
    return line;
}
export default MovePoints;
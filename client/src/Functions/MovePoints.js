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
                    lineTest = ["l", lineTest[1], lineTest[3]]
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
        if(lineTest.length === 4){
            lineTest.push("z")
        }
        return lineTest.join(" ")
    })
    console.log(line)
    return line;
}
export default MovePoints;
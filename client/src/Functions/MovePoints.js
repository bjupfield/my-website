function MovePoints(pathTrue, points, x, y){
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
    return line;
}
export default MovePoints;
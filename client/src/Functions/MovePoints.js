function MovePoints(pathTrue, points, x, y){
    const test = pathTrue.split("L");
    const line = test.map((line, ind)=>{
        let lineTest = line.split(" ").filter((element)=>{
            if(element === ""){
                return false;
            }
                return true;
        });
        const d = points.find(x=>parseFloat(x) === ind) !== undefined ? true: false;
        switch(lineTest.length){
            case 2:
                const a = d ? (x + parseFloat(lineTest[0])).toString() : lineTest[0];
                const b = d ? (y + parseFloat(lineTest[1])).toString() : lineTest[1];
                lineTest = ["L", a, b];
                break;
            case 3:
                if(lineTest[0] === "M"){
                    const a = d ? (x + parseFloat(lineTest[1])).toString() : lineTest[1];
                    const b = d ? (y + parseFloat(lineTest[2])).toString() : lineTest[2];
                    lineTest = ["M", a, b]
                }
                else{
                    const a = d ? (x + parseFloat(lineTest[0])).toString() : lineTest[0];
                    const b = d ? (y + parseFloat(lineTest[1])).toString() : lineTest[1];
                    lineTest = ["L", a, b, "z"]
                }
                break;
            }
        return lineTest.join(" ")
    })
    return line;
}
export default MovePoints;
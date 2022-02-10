function IntepretFile(r){
    const data = r.file_data.split(/[=>,]/).filter(b=>!b.includes('"')).filter(b=>!(b==="")).map(e=>parseInt(e))
    const buffer = new ArrayBuffer(data.length)
    let view = new Uint8Array(buffer);
    data.forEach((byte, ind)=>{
        view[ind] = byte;
    })
    const datatype = r.file_mime.split(/[/]/)[0];
    let z;
    switch(datatype){
        case "text":
            const abc = String.fromCharCode.apply(null, view)
            z = new File([abc], r.file_name, {
                type: r.file_mime
            });
            break;
    }
    return z;
}
export default IntepretFile;
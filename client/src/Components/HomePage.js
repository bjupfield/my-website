import { useEffect, useState } from "react";
import IntepretFile from "../Functions/InterpretFile";
import UploadPrivateFile from "../Functions/UploadPrivateFile";
import Header from "./Header";

function Homepage({}){
    const [imgFile, setImgFile] = useState(new File([""], "b.png", {
        type: "image/jpg"
    }))
    // UploadPrivateFile("https://i.postimg.cc/MpcShw5s/Studio-Project.png")
    return <div><Header CurrentPlace={"HomePage"}/>{imgFile.name}</div>
}
export default Homepage;
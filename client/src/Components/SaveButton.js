import { useState } from "react";
import "../Style/DownloadFileButton.css"
function SaveButton({saveButtonFunc, named =false}){
    const [mustNam, setMustNam] = useState(false)
    function mustName(){
        setMustNam(!mustNam)
    }
    return mustNam ? 
    <div className="inCreator" onClick={()=>mustName()}>Save File
    <div className="overlay" onClick={()=>mustName()}><div className="overlayText" onClick={()=>mustName()}>You Must NAME To save</div></div></div>
     : 
     <div className="inCreator" onClick={named ? ()=>saveButtonFunc() : ()=>mustName()}>
        Save File
    </div>
}
export default SaveButton;
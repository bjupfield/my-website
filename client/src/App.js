import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import DivEditor from "./Components/DivEditor";
import Login from "./Components/Login";
import Homepage from "./Components/HomePage";
import CreatorTutorial from "./Components/CreatorTutorial";
import CreatorAccount from "./Components/CreatorAccount";
import CreatorBrowse from "./Components/CreatorBrowse";
import Header from "./Components/Header";
import IntepretFile from "./Functions/InterpretFile";
import {Helmet} from "react-helmet"

function App() {
  const [count, setCount] = useState(0);
  const [whereTo, setWhereTo] = useState("/homepage")
  const [editNum, setEditNum] = useState(null)
  const [imgFile, setImgFile] = useState(new File([""], "", {
    type: "image/png"
  }))
  const [setImg, setSetImg] = useState(false)
  function setLoginPath(d){
    setWhereTo(d)
  }
  useEffect(()=>{
    fetch(`https://localhost:3000/privateFile/${1}`).then(r=>r.json()).then(r=>{
    const v = IntepretFile(r)
    setImgFile(v)
    setSetImg(true)
})
},[])
  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);
  const urlName = window.location.origin;
  const interpretedImage = URL.createObjectURL(imgFile);
  return  <div style={{height: "100vh", width: "100vw", backgroundColor: "#0f0e0f", color:"white"}}>
    <Helmet
    >
      <title>SVGs</title>
      <link  rel="icon"
          type="image/png"
          href={setImg ? interpretedImage: ""}
          sizes="16x16"></link>
    </Helmet>
    <BrowserRouter>
    <Routes>
      <Route path="/creator/tutorial" element={<CreatorTutorial></CreatorTutorial>}>
      </Route >
      <Route path="/creator/account" element={<CreatorAccount setEditNum={setEditNum} setLoginPath={setLoginPath}></CreatorAccount>}>
      </Route>
      <Route path="/creator/browse" element={<CreatorBrowse setLoginPath={setLoginPath} setEditNum={setEditNum}></CreatorBrowse>}>
      </Route>
      <Route path="/Creator" element={<DivEditor editNum={editNum} setEditNum={setEditNum}></DivEditor>}>
      </Route>
      <Route path="/login" element={<Login afterloginpath={whereTo}/>}>
      </Route>
      <Route path="/HomePage" element={<Homepage></Homepage>}>
      </Route>
      <Route path="/" element={<Navigate to={"/HomePage"}/>}>
      </Route>
    </Routes>
  </BrowserRouter>
  </div>
}


export default App;

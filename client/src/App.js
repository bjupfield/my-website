import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import DivEditor from "./Components/DivEditor";
import Login from "./Components/Login";
import Homepage from "./Components/HomePage";
import CreatorTutorial from "./Components/CreatorTutorial";
import CreatorAccount from "./Components/CreatorAccount";
import CreatorBrowse from "./Components/CreatorBrowse";

function App() {
  const [count, setCount] = useState(0);
  const [whereTo, setWhereTo] = useState("/homepage")
  const [editNum, setEditNum] = useState(null)
  function setLoginPath(d){
    setWhereTo(d)
  }

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);
  const urlName = window.location.origin;
  return <div style={{height: "100%", width: "100%"}}><BrowserRouter>
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

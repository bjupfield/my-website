import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import DivEditor from "./Components/DivEditor";

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  return <div style={{height: "100%", width: "100%"}}><BrowserRouter>
    <Routes>
      <Route path="/Creator" element={<DivEditor></DivEditor>}>
      </Route>
      <Route path="/" element={<div>Hello</div>}>
      </Route>
    </Routes>
  </BrowserRouter>
  </div>
}


export default App;
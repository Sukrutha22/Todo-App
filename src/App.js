import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

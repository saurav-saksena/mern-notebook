import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Store from "./Context/Note/Store";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Authorization/Login";
import Signup from "./components/Authorization/Signup";

function App() {
  return (
    <>
      <Store>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Store>
    </>
  );
}

export default App;

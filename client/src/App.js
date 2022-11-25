import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import {useUser} from "./contexts/userContext"
import Detail from "./views/Detail";
import NavBar from "./components/NavBar";
import CreatePet from "./views/CreatePet";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <header>
          <NavBar />
        </header>

        <Routes>
          <Route path="/" element={<Main/ >}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/pet" element={<CreatePet />}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import NavBar from "./components/NavBar";
import CreatePet from "./views/CreatePet";
import PetsList from "./views/PetsList";
import CreateAppointment from "./views/CreateAppointment";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <header>
          <NavBar />
        </header>

        <Routes>
          <Route path="/" element={<Main/ >} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pet" element={<CreatePet />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/pet/:idPet" element={<CreateAppointment />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

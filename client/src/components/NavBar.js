import React from 'react';
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import logout from "../services/logout";

const NavBar = () => {
  const { user, setUser } = useUser();


  const logOut = async () => {
    const { success } = await logout();
    if (success) setUser(null)
    else window.alert("Error. No se pude desloguear")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <h1>BEST PET HELP</h1>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              INICIO
            </Link>
          </li>
          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                {user.names} {user.lastName}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"/pet"} className="dropdown-item">
                    Crear mascota
                  </Link>
                </li>
                <li>
                  <Link to={"/pets"} className="dropdown-item">
                    Crear Cita
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} className="dropdown-item">
                    LogOut
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

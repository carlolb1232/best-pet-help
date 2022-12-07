import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import logout from "../services/logout";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logOut = async () => {
    const { success } = await logout();
    if (success) {
      Swal.fire({
        title: "¿Está seguro que quiere salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, salir",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Usted salio del sistema", "¡Vuelva pronto!", "success");
          setUser(null);
          navigate("/");
        }
      });
    } else {
      window.alert("Error. No se pude desloguear");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <h1>BEST PET HELP</h1>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
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
              {user.rol === "dentist" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={"/appointment/pets"}
                      className="dropdown-item item-dark"
                    >
                      Ver citas totales
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOut} className="dropdown-item">
                      LogOut
                    </button>
                  </li>
                </ul>
              )}
              {user.rol === "patient" && (
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
                    <Link to={"/appointments"} className="dropdown-item">
                      Ver citas
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOut} className="dropdown-item">
                      LogOut
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

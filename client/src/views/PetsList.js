import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { simpleGet } from "../services/simpleGet";

const PetsList = () => {
  const { user, setUser } = useUser();
  const [pets, setPets] = useState();

  const getPets = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/pet/${user._id}`);
      console.log(response.data.pets);
      setPets(response.data.pets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="container">
      <h2>
        SELECCIONE A SU MASCOTA SEÑOR {user.names} {user.lastName} {user._id}:
      </h2>
      <div className="pets-container">
        <Link className="pet-container">
          <div className="pet">+</div>
          <p>Crear mascota</p>
        </Link>
        {pets?.map((pet) => {
          return (
            <Link to={`/pet/${pet._id}`} className="pet-container">
              <div className="pet">{pet.nickName}</div>
              <p>SACAR CITA A MASCOTA</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PetsList;

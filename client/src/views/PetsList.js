import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { simpleGet } from "../services/simpleGet";
import mas from "../assets/mas.png"

const PetsList = () => {
  const { user, setUser } = useUser();
  const [pets, setPets] = useState();

  const getPets = async () => {
    try {
      const response = await simpleGet(`/api/pet/${user._id}`);
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
    <div className="container mt-5">
      <h2 className="mb-5 change-text">
      {user.names} {user.lastName}, seleccione la mascota a cual sacar la cita:
      </h2>
      <div className="pets-container">
        <Link to={"/pet"} className="pet-container">
          <img src={mas} className="pet mas" />
          <p>Crear mascota</p>
        </Link>
        {pets?.map((pet) => {
          return (
            <Link to={`/pet/${pet._id}`} className="pet-container" key={pet._id}>
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

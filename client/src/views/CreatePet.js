import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';
import { useUser } from "../contexts/userContext";
import { simplePost } from '../services/simplePost';
import Swal from 'sweetalert2'

const CreatePet = () => {

  const { user,setUser } = useUser();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])


  const createPet = async (values) => {
    try {
      values.idUser=user._id;
      const response = await simplePost("/api/pet", values)
      console.log(response.data);
      user.pets.push(response.data.pet._id)
      if (response.data.message === "") {
        setUser({...user})
        navigate("/pets")
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Mascota creada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorResponse = response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='forms-container'>
      {errors.map((err, index) => <div className="alert alert-danger" role="alert" key={index}>{err}</div>)}
      <div className="container">
        <h2 className='change-text'>Registro de Nueva Mascota</h2>
        <PetForm nickName="" age="" specie="" race="" onSubmitProp={createPet} />
      </div>
    </div>
  );
}

export default CreatePet;

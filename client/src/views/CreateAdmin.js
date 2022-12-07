import React, { useEffect, useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import { simplePost } from '../services/simplePost';
import {useUser} from "../contexts/userContext"
import { simpleGetAuthenticated } from '../services/simpleGetAuthenticated';
import Swal from 'sweetalert2'

const CreateAdmin = () => {
  const {setUser} = useUser();
  const navigate = useNavigate();

  let admin = {
    names: "administrador",
    lastName: "administrador",
    email: "administrador@gmail.com",
    password: "123",
    confirmPassword: "123",
    rol: "dentist"
  }

  const registrarUsuario = async () => {
    const response = await simplePost("/api/register", admin);
    if (response.data.message === "") {
      console.log("usuario registrado", response.data);
      const response2 = await simpleGetAuthenticated(`/api/user/${response.data._id}`)
      setUser(response2.data);
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'CREO UN USUARIO ADMINISTRADOR',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/")
    } else {
      console.log("error")
    }
  }


  useEffect(() => {
    registrarUsuario()
  }, []);

  return (
    <div>
      <h2>Creando admin</h2>
    </div>
  );
}

export default CreateAdmin;

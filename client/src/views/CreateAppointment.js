import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import { simpleGet } from "../services/simpleGet";
import { simplePost } from "../services/simplePost";
import moment from 'moment';


const CreateAppointment = () => {
  const { idPet } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  const [pet, setPet] = useState();

  const getPet = async() =>{
    try {
      const response = await simpleGet(`http://localhost:8000/api/pet/one/${idPet}`)
      console.log("mascota",response.data.pet)
      setPet(response.data.pet)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPet()
  }, []);

  const createAppointment = async (values) => {
    try {
      values.idPet = idPet;
      values.petName = pet.nickName ;
      const response = await simplePost("http://localhost:8000/api/appointment/", values);
      console.log(response.data);
      if (response.data.message === "") {
        navigate("/appointments");
      } else {
        const errorResponse = response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2>Crear cita para mascota: {idPet}</h2>
      {errors.map((err, index) => (
        <div className="alert alert-danger" role="alert" key={index}>
          {err}
        </div>
      ))}
      <AppointmentForm description="" date={moment().format('YYYY-MM-DD')} onSubmitProp={createAppointment} txt={"CREAR CITA"}/>
    </div>
  );
};

export default CreateAppointment;

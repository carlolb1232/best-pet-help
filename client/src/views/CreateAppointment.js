import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import { simplePost } from "../services/simplePost";

const CreateAppointment = () => {
  const { idPet } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  


  const createAppointment = async (values) => {
    try {
      values.idPet = idPet;
      const response = await simplePost("/api/appointment/", values);
      console.log(response.data);
      if (response.data.message === "") {
        navigate("/");
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
      <AppointmentForm description="" date="" hour="" onSubmitProp={createAppointment} />
    </div>
  );
};

export default CreateAppointment;

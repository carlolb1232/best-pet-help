import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import { simpleGet } from '../services/simpleGet';
import { simplePut } from '../services/simplePut';

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  const [appointment, setAppointment] = useState();

  const getAppointment = async () => {
    try {
      const response = await simpleGet(`/api/appointment/one/${id}`)
      console.log("Appoitment", response.data.appointment)
      setAppointment(response.data.appointment)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAppointment()
  }, []);

  const editAppointment = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/appointment/edit/${id}`, values);
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
      <h2>Editar cita para mascota:</h2>
      {errors.map((err, index) => (
        <div className="alert alert-danger" role="alert" key={index}>
          {err}
        </div>
      ))}
      {
        appointment&&
        <AppointmentForm description={appointment.description} date={appointment.date} hour={appointment.hour} onSubmitProp={editAppointment} txt={"EDITAR CITA"}/>
      }
    </div>
  );
}

export default EditAppointment;

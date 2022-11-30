import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { simpleGet } from "../services/simpleGet";
import moment from "moment";
import { simplePut } from "../services/simplePut";

const AppointmentDetail = () => {
  const { id } = useParams();

  const [hour, setHour] = useState();

  const [appointment, setAppointment] = useState();

  const getAppointment = async () => {
    try {
      const response = await simpleGet(`/api/appointment/one/${id}`);
      console.log("Appoitment", response.data.appointment);
      setAppointment(response.data.appointment);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const updateHour = async (value) => {
    try {
      const response = await simplePut(`/api/appointment/edit/${id}`, value);
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newHour = {
      hour: hour,
      status: "Agendada"
    }
    updateHour(newHour)
  }

  useEffect(() => {
    hour&&console.log(hour)
  }, [hour]);

  return (
    <div className="container">
      <h2>DETALLES DE CITA</h2>
      <h3>{appointment?.petName}</h3>
      <p>Descripción:</p>
      <p>{appointment?.description}</p>
      <p>Fecha Solicitada:</p>
      <p>{moment(appointment?.date).format("YYYY-MM-DD")}</p>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="hour" className="form-label">
            Hora establecida
          </label>
          <input type="text" name="hour" className="form-control" onChange={(e)=>setHour(e.target.value)} />
        </div>
        <input
          type="submit"
          className="btn btn-success mt-3"
          value="ESTABLECER HORA"
        />
      </form>
    </div>
  );
};

export default AppointmentDetail;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { simpleGet } from "../services/simpleGet";
import moment from "moment";
import { simplePut } from "../services/simplePut";
import { useUser } from "../contexts/userContext";

const AppointmentDetail = () => {
  const {user} = useUser();

  const { id } = useParams();
  const navigate = useNavigate();

  const [hour, setHour] = useState();
  const [observacion, setObservacion] = useState();

  const [appointment, setAppointment] = useState();

  const getAppointment = async () => {
    try {
      const response = await simpleGet(`/api/appointment/one/${id}`);
      console.log("Appoitment", response.data.appointment);
      setAppointment(response.data.appointment);
      setHour(response.data.appointment.hour)
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
      status: "Agendada",
      observacion: ""
    }
    updateHour(newHour)
    navigate("/appointment/pets")
  }
  
  const handleSubmit2 = (e) => {
    e.preventDefault()
    let newObservacion = {
      hour: null,
      status: "Observada",
      observacion:observacion
    }
    updateHour(newObservacion)
    navigate("/appointment/pets")
  }

  useEffect(() => {
    hour&&console.log(hour)
  }, [hour]);
  
  useEffect(() => {
    observacion&&console.log(observacion)
  }, [observacion]);

  return (
    <div className="container appointment-detail-container">
      <h2 className="text-change">Detalles de la Cita</h2>
      <h3 className="text-change">Nombre: {appointment?.petName}</h3>
      <p className="text-change">Descripción:</p>
      <p>{appointment?.description}</p>
      <p className="text-change">Fecha Solicitada:</p>
      <p>{moment(appointment?.date).add('days', 1).format("YYYY-MM-DD")}</p>
      {
        appointment?.observacion!=""&&
        <div className="observacion">
          <p className="text-change">OBSERVACIÓN:</p>
          <p>{appointment?.observacion}</p>
        </div>
      }
      {
        appointment?.hour&&
        <div className="cita-hora">
          <p className="text-change">HORA / INDICACIÓNES DE LA CITA:</p>
          <p>{appointment?.hour}</p>
        </div>
      }
      {
        user.rol ==="dentist"&&
        <div className="dentist-forms-container">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="hour" className="form-label">
                Hora establecida e indicaciones
              </label>
              <textarea name="hour" className="form-control" value={hour} onChange={(e)=>setHour(e.target.value)} />
            </div>
            <input
              type="submit"
              className="btn btn-success mt-3"
              value="ESTABLECER HORA"
            />
          </form>
          <form className="mt-3" onSubmit={(e)=>handleSubmit2(e)}>
            <div className="form-group">
              <label htmlFor="observacion" className="form-label">
                OBSERVAR CITA U HORA
              </label>
              <textarea name="observacion" className="form-control" onChange={(e)=>setObservacion(e.target.value)} />
            </div>
            <input
              type="submit"
              className="btn btn-danger mt-3"
              value="MANDAR OBSERVACIÓN"
            />
          </form>

        </div>
      }
      {/* {
        user.rol ==="dentist"&&
      } */}
    </div>
  );
};

export default AppointmentDetail;

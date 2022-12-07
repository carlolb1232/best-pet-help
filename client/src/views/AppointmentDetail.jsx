import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { simpleGet } from "../services/simpleGet";
import moment from "moment";
import { simplePut } from "../services/simplePut";
import { useUser } from "../contexts/userContext";
import Swal from 'sweetalert2'

const AppointmentDetail = () => {
  const {user} = useUser();

  const { id } = useParams();
  const navigate = useNavigate();

  const [hour, setHour] = useState();
  const [observacion, setObservacion] = useState();

  const [appointment, setAppointment] = useState();

  const getAppointment = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/appointment/one/${id}`);
      console.log("Appoitment", response.data.appointment);
      setAppointment(response.data.appointment);
      setHour(response.data.appointment.hour)
      setObservacion(response.data.appointment.observacion)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const updateHour = async (value) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/appointment/edit/${id}`, value);
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
    Swal.fire({
      icon: 'success',
      title: 'La hora de la cieta fue establecida',
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  const handleSubmit2 = (e) => {
    e.preventDefault()
    let newObservacion = {
      hour: null,
      status: "Observada",
      observacion:observacion
    }
    Swal.fire({
      title: '¿Seguro de observar esta cita?',
      text: "La cita tendra un estado de observado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, observar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Cita observada!',
          'La cita tiene una observación.',
          'success'
          )
          updateHour(newObservacion)
          navigate("/appointment/pets")
      }
    })
  }

  useEffect(() => {
    hour&&console.log(hour)
  }, [hour]);
  
  useEffect(() => {
    observacion&&console.log(observacion)
  }, [observacion]);

  return (
    <div className="container appointment-detail-container">
      <h2 className="change-text">Detalles de la Cita</h2>
      <h3 className="change-text">Nombre: {appointment?.petName}</h3>
      <p className="change-text">Descripción:</p>
      <p>{appointment?.description}</p>
      <p className="change-text">Fecha Solicitada:</p>
      <p>{moment(appointment?.date).add('days', 1).format("YYYY-MM-DD")}</p>
      {
        appointment?.observacion!=""&&
        <div className="observacion">
          <p className="change-text observacion">OBSERVACIÓN:</p>
          <p>{appointment?.observacion}</p>
        </div>
      }
      {
        appointment?.hour&&
        <div className="cita-hora">
          <p className="change-text cita-hora">Hora / Indicaciones de la cita:</p>
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
              <textarea name="observacion" className="form-control" value={observacion} onChange={(e)=>setObservacion(e.target.value)} />
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

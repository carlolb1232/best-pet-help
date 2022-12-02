import React, { useEffect, useState } from "react";
import { simpleGet } from "../services/simpleGet";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const TotalAppointmentsList = () => {

  const navigate = useNavigate()

  const [pets, setPets] = useState();

  const [appointments, setAppointments] = useState([]);

  const getAllPets = async () => {
    try {
      const response = await simpleGet(`/api/appointments/pets`);
      console.log(response.data.pets);
      setPets(response.data.pets);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAppointments = (pets) => {
    pets.map((pet) => {
      setAppointments((oldAppointments) => [
        ...oldAppointments,
        ...pet.appointments,
      ]);
    });
  };

  useEffect(() => {
    getAllPets();
  }, []);

  useEffect(() => {
    pets && getAllAppointments(pets);
  }, [pets]);

  return (
    <div className="container">
      <h2>Hola</h2>
      <table className="table table-striped table-bordered border-dark table-light">
        <thead>
          <tr>
            <th>Nombre de mascota</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment) => {
            return (
              <tr key={appointment._id}>
                <td>{appointment.petName}</td>
                <td>{moment(appointment.date).add('days', 1).format('YYYY-MM-DD')}</td>
                {
                  appointment.status==="Agendada"&&
                  <td className="status-ag">{appointment.status}</td>
                }
                {
                  appointment.status==="Espera"&&
                  <td className="status-es">{appointment.status}</td>
                }
                {
                  appointment.status==="Observada"&&
                  <td className="status-ob">{appointment.status}</td>
                }
                <td className="spread-buttons">
                  <button className="btn btn-info" onClick={()=>navigate(`/appointment/detail/${appointment._id}`)} >Detalles</button>
                  <button className="btn btn-danger">Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TotalAppointmentsList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { simpleGet } from "../services/simpleGet";
import moment from 'moment';


const AppointmentsList = () => {
  const { user, setUser } = useUser();
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  // const getPets = async()=>{
  //   try {
  //     const response = await simpleGet(`/api/pet/${user._id}`);
  //     console.log(`pets: `, );
  //     setCitas([...citas, ...response.data.appointments]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const getAppointments = async (idPet, idx) => {
  //   try {
  //     const response = await simpleGet(`/api/appointment/${idPet}`);
  //     console.log(`cita ${idx}`, response.data.appointments);
  //     setCitas([...citas, ...response.data.appointments]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    user.pets.map(async (idPet, idx) => {
      // await getAppointments(pet, idx)
      try {
        const response = await simpleGet(`/api/appointment/${idPet}`);
        console.log(`cita ${idx}`, response.data.appointments);
        setCitas((oldCitas) => [...oldCitas, ...response.data.appointments]);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  useEffect(() => {
    citas && console.log("citas del efect", citas);
  }, [citas]);

  return (
    <div className="container mt-5">
      <table className="table table-striped table-bordered border-dark">
        <thead>
          <tr>
            <th>Nombre de la mascota</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas?.map((appointment) => {
            return (
              <tr key={appointment._id}>
                <td>{appointment.petName}</td>
                <td>{moment(appointment.date).format('YYYY-MM-DD')}</td>
                <td>
                  <button className="btn btn-warning" onClick={()=>navigate(`/appointment/${appointment._id}`)}>EDITAR</button>
                  <button className="btn btn-info" onClick={()=>navigate(`/appointment/detail/${appointment._id}`)}>DETALLES</button>
                  <button className="btn btn-danger">BORRAR</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;

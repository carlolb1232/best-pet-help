import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { simpleGet } from "../services/simpleGet";
import moment from 'moment';
import { simpleDelete } from "../services/simpleDelete";


const AppointmentsList = () => {
  const { user, setUser } = useUser();
  const [citas, setCitas] = useState([]);
  const [citasSort, setCitasSort] = useState([]);
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
    citas && setCitasSort(citas.sort((a,b)=>{
      if(a.date>b.date){
        return 1
      }
      if(a.date<b.date){
        return -1
      }
      return 0
    }));
  }, [citas]);

  const deleteAppointment = async (id) => {
    try {
      const response = await simpleDelete(`/api/appointment/delete/${id}`);
      console.log(response.data)
      setCitas((oldCitas)=>oldCitas.filter(appointment=>appointment._id !== id))
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="container mt-5">
      <h2>LISTAS DE CITAS</h2>
      <table className="table table-striped table-bordered border-dark table-light">
        <thead>
          <tr>
            <th>Nombre de la mascota</th>
            <th>Fecha</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citasSort?.map((appointment) => {
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
                  <button className="btn btn-warning" onClick={()=>navigate(`/appointment/${appointment._id}`)}>EDITAR</button>
                  <button className="btn btn-info" onClick={()=>navigate(`/appointment/detail/${appointment._id}`)}>DETALLES</button>
                  <button className="btn btn-danger" onClick={()=>deleteAppointment(appointment._id)}>BORRAR</button>
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

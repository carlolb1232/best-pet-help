import React, { useEffect, useState } from "react";
import { simpleGet } from "../services/simpleGet";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { simpleDelete } from "../services/simpleDelete";
import Swal from 'sweetalert2'

const TotalAppointmentsList = () => {

  const navigate = useNavigate()

  const [pets, setPets] = useState();

  const [appointments, setAppointments] = useState([]);
  const [appointmentsSort, setAppointmentsSort] = useState([]);
  

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const getAllPets = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/appointments/pets`);
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

  const deleteAppointment = async (id) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/appointment/delete/${id}`);
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro de que quiere eliminar esta cita?',
        text: "No podra deshaver esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'BORRAR',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'La cita ha sido eliminada.',
            'success'
            )
            console.log(response.data)
            setAppointments((oldAppointments)=>oldAppointments.filter(appointment=>appointment._id !== id))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'Volviendo a la lista de citas',
            'error'
          )
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    appointments && setAppointmentsSort(appointments.sort((a,b)=>{
      if(a.date>b.date){
        return 1
      }
      if(a.date<b.date){
        return -1
      }
      return 0
    }));
  }, [appointments]);

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
          {appointmentsSort?.map((appointment) => {
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
                  <button className="btn btn-danger" onClick={()=>deleteAppointment(appointment._id)}>Borrar</button>
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

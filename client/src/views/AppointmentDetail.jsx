import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import moment from 'moment';

const AppointmentDetail = () => {
  
  const { id } = useParams();

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

  return (
    <div className='container'>
      <h2>DETALLES DE CITA</h2>
      <h3>{appointment?.petName}</h3>
      <p>Descripción:</p>
      <p>{appointment?.description}</p>
      <p>Fecha Solicitada:</p>
      <p>{moment(appointment?.date).format('YYYY-MM-DD')}</p>
      <form>
        <div className="form-group">
          <label htmlFor="hour" className='form-label'>Hora establecida</label>
          <input type="text" name='hour' className='form-control' />
        </div>
        <input type="submit" className='btn btn-success mt-3' value="ESTABLECER HORA" />
      </form>
    </div>
  );
}

export default AppointmentDetail;

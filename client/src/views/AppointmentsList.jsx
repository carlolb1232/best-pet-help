import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import { simpleGet } from "../services/simpleGet";

const AppointmentsList = () => {
  const { user, setUser } = useUser();
  const [citas, setCitas] = useState([]);

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
    user.pets.map(async (idPet, idx)=>{
      // await getAppointments(pet, idx)
      try {
        const response = await simpleGet(`/api/appointment/${idPet}`);
        console.log(`cita ${idx}`, response.data.appointments);
        setCitas((oldCitas)=>[...oldCitas,...response.data.appointments]);
      } catch (err) {
        console.log(err);
      }
    })
  }, []);

  useEffect(() => {
    citas&&
    console.log("citas del efect",citas)
  }, [citas]);

  return (
    <div>
      {citas?.map((appointment) => {
        return (
          <div>
            <p key={appointment._id}>{appointment.petName} | {appointment.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentsList;

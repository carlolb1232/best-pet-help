const { Appointment } = require("../models/appointment.model");
const { Pet } = require("../models/pet.model");

module.exports.createAppointment = async(req,res)=>{
    try{
        const {description,date,hour,idPet} = req.body;
        const appointment = await Appointment.create({description,date,hour});
        const pet = await Pet.findById(idPet).exec();
        pet.appointments.push(appointment);
        await pet.save();
        res.json(appointment);
    }
    catch(err){
        res.json(err)
    }
}

module.exports.getAppointmentsFromPet = async(req,res)=>{
    try{
        const {idPet} = req.params;
        const pet = await Pet.findById(idPet).populate("appointments").exec();
        console.log("Appointments del pet",pet.appointments);
        res.json({message:"",appointments:pet.appointments})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}
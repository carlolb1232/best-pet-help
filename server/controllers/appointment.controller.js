const { Appointment } = require("../models/appointment.model");
const { Pet } = require("../models/pet.model");
const { User } = require("../models/user.model");

module.exports.createAppointment = async (req, res) => {
  try {
    const { description,petName, date, idPet } = req.body;
    const appointment = await Appointment.create({ description, petName, date});
    const pet = await Pet.findById(idPet).exec();
    pet.appointments.push(appointment);
    await pet.save();
    res.json({ message: "", appointment: appointment });
  }
  catch (err) {
    res.json(err)
  }
}

module.exports.getAppointmentsFromPet = async (req, res) => {
  try {
    const { idPet } = req.params;
    const pet = await Pet.findById(idPet).populate("appointments").exec();
    console.log("Appointments del pet", pet.appointments);
    res.json({ message: "", appointments: pet.appointments })
  } catch (err) {
    res.json({ message: "Algo salio mal", errors: err.errors })
  }
}

module.exports.getallPetsAndAppointments = async (req, res) => {
  try {
    const pet = await Pet.find({}).populate("appointments").exec();
    console.log("Appointments", pet.appointments);
    res.json({ message: "", pets: pet })
  } catch (err) {
    res.json({ message: "Algo salio mal", errors: err.errors })
  }
}

module.exports.findOne = (req, res) => {
  const { id } = req.params
  Appointment.findOne({ _id: id })
    .then(appointment => res.json({ message: "", appointment: appointment }))
    .catch(err => res.json({ message: "Algo salio mal", errors: err.errors }))
}

module.exports.editOne = (req, res)=>{
  const { id } = req.params
  const { body } = req
  Appointment.findByIdAndUpdate({_id:id}, body, {new:true, runValidators:true})
    .then(appointment => res.json({ message: "", appointment: appointment }))
    .catch(err => res.json({ message: "Algo salio mal", errors: err.errors }))
}

module.exports.deleteOne = (req, res) => {
  const { id } = req.params
  Appointment.findByIdAndDelete({_id:id})
    .then(deleteMessage => res.json({message:"", deleteMessage: deleteMessage}))
    .catch(err => res.json({ message: "Algo salio mal", errors: err.errors }))
}

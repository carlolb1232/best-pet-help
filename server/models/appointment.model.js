const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    petName:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    date:{
        type:String,
        required:[true,"El apellido es obligatorio"]
    },
    hour:{
        type:String,
        required:[true,"El email es obligatorio"],
    },
},
{timestamps:true});


const Appointment = mongoose.model("Appointment",AppointmentSchema);
module.exports = {AppointmentSchema,Appointment}
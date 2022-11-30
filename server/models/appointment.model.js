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
        type:Date,
        required:[true,"El apellido es obligatorio"]
    },
    status:{
        type:String,
        default: "Espera"
    },
    hour:{
        type:String,
    }
},
{timestamps:true});


const Appointment = mongoose.model("Appointment",AppointmentSchema);
module.exports = {AppointmentSchema,Appointment}
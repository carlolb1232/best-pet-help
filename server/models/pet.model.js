const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    nickName:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    age:{
        type:String,
        required:[true,"El apellido es obligatorio"]
    },
    specie:{
        type:String,
        required:[true,"El email es obligatorio"],
    },
    race:{
        type:String,
        required:[true,"Por favor ingresar contraseña"],
    },
    appointments:[{type:mongoose.Schema.Types.ObjectId,ref:"Appointment"}]
},
{timestamps:true});


const Pet = mongoose.model("Pet",PetSchema);
module.exports = {PetSchema,Pet}
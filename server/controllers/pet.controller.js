const { Pet } = require("../models/pet.model");
const { User } = require("../models/user.model");

module.exports.createPet = async(req,res)=>{
    try{
        const {nickName,age,specie,race,idUser} = req.body;
        const pet = await Pet.create({nickName,age,specie,race});
        const user = await User.findById(idUser).exec();
        user.pets.push(pet);
        await user.save();
        res.json({message:"", pet:pet});
    }
    catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}

module.exports.getPetsFromUser = async(req,res)=>{
    try{
        const {idUser} = req.params;
        const user = await User.findById(idUser).populate("pets").exec();
        console.log("Pets del usuario",user.pets);
        res.json({message:"",pets:user.pets})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}
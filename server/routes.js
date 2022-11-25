const UserController = require("./controllers/user.controller")
const PetController = require("./controllers/pet.controller")
const AppointmentController = require("./controllers/appointment.controller")
const authenticate = require("./config/authenticate")

module.exports = function(app){
    // USER
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);

    //USER AUTH
    app.get("/api/users",authenticate, UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser)

    // PET
    app.post("/api/pet", PetController.createPet);
    app.get("/api/pet/:idUser", PetController.getPetsFromUser);

    // APPOINTMENTS
    app.post("/api/appointment/", AppointmentController.createAppointment);
    app.get("/api/appointment/:idPet", AppointmentController.getAppointmentsFromPet);
}
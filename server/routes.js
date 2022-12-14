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
    app.get("/api/pet/one/:id", PetController.findOne);

    // APPOINTMENTS
    app.post("/api/appointment/", AppointmentController.createAppointment);
    app.get("/api/appointment/:idPet", AppointmentController.getAppointmentsFromPet);
    app.get("/api/appointment/one/:id", AppointmentController.findOne);
    app.delete("/api/appointment/delete/:id", AppointmentController.deleteOne);
    app.put("/api/appointment/edit/:id", AppointmentController.editOne);
    app.get("/api/appointments/pets", AppointmentController.getallPetsAndAppointments);
}
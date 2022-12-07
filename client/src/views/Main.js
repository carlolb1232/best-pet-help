import React from "react";
import animales from "../assets/fondo-animal.png";
import animales2 from "../assets/fondo-animal2.png";
import animales3 from "../assets/fondo-animal3.png";
import consulta from "../assets/consulta.jpg";
import aseo from "../assets/aseo.jpg";
import cirugia from "../assets/cirugia.jpg";

const Main = () => {
  return (
    <div className="container main-container">
      {/* <div className="main-image">
                <img src={animales} alt="animales" />
            </div> */}
      <h2>Bienvenido</h2>
      <div
        id="carouselExampleIndicators"
        className="carousel slide main-image"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={animales} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={animales2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={animales3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="description-container">
        <h2>Instrucciones</h2>
        <p>
          Bienvido a BEST PET HELP, tu gestor de citas de mascotas favorito. Con esta aplicación podras:
        </p>
        <ul>
          <li>Crear perfiles para tus mascotas</li>
          <li>Crear citas para algún malestar de tus mascotas</li>
          <li>Revisar el estatus de las citas de tus mascotas</li>
          <li>Verificar indicaciones para las citas de tus mascotas</li>
        </ul>
        <p>
          Si tienes alguna duda, sientete libre de revisar el manual de usuario:
        </p>
        <a className="manual" href="https://drive.google.com/file/d/12I0anyRq7IWVkOb_tnGReniMViNLdBqW/view?usp=share_link" target="__blank">👉MANUAL DE USUARIO👈</a>
      </div>
      <h2>Servicios</h2>
      <div className="services-container">
        <div className="service-container">
          <img src={consulta} alt="" />
          <p>CONSULTAS</p>
        </div>
        <div className="service-container">
          <img src={aseo} alt="" />
          <p>ASEO</p>
        </div>
        <div className="service-container">
          <img src={cirugia} alt="" />
          <p>CIRUGIA</p>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Main;

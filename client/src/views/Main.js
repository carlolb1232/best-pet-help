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
        <h2>Descripción</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea esse
          laborum ratione? Eius error odit reiciendis nobis, ducimus possimus
          consequatur ut officiis sequi quia doloremque fugit deserunt ea iure,
          dolore qui libero amet numquam rerum reprehenderit nesciunt?
          Distinctio reprehenderit tempore dolor animi totam veritatis eos qui
          officiis, est doloribus enim ducimus, velit, sequi sapiente labore sit
          quo temporibus impedit veniam dolore maiores vel accusantium! Dolorem
          ullam recusandae ea aperiam nemo in, commodi, nobis id at accusantium
          natus quae, obcaecati quaerat quibusdam sit.
        </p>
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

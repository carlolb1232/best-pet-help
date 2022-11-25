import React from 'react';
import animales from "../assets/fondo-animal.jpg"
import consulta from "../assets/consulta.jpg"
import aseo from "../assets/aseo.jpg"
import cirugia from "../assets/cirugia.jpg"


const Main = () => {


    return (
        <div className='container mt-5'>
            <div className="main-image">
                <img src={animales} alt="animales" />
            </div>
            <div className="description-container">
                <h2>Descripción:</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea esse laborum ratione? Eius error odit reiciendis nobis, ducimus possimus consequatur ut officiis sequi quia doloremque fugit deserunt ea iure, dolore qui libero amet numquam rerum reprehenderit nesciunt? Distinctio reprehenderit tempore dolor animi totam veritatis eos qui officiis, est doloribus enim ducimus, velit, sequi sapiente labore sit quo temporibus impedit veniam dolore maiores vel accusantium! Dolorem ullam recusandae ea aperiam nemo in, commodi, nobis id at accusantium natus quae, obcaecati quaerat quibusdam sit. Nesciunt ea similique, quidem commodi odit, laudantium, assumenda delectus eveniet suscipit accusantium qui vero blanditiis porro veniam debitis aliquam a eius et amet facere iure id excepturi voluptatem dignissimos! Beatae, voluptatibus aut dolores, at id saepe ea, tempora temporibus repudiandae perferendis numquam! Fuga quidem neque, reprehenderit tenetur blanditiis voluptates dolorem ut magnam, voluptate magni maiores cum quasi dolor in, deleniti voluptatum pariatur delectus nihil quisquam ipsum similique fugit?</p>
            </div>
            <h2>Servicios:</h2>
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
        </div>
    );
}

export default Main;

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PetForm = (props) => {
  const { nickName, age, specie, race, onSubmitProp } = props;

  return (
    <div >
      <Formik
        initialValues={{
          nickName: nickName,
          age: age,
          specie: specie,
          race: race,
        }}
        validationSchema={Yup.object().shape({
          nickName: Yup.string()
            .required("Por favor ingresa tu nombre"),

          age: Yup.string()
            .required("Por favor ingrese el apellido correctamente"),

          specie: Yup.string()
            .required("Por favor, ingresa un correo electrónico válido"),

          race: Yup.string()
            .required("Por favor ingrese una contraseña"),
        })}

        onSubmit={(values, { setSubmitting }) => {
          onSubmitProp(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          //isSubmitting,
          //validating,
          valid,
        }) => {
          return (
            <div>
              <h2>REGISTRO</h2>
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <label htmlFor="nickName" className="col-sm-2 col-form-label">Nombre/Apodo</label>
                <Field id='nickName' type="text" className="form-control" placeholder="Nombre/Apodo" name='nickName' />
                {errors.nickName && touched.nickName && <p>{errors.nickName}</p>}

                <label htmlFor="age" className="col-sm-2 col-form-label">Edad</label>
                <Field id='age' type="text" placeholder="Edad" className="form-control" name='age' />
                {errors.age && touched.age && <p>{errors.age}</p>}

                <label htmlFor="specie" className="col-form-label">Especie</label>
                <Field id='specie' type="text" placeholder="Especie" className="form-control" name='specie' />
                {errors.specie && touched.specie && <p>{errors.specie}</p>}

                <label htmlFor="race" className="col-sm-2 col-form-label">Raza</label>
                <Field id='race' type="race" placeholder="Raza" className="form-control" name='race' />
                {errors.race && touched.race && <p>{errors.race}</p>}
                <br></br>
                <button className='btn btn-primary btn-lg' type="submit" disabled={Object.values(errors).length > 0}>Crear Mascota</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default PetForm;

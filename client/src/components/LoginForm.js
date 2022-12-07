import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {

  const { onSubmitProp } = props;
  const navigate = useNavigate();

  return (
    <div >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Correo no valido")
            .required("Por favor, ingresa un correo electrónico válido"),

          password: Yup.string()
            .required("Por favor ingrese una contraseña")
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
            <div className='form-center'>
              <h2 className='change-text'>Login</h2>
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <label htmlFor="email" className="col-form-label">Correo Electrónico</label>
                <Field id='email' type="text" placeholder="Email" className={`form-control`} name='email' />
                {errors.email && touched.email && <p className={`alert alert-danger`}>{errors.email}</p>}

                <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                <Field id='password' type="password" placeholder="Contraseña" className={`form-control`} name='password' />
                {errors.password && touched.password && <p className={`alert alert-danger`}>{errors.password}</p>}
                <br></br>
                <button className='btn btn-primary btn-lg' type="submit" disabled={Object.values(errors).length > 0}>Login</button>
                <div className='mt-3'>
                  <p>Si no tienes cuenta, registrate aquí 👇</p>
                  <button className="btn btn-success" onClick={()=>navigate("/register")}>Crear Cuenta</button>
                </div>

              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;

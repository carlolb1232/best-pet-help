import React from 'react';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const RegisterForm = (props) => {

  const { names, lastName, email, password, confirmPassword, onSubmitProp } = props;

  return (
    <div >
      <Formik
        initialValues={{
          names: names,
          lastName: lastName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }}
        validationSchema={Yup.object().shape({
          names: Yup.string()
            .required("Por favor ingresa tu nombre"),

          lastName: Yup.string()
            .required("Por favor ingrese el apellido correctamente"),

          email: Yup.string()
            .email("Correo no valido")
            .required("Por favor, ingresa un correo electrónico válido"),

          password: Yup.string()
            .equals([Yup.ref('confirmPassword'), null], "las contraseñas no son iguales")
            .required("Por favor ingrese una contraseña"),

          confirmPassword: Yup.string()
            .equals([Yup.ref('password'), null], "las contraseñas no son iguales")
            .required("Por favor ingrese la confirmación de la contraseña"),
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
                <label htmlFor="names" className="col-sm-2 col-form-label">Nombres</label>
                <Field id='names' type="text" className="form-control" placeholder="Nombres" name='names' />
                {errors.names && touched.names && <p className={`alert alert-danger`}>{errors.names}</p>}

                <label htmlFor="lastName" className="col-sm-2 col-form-label">Apellido</label>
                <Field id='lastName' type="text" placeholder="Apellido" className="form-control" name='lastName' />
                {errors.lastName && touched.lastName && <p className={`alert alert-danger`}>{errors.lastName}</p>}

                <label htmlFor="email" className="col-form-label">Correo Electrónico</label>
                <Field id='email' type="text" placeholder="Email" className="form-control" name='email' />
                {errors.email && touched.email && <p className={`alert alert-danger`}>{errors.email}</p>}

                <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                <Field id='password' type="password" placeholder="Contraseña" className="form-control" name='password' />
                {errors.password && touched.password && <p className={`alert alert-danger`}>{errors.password}</p>}

                <label htmlFor="confirmPassword" className="col-form-label">Confirmar Contraseña</label>
                <Field id='confirmPassword' type="password" placeholder="Confirmar Contraseña" className="form-control" name='confirmPassword' />
                {errors.confirmPassword && touched.confirmPassword && <p className={`alert alert-danger`}>{errors.confirmPassword}</p>}
                <br></br>
                <button className='btn btn-primary btn-lg' type="submit" disabled={Object.values(errors).length > 0}>Registrarse</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
export default RegisterForm
import React from 'react';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const AppointmentForm = (props) => {

  const { description, date, onSubmitProp, txt } = props;

  return (
    <div >
      <Formik
        initialValues={{
          description: description,
          date: date,
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string()
            .required("Por favor ingresa tu nombre"),

          date: Yup.date()
            .required("Por favor ingrese el apellido correctamente"),

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
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <label htmlFor="description" className="col-sm-2 col-form-label">Descripción</label>
                <Field id='description' as="textarea" type="text" className="form-control" placeholder="Descripción" name='description' />
                {errors.description && touched.description && <p className={`alert alert-danger`}>{errors.description}</p>}

                <label htmlFor="date" className="col-sm-2 col-form-label">Fecha:</label>
                <Field id='date' type="date" placeholder="Fecha" className="form-control" name='date' />
                {errors.date && touched.date && <p className={`alert alert-danger`}>{errors.date}</p>}

                <br></br>
                <button className='btn btn-primary btn-lg' type="submit" disabled={Object.values(errors).length > 0}>{txt}</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default AppointmentForm;

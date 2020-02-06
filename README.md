# Former
## Clone version of Formik
Get rid of lodash
> Current version only has support functions as a demo shown

Example
```JSX
import React from "react";
import "./styles.css";

import Former from "./Former";

export default function App() {
  return (
    <div className="App">
      <h1>Former demo (Formik clone)</h1>
      <Former
        initialValues={{
          email: "",
          password: "",
          name: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
          setValues
        }) => {
          return (
            <div className="form">
              <form onSubmit={handleSubmit}>
                {errors.email && touched.email && errors.email}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && errors.password}
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={({ target: { value } }) =>
                    setFieldValue("name", value)
                  }
                />
                <button disabled={isSubmitting} type="submit">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValues({ ...values, email: "test@gmail.m" })
                  }
                >
                  set values
                </button>
              </form>
            </div>
          );
        }}
      </Former>
    </div>
  );
}
```

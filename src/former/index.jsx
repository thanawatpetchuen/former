import { useState, useCallback } from "react";

const setAll = async (obj, val) => {
  const newObj = {};
  await Object.keys(obj).forEach(k => (newObj[k] = val));
  return newObj;
};

const Former = ({
  initialValues,
  onSubmit,
  validate,
  validateOnChange = true,
  children
}) => {
  const [values, setStateValues] = useState(initialValues);
  const [errors, setErrors] = useState(setAll(initialValues, ""));
  const [touched, setTouched] = useState(setAll(initialValues, true));
  const [isSubmitting, setSubmitting] = useState(false);

  const setFieldValue = useCallback(
    async (name, value) => {
      const newValues = {
        ...values,
        [name]: value
      };
      await setStateValues(newValues);
      if (validate && validateOnChange) {
        const validateError = validate(newValues);
        setErrors({
          ...validateError
        });
      }
    },
    [values, validate, validateOnChange]
  );

  const setValues = useCallback(
    async newValues => {
      await setStateValues(newValues);
      if (validate && validateOnChange) {
        const validateError = validate(newValues);
        setErrors({
          ...validateError
        });
      }
    },
    [setStateValues, validate, validateOnChange]
  );

  const handleSubmit = useCallback(
    async e => {
      e.persist();
      e.preventDefault();
      setSubmitting(true);
      await onSubmit(values, { setSubmitting });
    },
    [onSubmit, values]
  );

  const handleChange = useCallback(
    async e => {
      e.persist();
      const {
        target: { value, name }
      } = e;
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    e => {
      e.persist();
      const {
        target: { name }
      } = e;
      setTouched({
        ...touched,
        [name]: true
      });
    },
    [touched]
  );

  return children({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    isSubmitting
  });
};

export default Former;

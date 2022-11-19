import { useState } from 'react';

export const useForm = (intialForm = {}) => {
  const [formState, setFormState] = useState(intialForm);

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => setFormState(intialForm);

  return {
    formState,
    ...formState,
    onInputChange,
    onResetForm,
  };
};

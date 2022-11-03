import { useState } from 'react';

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setinputValue] = useState();

  const onInputChange = (event) => {
    setinputValue(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const valueParsed = inputValue.trim();
    if (!valueParsed.length) return;
    /*
    -- Use father state function --
    setCategories((categories) => [valueParsed, ...categories]);
    */
    // Create a son prop that emits value
    onNewCategory(valueParsed);
    setinputValue('');
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Search gifs"
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};

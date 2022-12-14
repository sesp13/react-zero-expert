import { useState } from 'react';
import PropTypes from 'prop-types';

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setinputValue] = useState('');

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
    <form onSubmit={onSubmitForm} aria-label="form">
      <input
        type="text"
        placeholder="Search gifs"
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};

AddCategory.propTypes = {
  onNewCategory: PropTypes.func.isRequired,
};

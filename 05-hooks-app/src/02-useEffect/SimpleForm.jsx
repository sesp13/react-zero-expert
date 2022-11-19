import { useState, useEffect } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    username: 'strider',
    email: 'strider@email.com',
  });

  const { username, email } = formState;

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    // console.log('useEffect!!!!!');
  }, []);

  useEffect(() => {
    // console.log('FormState changed!');
  }, [formState]);

  useEffect(() => {
    // console.log('Email changed!');
  }, [email]);

  return (
    <>
      <h1>Simple form</h1>
      <hr />
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        type="email"
        className="form-control mt-2"
        placeholder="user@user.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      {username === 'strider2' && <Message />}
    </>
  );
};

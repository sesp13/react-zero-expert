import { useForm } from '../hooks/useForm';

const initialValue = { username: '', email: '', password: '' };

export const FormWithCustomHook = () => {
  const { username, email, password, onInputChange, onResetForm } = useForm(initialValue);

  return (
    <>
      <h1>Form with custom Hook</h1>
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
      <input
        type="password"
        className="form-control mt-2"
        placeholder="Your password"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <button className='btn btn-primary mt-3' onClick={onResetForm}>Reset</button>

    </>
  );
};

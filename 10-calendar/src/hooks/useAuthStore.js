import { useSelector, useDispatch } from 'react-redux';
import { calendarApi } from '../api';
import { clearAuthErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        clearAuthErrorMessage();
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Error on register';
      dispatch(onLogout(errorMessage));
      setTimeout(() => {
        clearAuthErrorMessage();
      }, 10);
    }
  };

  return {
    // properties
    status,
    user,
    errorMessage,
    // methods
    startLogin,
    startRegister,
  };
};

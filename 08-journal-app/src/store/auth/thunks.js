import { async } from '@firebase/util';
import {
  registerUserWithEmailPassword,
  loginWithEmailAndPassword,
  signInWithGoogle,
  logoutFirebase,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) {
      dispatch(logout(result.errorMessage));
      return;
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, errorMessage, photoURL } =
      await registerUserWithEmailPassword({
        email,
        displayName,
        password,
      });

    if (!ok) {
      dispatch(logout({ errorMessage }));
      return;
    }

    dispatch(
      login({
        uid,
        displayName,
        email,
        photoURL,
      })
    );
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, photoURL, uid, displayName, errorMessage } =
      await loginWithEmailAndPassword({ email, password });

    if (!ok) {
      dispatch(logout({ errorMessage }));
      return;
    }

    dispatch(
      login({
        uid,
        displayName,
        email,
        photoURL,
      })
    );
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
    dispatch(clearNotesLogout());
  };
};

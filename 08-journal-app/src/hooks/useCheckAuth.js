import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from "../store/auth";
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        dispatch(logout());
        return;
      }
      const { email, photoURL, uid, displayName } = user;
      dispatch(login ({ email, photoURL, uid, displayName }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};

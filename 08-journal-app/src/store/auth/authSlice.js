import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from './authStatus';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: AuthStatus.checking, // 'not-authenticated' 'authenticated' 'checking'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = AuthStatus.authenticated;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = AuthStatus.notAuthenticated;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage ?? null;
    },
    checkingCredentials: (state) => {
      state.status = AuthStatus.checking;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;

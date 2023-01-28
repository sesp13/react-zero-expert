import { AuthStatus } from '../../src/store/auth/authStatus';

export const demoUser = {
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'http://demo.jpg',
};

export const initialState = {
  status: AuthStatus.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: AuthStatus.authenticated,
  uid: demoUser.uid,
  email: demoUser.email,
  displayName: demoUser.displayName,
  photoURL: demoUser.photoURL,
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: AuthStatus.notAuthenticated,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

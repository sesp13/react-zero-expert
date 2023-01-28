import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import { AuthStatus } from '../../../src/store/auth/authStatus';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('Tests on authSlice', () => {
  test('should return the initial state and should be named "auth"', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });

  test('should perform the login action', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });

  test('should perform the logout action', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('should perform the logout action with an error message', () => {
    const errorMessage = 'Incorrect credentials';
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('should change the state to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe(AuthStatus.checking);
  });
});

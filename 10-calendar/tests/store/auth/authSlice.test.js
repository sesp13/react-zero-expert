import {
  authSlice,
  clearAuthErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import { notAuthenticatedState } from '../../fixtures/authStates';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Tests on authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('should perform a login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('should perform a logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });

  test('should perform a logout with a message', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    });
  });

  test('should clear the error message', () => {
    const baseState = {
      ...notAuthenticatedState,
      errorMessage: 'There is an error',
    };
    const state = authSlice.reducer(
      notAuthenticatedState,
      clearAuthErrorMessage()
    );
    expect(state).toEqual(notAuthenticatedState);
  });
});

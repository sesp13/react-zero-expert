import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Tests on useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should return the defaultValues', () => {
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: initialState.status,
      user: initialState.user,
      errorMessage: initialState.errorMessage,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('startLogin should perform the login correctly', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      ...authenticatedState,
      user,
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin should fail the authentication', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: 'not-valid',
        password: '123123',
      });
    });

    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      user: {},
      status: notAuthenticatedState.status,
    });

    waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test('startRegister should create a user', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const newUser = {
      email: 'not-valid',
      password: '123123',
      name: 'My test user',
    };
    const mockResponse = {
      data: {
        ok: true,
        uid: 'id',
        name: newUser.name,
        token: 'thisisatoken',
      },
    };
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue(mockResponse);

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      user: { uid: mockResponse.data.uid, name: mockResponse.data.name },
      status: authenticatedState.status,
    });

    spy.mockRestore();
  });
});

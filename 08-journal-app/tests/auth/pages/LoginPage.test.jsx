import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockedStartGoogleSignIn = jest.fn();
const mockedStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockedStartGoogleSignIn,
  startLoginWithEmailAndPassword:
    ({ email, password }) =>
    () =>
      mockedStartLoginWithEmailAndPassword({ email, password }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Tests on <LoginPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Google button should call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByLabelText('google-btn');
    fireEvent.click(googleButton);
    expect(mockedStartGoogleSignIn).toHaveBeenCalled();
  });

  test('submit should call startLoginWithEmailAndPassword with specific values', () => {
    const email = 'email@email.com';
    const password = 'password123';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByLabelText('password-input');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const form = screen.getByLabelText('login-form');
    fireEvent.submit(form);

    expect(mockedStartLoginWithEmailAndPassword).toHaveBeenLastCalledWith({
      email,
      password,
    });
  });
});

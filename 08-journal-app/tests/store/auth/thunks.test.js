import {
  loginWithEmailAndPassword,
  logoutFirebase,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

// Providers mock
jest.mock('../../../src/firebase/providers');

describe('Tests on Auth Thunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should invoke checking credentials', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn should call checking credentials and login - success case', async () => {
    // Mocks
    const mockData = { ok: true, ...demoUser };
    await signInWithGoogle.mockReturnValue(mockData);

    // Test
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(mockData));
  });

  test('startGoogleSignIn should call checking credentials and logout - fail case', async () => {
    // Mocks
    const mockData = { ok: false, errorMessage: 'Fail on google sign in' };
    await signInWithGoogle.mockReturnValue(mockData);

    // Test
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: mockData.errorMessage })
    );
  });

  test('startLoginWithEmailAndPassword should call checkingCredentials and login - success case', async () => {
    const mockData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123123' };
    loginWithEmailAndPassword.mockReturnValue(mockData);

    await startLoginWithEmailAndPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startLoginWithEmailAndPassword should call checkingCredentials and logout - fail case', async () => {
    const mockData = { ok: false, errorMessage: 'Error on login' };
    const formData = { email: demoUser.email, password: '123123' };
    loginWithEmailAndPassword.mockReturnValue(mockData);

    await startLoginWithEmailAndPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: mockData.errorMessage })
    );
  });

  test('startLogout should call logout and clearNotesLogout', async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
  });
});

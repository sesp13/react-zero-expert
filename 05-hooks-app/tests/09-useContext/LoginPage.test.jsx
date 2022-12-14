import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { LoginPage } from '../../src/09-useContext/LoginPage';

describe('Tests on <LoginPage />', () => {
  const setUserMock = jest.fn();

  test('should show the component without the user', () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText('pre');
    expect(preTag.innerHTML).toBe('null');
  });

  test('should call the setUser when the button is clicked', () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setUserMock).toHaveBeenCalledWith({ name: 'Juan', id: 1 });
  });
});

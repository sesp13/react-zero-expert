import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests on <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: { id: 'ABC', name: 'Santiago' },
    logout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the user name', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });

  test('should call the logout when the button is clicked', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});

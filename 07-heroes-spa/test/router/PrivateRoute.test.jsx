import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Tests on <PrivateRoute />', () => {
  test('should show the children if not authenticated', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: { name: 'Santiago', id: 'ABC' },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Private route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

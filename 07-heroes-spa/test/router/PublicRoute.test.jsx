import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('tests on <PublicRoute />', () => {
  test('should show the children if not authenticated', () => {
    const contextValue = { logged: false };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public route')).toBeTruthy();
  });

  test('should navigate if authenticated', () => {
    const contextValue = {
      logged: true,
      user: { name: 'Santiago', id: 'ABC' },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel')).toBeTruthy();
  });
});

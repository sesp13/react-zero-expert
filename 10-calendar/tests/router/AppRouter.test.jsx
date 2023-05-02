import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import {
  authenticatedState,
  notAuthenticatedState,
} from '../fixtures/authStates';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe('Tests on <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call the loading screen and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'checking',
    });
    render(<AppRouter />);
    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText('Loading')).toBeTruthy();
  });

  test('should show login if not authenticated', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: notAuthenticatedState.status,
    });
    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Ingreso'));
    expect(container).toMatchSnapshot();
  });

  test('should show the calendar if authenticated', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: 'checking',
    });
    render(<AppRouter />);
    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText('Loading')).toBeTruthy();
  });

  test('should show login if not authenticated', () => {
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: authenticatedState.status,
    });
    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});

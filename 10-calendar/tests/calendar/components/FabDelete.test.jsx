import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');

describe('Tests on FabDelete', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the component correctly', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');
    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
    expect(btn.style.display).toBe('none');
  });

  test('should render the button if there is an event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');
    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
    expect(btn.style.display).toBe('');
  });

  test('should call startDeletingEvent', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});

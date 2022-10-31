import { fireEvent, render, screen } from '@testing-library/react';
import { CounterApp } from '../src/CounterApp';

describe('Tests on <CounterApp />', () => {
  const initialValue = 100;

  test('should match with the snapshot', () => {
    const { container } = render(<CounterApp />);
    expect(container).toMatchSnapshot();
  });

  test('should contain the value of 100', () => {
    render(<CounterApp value={initialValue} />);
    expect(screen.getByText(initialValue)).toBeTruthy();
  });
  
  test('should increment with +1 button', () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText('+1'));
    expect(screen.getByText(initialValue + 1)).toBeTruthy();
  });
  
  test('should decrement with -1 button', () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText('-1'));
    // screen.debug();
    expect(screen.getByText(initialValue - 1)).toBeTruthy();
  });
  
  test('reset button should work', () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('+1'));
    
    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }));
    expect(screen.getByText(initialValue)).toBeTruthy();
  });
});

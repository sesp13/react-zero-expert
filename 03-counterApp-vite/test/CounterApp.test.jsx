import { render } from '@testing-library/react';
import { CounterApp } from '../src/CounterApp';

describe('Tests on <CounterApp />', () => {
  test('should match with the snapshot', () => {
    const { container } = render(<CounterApp />);
    expect(container).toMatchSnapshot();
  });

  test('should contain the value of 100', () => {});
});

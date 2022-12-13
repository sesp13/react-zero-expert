import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';
import { useCounter } from '../../src/hooks/useCounter';
import { useFetch } from '../../src/hooks/useFetch';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Tests on <MultipleCustomHooks />', () => {
  const incrementMock = jest.fn();
  useCounter.mockReturnValue({ increment: incrementMock, counter: 1 });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the default component', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHooks />);
    expect(screen.getByText('Loading'));
    expect(screen.getByText('Breaking bad quotes'));
    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    expect(nextButton.disabled).toBeTruthy();
    // screen.debug();
  });

  test('should show a quote', () => {
    useFetch.mockReturnValue({
      data: [
        {
          author: 'Fernando',
          quote: 'Hello world',
        },
      ],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);
    expect(screen.getByText('Hello world')).toBeTruthy();
    expect(screen.getByText('Fernando')).toBeTruthy();

    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    expect(nextButton.disabled).toBeFalsy();
    // screen.debug();
  });

  test('should call increment()', () => {
    useFetch.mockReturnValue({
      data: [
        {
          author: 'Fernando',
          quote: 'Hello world',
        },
      ],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);
    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    fireEvent.click(nextButton);
    expect(incrementMock).toHaveBeenCalled();
  });
});

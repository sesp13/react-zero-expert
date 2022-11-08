import { fireEvent, render, screen } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

describe('Tests on <AddCategory />', () => {
  test('should change the value on the text box', () => {
    render(<AddCategory onNewCategory={() => {}} />);
    const input = screen.getByRole('textbox');
    const text = 'Saitama';
    fireEvent.input(input, {
      target: {
        value: text
      },
    });
    expect(input.value).toBe(text);
  });
});

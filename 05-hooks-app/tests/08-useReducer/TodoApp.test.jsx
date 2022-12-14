import { render, screen } from '@testing-library/react';
import { useTodos } from '../../src/08-useReducer/hooks/useTodos';
import { TodoApp } from '../../src/08-useReducer/TodoApp';

jest.mock('../../src/08-useReducer/hooks/useTodos');

describe('Tests on <TodoApp />', () => {
  test('should show the component correctly', () => {
    useTodos.mockReturnValue({
      todos: [
        { id: 1, description: 'My First todo', done: false },
        { id: 2, description: 'My Second todo', done: true },
      ],
      todosCount: 2,
      pendingCount: 1,
      handleNewTodo: jest.fn(),
      handleRemoveTodo: jest.fn(),
      handleToggleTodo: jest.fn(),
    });

    render(<TodoApp />);
    expect(screen.getByText('My First todo')).toBeTruthy();
    expect(screen.getByText('My Second todo')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
  });
});

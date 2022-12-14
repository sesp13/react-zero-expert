import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from '../../src/08-useReducer/TodoItem';

describe('tests on <TodoItem />', () => {
  const todo = {
    id: 1,
    description: 'Soul gem',
    done: false,
  };
  const onRemoveTodoMock = jest.fn();
  const onToggleTodoMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the pending todo', () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggleTodoMock}
        onRemove={onRemoveTodoMock}
      />
    );

    const liElement = screen.getByRole('listitem');
    expect(liElement.className).toBe(
      'list-group-item d-flex justify-content-between'
    );

    const spanElement = screen.getByLabelText('span');
    expect(spanElement.className).toContain('align-self-center');
    expect(spanElement.className).not.toContain('text-decoration-line-through');
  });

  test('should show the completed todo', () => {
    todo.done = true;

    render(
      <TodoItem
        todo={todo}
        onToggle={onToggleTodoMock}
        onRemove={onRemoveTodoMock}
      />
    );
    const spanElement = screen.getByLabelText('span');
    expect(spanElement.className).toContain('text-decoration-line-through');
  });

  test('the span should call ToggleTodo when clicked', () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggleTodoMock}
        onRemove={onRemoveTodoMock}
      />
    );

    const spanElement = screen.getByLabelText('span');
    fireEvent.click(spanElement);
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
  });

  test('the Button should call RemoveTodo when clicked', () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggleTodoMock}
        onRemove={onRemoveTodoMock}
      />
    );

    const deleteBtn = screen.getByRole('button');
    fireEvent.click(deleteBtn);
    expect(onRemoveTodoMock).toHaveBeenCalledWith(todo.id);
  });
});

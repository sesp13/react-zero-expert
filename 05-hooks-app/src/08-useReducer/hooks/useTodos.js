import { useEffect, useReducer } from 'react';
import { todoReducer } from '../todoReducer';

const initialState = [];
const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodos = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = { type: '[TODO] Add Todo', payload: todo };
    dispatchTodo(action);
  };

  const handleRemoveTodo = (id) => {
    const action = { type: '[TODO] Remove Todo', payload: id };
    dispatchTodo(action);
  };

  const handleToggleTodo = (id) => {
    const action = { type: '[TODO] Toggle Todo', payload: id };
    dispatchTodo(action);
  };

  const todosCount = todos.length;
  const pendingCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    todosCount,
    pendingCount,
    dispatchTodo,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
  };
};

import { useForm } from '../hooks/useForm';

export const TodoAdd = ({ onNewTodo }) => {
  const { description, onInputChange, onResetForm } = useForm({
    description: '',
  });

  const onSubmitTodo = (event) => {
    event.preventDefault();
    if (description.length < 1) return;
    const newTodo = { id: new Date().getTime(), description, done: false };
    onNewTodo(newTodo);
    onResetForm();
  };

  return (
    <form onSubmit={onSubmitTodo}>
      <input
        name="description"
        value={description}
        type="text"
        placeholder="What should be done?"
        className="form-control"
        onChange={onInputChange}
      />
      <button type="submit" className="btn btn-outline-primary mt-3">
        Add
      </button>
    </form>
  );
};

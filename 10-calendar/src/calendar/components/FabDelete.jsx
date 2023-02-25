import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return hasEventSelected ? (
    <button onClick={handleDelete} className="btn btn-danger fab fab-danger">
      <i className="fas fa-trash-alt"></i>
    </button>
  ) : (
    <></>
  );
};

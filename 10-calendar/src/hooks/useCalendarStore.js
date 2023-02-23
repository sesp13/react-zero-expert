import { useSelector } from 'react-redux';

export const useCalendarStore = () => {
  const { events } = useSelector((store) => store.calendar);

  return {
    events,
  };
};

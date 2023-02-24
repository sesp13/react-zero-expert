import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSelectActiveEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((store) => store.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSelectActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO Backend

    if (calendarEvent._id) {
      // Update
    } else {
      // Creation
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent
  };
};

import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSelectActiveEvent,
  onLoadEvents,
  onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((store) => store.calendar);
  const { user } = useSelector((store) => store.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSelectActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        // Update
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        // Creation
        const { data } = await calendarApi.post('/events', calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error during saving', error.response.data?.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error during saving', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};

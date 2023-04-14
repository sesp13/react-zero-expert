import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventsStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    // console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleCLick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        culture="es"
        messages={getMessagesES()}
        eventPropGetter={eventsStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleCLick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

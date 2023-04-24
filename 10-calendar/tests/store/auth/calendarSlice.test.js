import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSelectActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Tests on calendarSlice', () => {
  test('should return the default state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSelectActiveEvent should activate the event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onSelectActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent should add an event', () => {
    const newEvent = {
      id: '3',
      start: new Date('2022-10-25', '13:00:00'),
      end: new Date('2022-10-25', '15:00:00'),
      title: 'Hi my bro',
      notes: 'What do you think!',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent should update an event', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2022-10-25', '13:00:00'),
      end: new Date('2022-10-25', '15:00:00'),
      title: 'Hi my bro',
      notes: 'What do you think!',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent should delete the active event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
  });

  test('onLoadEvents should stablish the events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(newState.events.length).toBe(events.length);
  });

  test('onLogoutCalendar should clear the state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});

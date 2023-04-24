export const events = [
  {
    id: '1',
    start: new Date('2022-10-21', '13:00:00'),
    end: new Date('2022-10-21', '15:00:00'),
    title: 'Boss Birthday',
    notes: 'We must buy a cake!',
  },
  {
    id: '2',
    start: new Date('2022-10-21', '13:00:00'),
    end: new Date('2022-10-21', '15:00:00'),
    title: "Melissa's Birthday",
    notes: 'I love you Melissa',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] },
};

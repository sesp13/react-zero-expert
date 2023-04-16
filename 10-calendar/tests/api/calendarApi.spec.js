import calendarApi from '../../src/api/calendarApi';

describe('Tests on CalendarApi', () => {
  test('It should have the deafult config', () => {
    // console.log(calendarApi);
    // console.log(process.env)
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });
});

import calendarApi from '../../src/api/calendarApi';

describe('Tests on CalendarApi', () => {
  test('It should have the default config', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('should attach x-token in the header of all requests', async () => {
    const token = '123456';
    localStorage.setItem('token', token);
    const res = await calendarApi
      .get('/auth')
      .then((res) => res)
      .catch((err) => err);
    expect(res.config.headers['x-token']).toBe(token);
  });
});

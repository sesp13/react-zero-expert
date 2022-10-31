import { getUser } from '../../src/base-pruebas/11-async-await';

describe('Tests on 11-async-await.js', () => {
  test('getUser should return data', async () => {
    const id = 2;
    const user = await getUser(id);
    expect(user).toBeTruthy();
    expect(user.id).toBe(id);
  });

  test('getUser should throw an error if not exists', async () => {
    try {
      const id = 599;
      await getUser(id);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.message).toBe('Not found');
    }
  });
});

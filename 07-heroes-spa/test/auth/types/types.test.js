import { types } from '../../../src/auth';

describe('Tests on auth types', () => {
  test('should return these types', () => {
    expect(types).toEqual({ login: '[Auth] Login', logout: '[Auth] Logout' });
  });
});

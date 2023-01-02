import { authReducer, types } from '../../../src/auth';

describe('Tests on authReducer', () => {
  const intialState = { logged: false };
  const user = { id: 'ABC', name: 'John' };

  test('should return the default state', () => {
    const state = authReducer(intialState, {});
    expect(state).toEqual(intialState);
  });

  test('should login and stablish the user', () => {
    const action = { type: types.login, payload: user };
    const state = authReducer({}, action);
    const expectedState = { logged: true, user };
    expect(state).toEqual(expectedState);
  });

  test('should logout and delete the user', () => {
    const action = { type: types.logout };
    const state = authReducer({ user, logged: true }, action);
    const expectedState = { logged: false, user: null };
    expect(state).toEqual(expectedState);
  });
});

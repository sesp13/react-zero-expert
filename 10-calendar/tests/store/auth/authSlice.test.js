import { authSlice } from '../../../src/store/auth/authSlice';
import { initialState } from '../../fixtures/authStates';

describe('Tests on authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
});

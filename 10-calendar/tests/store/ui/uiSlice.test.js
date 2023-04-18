import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from '../../../src/store/ui/uiSlice';

describe('Tests on Ui Slice', () => {
  test('should return the default state', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test('should change isDateModalOpen correctly', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});

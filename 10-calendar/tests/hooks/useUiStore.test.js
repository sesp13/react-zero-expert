import { act, renderHook } from '@testing-library/react';
import { useUiStore } from '../../src/hooks/useUiStore';
import { Provider } from 'react-redux';
import { uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('Tests on useUiStore', () => {
  test('should return the default values', () => {
    const initialState = { isDateModalOpen: true };
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children} </Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: initialState.isDateModalOpen,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test('openDateModal should put true in isDateModalOpen', () => {
    const initialState = { isDateModalOpen: true };
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children} </Provider>
      ),
    });

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeDateModal should set false isDateModalOpen', () => {
    const initialState = { isDateModalOpen: true };
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children} </Provider>
      ),
    });

    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test('toggleDateModal should change the state respectively', () => {
    const initialState = { isDateModalOpen: true };
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children} </Provider>
      ),
    });

    act(() => {
      result.current.toggleDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => {
      result.current.toggleDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});

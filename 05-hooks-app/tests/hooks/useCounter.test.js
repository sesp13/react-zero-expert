import { act, renderHook } from '@testing-library/react';
import { useCounter } from '../../src/hooks/useCounter';

describe('tests on useCounter', () => {
  test('should return the default values', () => {
    const { result } = renderHook(() => useCounter());
    const { counter, increment, decrement, reset } = result.current;

    expect(counter).toBe(10);
    expect(decrement).toEqual(expect.any(Function));
    expect(increment).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });

  test('should generate the counter with an specific value', () => {
    const value = 100;
    const { result } = renderHook(() => useCounter(value));
    const { counter } = result.current;
    expect(counter).toBe(value);
  });

  test('should increment the counter', () => {
    const { result } = renderHook(() => useCounter());
    const { increment } = result.current;
    act(() => {
      increment();
      increment(2);
    });
    expect(result.current.counter).toBe(13);
  });

  test('should decrement the counter', () => {
    const { result } = renderHook(() => useCounter());
    const { decrement } = result.current;
    act(() => {
      decrement();
    });
    expect(result.current.counter).toBe(9);
  });

  test('should reset the counter', () => {
    const { result } = renderHook(() => useCounter());
    const { reset, increment } = result.current;
    act(() => {
      increment();
      reset();
    });
    expect(result.current.counter).toBe(10);
  });
});

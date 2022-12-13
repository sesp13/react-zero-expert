import { act, renderHook } from '@testing-library/react';
import { useForm } from '../../src/hooks/useForm';

describe('tests on useForm', () => {
  const initialForm = {
    name: 'Fernando',
    email: 'fernando@fernando.com',
  };

  test('should return the default values', () => {
    const { result } = renderHook(() => useForm(initialForm));

    expect(result.current).toEqual({
      ...initialForm,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });

  test('should change the form name', () => {
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    const newValue = 'John';
    act(() => {
      onInputChange({ target: { value: newValue, name: 'name' } });
    });

    expect(result.current.name).toBe(newValue);
    expect(result.current.formState.name).toBe(newValue);
  });

  test('should reset the form', () => {
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onResetForm } = result.current;

    const newValue = 'John';
    act(() => {
      onInputChange({ target: { value: newValue, name: 'name' } });
      onResetForm();
    });

    expect(result.current.name).toBe(initialForm.name);
    expect(result.current.formState.name).toBe(initialForm.name);
  });
});

import { retornaArreglo } from '../../src/base-pruebas/07-deses-arr';

describe('tests on 07-deses-arr.js', () => {
  test('should return a string and a number', () => {
    const [letters, numbers] = retornaArreglo();

    expect(letters).toBe('ABC');
    expect(numbers).toBe(123);

    expect(letters).toEqual(expect.any(String));
  });
});

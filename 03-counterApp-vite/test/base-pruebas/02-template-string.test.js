import { getSaludo } from '../../src/base-pruebas/02-template-string';

describe('Tests on 02-template-string.js', () => {
  test('getSaludo should return "Hola Mundo"', () => {
    const name = 'Mundo';
    const message = getSaludo(name);

    expect(message).toBe(`Hola ${name}`);
  });
});

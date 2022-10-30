import { usContext } from '../../src/base-pruebas/06-deses-obj';

describe('Tests on 06-deses-obj.js', () => {
  test('usContext should return an object', () => {
    const name = 'Saul Goodman';
    const age = 60;
    const user = usContext({ clave: name, edad: age });
    expect(user).toEqual({
      nombreClave: name,
      anios: age,
      latlng: {
        lat: 14.1232,
        lng: -12.3232,
      },
    });
  });
});

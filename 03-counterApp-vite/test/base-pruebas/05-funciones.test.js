import { getUser, getUsuarioActivo } from '../../src/base-pruebas/05-funciones';

describe('Tests on 05-funciones.js', () => {
  test('getUser should return an object', () => {
    const testUser = { uid: 'ABC123', username: 'El_Papi1502' };
    const user = getUser();

    expect(user).toEqual(testUser);
  });
  
  test('getUsuario activo should return an object', () => {
    const name = 'Santiago';
    const testUser = { uid: 'ABC567', username: name };
    const user = getUsuarioActivo(name);
    expect(user).toEqual(testUser);
  });
});

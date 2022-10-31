import { getHeroeByIdAsync } from '../../src/base-pruebas/09-promesas';

describe('Tests on 09-promesas.js', () => {
  test('getHeroeByIdAsync should return a hero', (done) => {
    const id = 1;
    getHeroeByIdAsync(id).then((hero) => {
      expect(hero).toEqual({
        id: 1,
        name: 'Batman',
        owner: 'DC',
      });

      // Async test call done
      done();
    });
  });

  test('getHeroeByIdAsync should return an error if not exists', (done) => {
    const id = 100;
    getHeroeByIdAsync(id).catch((error) => {
      const errorMessage = `No se pudo encontrar el héroe ${id}`;
      expect(error).toBe(errorMessage);
      done();
    });
  });
});

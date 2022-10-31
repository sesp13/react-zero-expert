import {
  getHeroeById,
  getHeroesByOwner,
} from '../../src/base-pruebas/08-imp-exp';
import heroesData from '../../src/data/heroes';

describe('Tests on 08-imp-exp.js', () => {
  test('getHeoreById should return a hero by ID', () => {
    const id = 1;
    const hero = getHeroeById(id);

    expect(hero).toEqual({
      id: 1,
      name: 'Batman',
      owner: 'DC',
    });
  });

  test('getHeoreById should return undefined if not exists', () => {
    const id = 100;
    const hero = getHeroeById(id);
    expect(hero).toBeFalsy();
  });

  test('getHeroesByOwner should return DC heroes', () => {
    const owner = 'DC';
    const heroes = getHeroesByOwner(owner);

    expect(heroes.length).toBe(3);
    expect(heroes).toEqual([
      {
        id: 1,
        name: 'Batman',
        owner: 'DC',
      },
      {
        id: 3,
        name: 'Superman',
        owner: 'DC',
      },
      {
        id: 4,
        name: 'Flash',
        owner: 'DC',
      },
    ]);

    expect(heroes).toEqual(heroesData.filter((hero) => hero.owner == owner));
  });
  
  test('getHeroesByOwner should return 2 Marvel heroes', () => {
    const owner = 'Marvel';
    const heroes = getHeroesByOwner(owner);
    
    expect(heroes.length).toBe(2);
    expect(heroes).toEqual(heroesData.filter((hero) => hero.owner == owner));
  });
});

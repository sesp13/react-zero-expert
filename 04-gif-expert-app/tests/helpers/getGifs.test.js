import { getGifs } from '../../src/helpers/getGifs';

describe('Tests on getGifs()', () => {
  const query = 'Mario';

  test('should return a gif array', async () => {
    const gifs = await getGifs(query);
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
      title: expect.any(String),
      id: expect.any(String),
      url: expect.any(String),
    });
  });
});

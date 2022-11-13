import { GifGrid } from '../../src/components/GifGrid';
import { render, screen } from '@testing-library/react';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Tests on <GifGrid />', () => {
  const category = 'One Punch';

  test('should show loading at the begining', () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });
    render(<GifGrid category={category} />);
    expect(screen.getByText('Loading...'));
    expect(screen.getByText(category));
  });

  test("should show items when useFecthGifs' images are loaded", () => {
    // This is also known as fixture
    const gifs = [
      {
        id: 'ABC',
        title: 'Saitama',
        url: 'http://localhost:3000/saitama.jpg',
      },
      {
        id: 'ABCD',
        title: 'One Puch 2',
        url: 'http://localhost:3000/one-punch-2.jpg',
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);
    expect(screen.getAllByRole('img').length).toBe(gifs.length);
  });
});

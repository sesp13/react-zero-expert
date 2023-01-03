import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests on <SearchPage />', () => {
  test('should show the default values correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('should show Batman and the input with the query string value', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

    const noResultDiv = screen.getByLabelText('no-result-div');
    expect(noResultDiv.style.display).toBe('none');
  });

  test('should show an error if the hero is not found (batman123)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const noResultDiv = screen.getByLabelText('no-result-div');
    expect(noResultDiv.style.display).not.toBe('none');
  });

  test('should call the navigate in the new screen', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: { name: 'searchText', value: 'superman' },
    });
    const submitForm = screen.getByRole('form');
    fireEvent.submit(submitForm);

    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
  });
});

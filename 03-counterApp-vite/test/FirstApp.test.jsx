import { render } from '@testing-library/react';
import { FirstApp } from '../src/FirstApp';

describe('Tests on <FirstApp />', () => {
  // test('it should match the snapshot', () => {
  //   const title = "Hello i'm saul";
  //   const { container } = render(<FirstApp title={title} />);
  //   expect(container).toMatchSnapshot();
  // });

  test('It should show the title on a h1 tag', () => {
    const title = "Hello i'm saul";
    const { container, getByText, getByTestId } = render(
      <FirstApp title={title} />
    );
    const h1 = container.querySelector('h1');
    expect(getByText(title)).toBeTruthy();
    expect(h1.innerHTML).toContain(title);
    expect(getByTestId('test-title').innerHTML).toBe(title);
  });

  test('It should show the subtitle sent by props', () => {
    const title = "Hello i'm saul";
    const subtitle = 'Call me now!';
    const { getAllByText } = render(
      <FirstApp title={title} subtitle={subtitle} />
    );
    expect(getAllByText(subtitle).length).toBe(2);
  });
});

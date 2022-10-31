import { render, screen } from '@testing-library/react';
import { FirstApp } from '../src/FirstApp';

describe('Tests on <FirstApp />', () => {
  const title = "Hello I'm Goku";
  const subtitle = 'The subtitle';

  test('it should match the snapshot', () => {
    const { container } = render(<FirstApp title={title}></FirstApp>);
    expect(container).toMatchSnapshot();
  });

  test(`it should show the message ${title}`, () => {
    render(<FirstApp title={title}></FirstApp>);
    expect(screen.getByText(title)).toBeTruthy();
    // see the object
    // screen.debug()
  });

  test('it should show the title on a h1 tag', () => {
    render(<FirstApp title={title}></FirstApp>);
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      title
    );
  });

  test('it should show the subtitle sent by props', () => {
    render(<FirstApp title={title} subtitle={subtitle}></FirstApp>);
    expect(screen.getAllByText(subtitle).length).toBe(2);
  });
});

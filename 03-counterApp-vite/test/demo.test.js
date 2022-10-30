describe('Tests on <DemoComponent />', () => {
  test('This test should not fail', () => {
    const message1 = 'Hello world';
    const message2 = message1.trim();

    expect(message1).toBe(message2);
  });
});

const add = (a, b) => {
  return a + b;
};

test("toBe", () => {
  expect(add(1, 2)).toBe(3);
});

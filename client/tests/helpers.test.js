import TestConstants from './TestConstants';
const helpers = require('../src/helpers');

test('null squares returns null', () => {
    expect(helpers.calculateWinner(null)).toBe(null)
})

test("not all tiles are uncovered", () => {
  expect(helpers.calculateWinner(TestConstants.noWinBoard)).toBe(false);
});

test("all tiles uncovered", () => {
  expect(helpers.calculateWinner(TestConstants.winningBoard)).toBe(true);
});
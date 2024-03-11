import { describe, test, expect, jest, afterEach } from "@jest/globals";

import { rollDice } from "./dice";

describe("rollDice function", () => {
  test("should return minimum value when random is 0", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    expect(rollDice(7, 6)).toBe(7);
  });

  test("should return a middle value when random is average", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    expect(rollDice(7, 6)).toBe(28);
  });

  test("should return maximum value when random is close to 1", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(rollDice(7, 6)).toBe(42);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

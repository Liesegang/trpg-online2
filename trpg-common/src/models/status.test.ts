import { describe, test, expect, jest } from "@jest/globals";

import { Status } from "./status";
import { Attribute } from "./attribute";

describe("Status class", () => {
  test("should be created with the given values", () => {
    const status = new Status(10, 20, 30, 40);
    expect(status.hp).toBe(10);
    expect(status.mp).toBe(20);
    expect(status.san).toBe(30);
    expect(status.luck).toBe(40);
  });

  test("should be created from the given attribute", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    const attribute = new Attribute({
      strength: 10,
      constitution: 20,
      size: 30,
      dexterity: 40,
      appearance: 50,
      education: 60,
      intelligence: 70,
      power: 80,
    });
    const status = Status.fromAttribute(attribute);
    expect(status.hp).toBe((20 + 30) / 10);
    expect(status.mp).toBe(80 / 5);
    expect(status.san).toBe(80);
    expect(status.luck).toBe(60);
  });

  test("should be reset with the given attribute", () => {
    const status = new Status(1, 2, 3, 4);
    const attribute = new Attribute({
      strength: 10,
      constitution: 20,
      size: 30,
      dexterity: 40,
      appearance: 50,
      education: 60,
      intelligence: 70,
      power: 80,
    });
    status.resetStatus(attribute);
    expect(status.hp).toBe((20 + 30) / 10);
    expect(status.mp).toBe(80 / 5);
    expect(status.san).toBe(3); // Do not reset SAN
    expect(status.luck).toBe(4); // Do not reset luck
  });
});

import { describe, test, expect } from "@jest/globals";

import { Attribute } from "./attribute";

describe("Attribute class", () => {
  test("idea returns the value of intelligence", () => {
    const attribute = new Attribute({
      strength: 0,
      constitution: 0,
      size: 0,
      dexterity: 0,
      appearance: 0,
      education: 0,
      intelligence: 80,
      power: 0,
    });
    expect(attribute.idea).toBe(80);
  });

  test("knowledge returns the value of education", () => {
    const attribute = new Attribute({
      strength: 0,
      constitution: 0,
      size: 0,
      dexterity: 0,
      appearance: 0,
      education: 90,
      intelligence: 0,
      power: 0,
    });
    expect(attribute.knowledge).toBe(90);
  });

  test.each([
    [60, 80, 8], // dexterity < size, strength > size
    [80, 90, 9], // dexterity > size, strength > size
    [50, 60, 7], // dexterity < size, strength < size
    [70, 70, 8], // dexterity = strength = size
  ])(
    "moveRate for dexterity %i and strength %i is %i",
    (dex, str, expectedMoveRate) => {
      const attribute = new Attribute({
        strength: str,
        constitution: 0,
        size: 70,
        dexterity: dex,
        appearance: 0,
        education: 0,
        intelligence: 0,
        power: 0,
      });
      expect(attribute.moveRate).toBe(expectedMoveRate);
    }
  );

  test.each([
    [1, 1, -2], // strength + size < 65
    [32, 32, -2], // strength + size < 65
    [32, 33, -1], // 65 <= strength + size < 85
    [42, 42, -1], // 65 <= strength + size < 85
    [42, 43, 0], // 85 <= strength + size < 125
    [62, 62, 0], // 85 <= strength + size < 125
    [62, 63, 1], // 85 <= strength + size < 125
    [82, 82, 1], // 125 <= strength + size < 165
    [82, 83, 2], // 165 <= strength + size < 205
    [102, 102, 2], // 165 <= strength + size < 205
    [102, 103, 3], // 205 <= strength + size < 285
    [222, 222, 5], // 365 <= strength + size < 445
    [222, 223, 6], // 445 <= strength + size >= 524
  ])("build for strength %i and size %i is %i", (str, siz, expectedBuild) => {
    const attribute = new Attribute({
      strength: str,
      constitution: 0,
      size: siz,
      dexterity: 0,
      appearance: 0,
      education: 0,
      intelligence: 0,
      power: 0,
    });
    expect(attribute.build).toBe(expectedBuild);
  });

  test.each([
    [1, 1, "-2"], // strength + size < 65
    [32, 32, "-2"], // strength + size < 65
    [32, 33, "-1"], // 65 <= strength + size < 85
    [42, 42, "-1"], // 65 <= strength + size < 85
    [42, 43, "0"], // 85 <= strength + size < 125
    [62, 62, "0"], // 85 <= strength + size < 125
    [62, 63, "+1D4"], // 85 <= strength + size < 125
    [82, 82, "+1D4"], // 125 <= strength + size < 165
    [82, 83, "+1D6"], // 165 <= strength + size < 205
    [102, 102, "+1D6"], // 165 <= strength + size < 205
    [102, 103, "+2D6"], // 205 <= strength + size < 285
    [222, 222, "+4D6"], // 365 <= strength + size < 445
    [222, 223, "+5D6"], // 445 <= strength + size >= 524
  ])(
    "damageBonus for strength %i and size %i is %s",
    (str, siz, expectedDamageBonus) => {
      const attribute = new Attribute({
        strength: str,
        constitution: 0,
        size: siz,
        dexterity: 0,
        appearance: 0,
        education: 0,
        intelligence: 0,
        power: 0,
      });
      expect(attribute.damageBonus).toBe(expectedDamageBonus);
    }
  );
});

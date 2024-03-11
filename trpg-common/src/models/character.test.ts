import { describe, test, expect, jest } from "@jest/globals";

import { Character } from "./character";

import { Attribute } from "./attribute";

describe("Character class", () => {
  test("props returns the value of corresponding props", () => {
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
    const character = new Character("name", "ruby", attribute, "thumbnailUrl");
    expect(character.name).toBe("name");
    expect(character.ruby).toBe("ruby");
    expect(character.thumbnailUrl).toBe("thumbnailUrl");

    expect(character.strength).toBe(10);
    expect(character.constitution).toBe(20);
    expect(character.size).toBe(30);
    expect(character.dexterity).toBe(40);
    expect(character.appearance).toBe(50);
    expect(character.education).toBe(60);
    expect(character.intelligence).toBe(70);
    expect(character.power).toBe(80);
    expect(character.idea).toBe(70);
    expect(character.knowledge).toBe(60);
    expect(character.moveRate).toBe(8);
    expect(character.build).toBe(-2);
    expect(character.damageBonus).toBe("-2");
    expect(character.hp).toBe(5);
    expect(character.mp).toBe(16);
    expect(character.san).toBe(80);
    expect(character.luck).toBe(60);
  });


  test("resetStatus resets the status", () => {
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
    const character = new Character("name", "ruby", attribute, "thumbnailUrl");
    character.status.hp = 1;
    character.status.mp = 2;
    character.status.san = 3;
    character.status.luck = 4;
    character.resetStatus();
    expect(character.status.hp).toBe(5);
    expect(character.status.mp).toBe(16);
    expect(character.status.san).toBe(3);
    expect(character.status.luck).toBe(4);

    // Other fields are not changed
    expect(character.name).toBe("name");
    expect(character.ruby).toBe("ruby");
    expect(character.thumbnailUrl).toBe("thumbnailUrl");
    expect(character.attribute).toBe(attribute);
  });
});

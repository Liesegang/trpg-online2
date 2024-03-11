import { rollDice } from '../utils/dice';

import { Attribute } from './attribute';

export class Status {
  constructor(
    public hp: number,
    public mp: number,
    public san: number,
    public luck: number
  ) {}

  static fromAttribute(attribute: Attribute): Status {
    const hp = Math.floor((attribute.size + attribute.constitution) / 10);
    const mp = Math.floor(attribute.power / 5);
    const san = attribute.power;
    const luck = rollDice(3, 6) * 5;
    return new Status(hp, mp, san, luck);
  }

  resetStatus(attribute: Attribute): void {
    this.hp = Math.floor((attribute.size + attribute.constitution) / 10);
    this.mp = Math.floor(attribute.power / 5);
  }
}

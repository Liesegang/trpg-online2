import { Attribute } from "./attribute";
import { Status } from "./status";

export class Character {
  public status: Status;

  constructor(
    public name: string,
    public ruby: string,
    public attribute: Attribute,
    public thumbnailUrl: string
  ) {
    this.status = Status.fromAttribute(attribute);
  }

  resetStatus(): void {
    this.status.resetStatus(this.attribute);
  }

  get strength(): number {
    return this.attribute.strength;
  }

  get constitution(): number {
    return this.attribute.constitution;
  }

  get size(): number {
    return this.attribute.size;
  }

  get dexterity(): number {
    return this.attribute.dexterity;
  }

  get appearance(): number {
    return this.attribute.appearance;
  }

  get education(): number {
    return this.attribute.education;
  }

  get intelligence(): number {
    return this.attribute.intelligence;
  }

  get power(): number {
    return this.attribute.power;
  }

  get moveRate(): number {
    return this.attribute.moveRate;
  }

  get build(): number {
    return this.attribute.build;
  }

  get damageBonus(): string {
    return this.attribute.damageBonus;
  }

  get idea(): number {
    return this.attribute.idea;
  }

  get knowledge(): number {
    return this.attribute.knowledge;
  }

  get hp(): number {
    return this.status.hp;
  }

  get mp(): number {
    return this.status.mp;
  }

  get san(): number {
    return this.status.san;
  }

  get luck(): number {
    return this.status.luck;
  }
}

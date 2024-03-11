export class Attribute {
  public strength: number;
  public constitution: number;
  public size: number;
  public dexterity: number;
  public appearance: number;
  public education: number;
  public intelligence: number;
  public power: number;

  constructor(
    args: {
      strength: number;
      constitution: number;
      size: number;
      dexterity: number;
      appearance: number;
      education: number;
      intelligence: number;
      power: number;
    }

  ) {
    this.strength = args.strength;
    this.constitution = args.constitution;
    this.size = args.size;
    this.dexterity = args.dexterity;
    this.appearance = args.appearance;
    this.education = args.education;
    this.intelligence = args.intelligence;
    this.power = args.power;
  }

  get idea(): number {
    return this.intelligence;
  }

  get knowledge(): number {
    return this.education;
  }

  get moveRate(): number {
    if (this.dexterity < this.size && this.strength < this.size) {
      return 7;
    } else if (this.strength > this.size && this.dexterity > this.size) {
      return 9;
    } else {
      return 8;
    }
  }

  get build(): number {
    const total = this.strength + this.size;

    if (total < 65) {
      return -2;
    } else if (total < 85) {
      return -1;
    } else if (total < 125) {
      return 0;
    } else if (total < 165) {
      return 1;
    } else if (total < 205) {
      return 2;
    } else {
      return Math.floor((total - 205) / 80) + 3;
    }
  }

  get damageBonus(): string {
    const total = this.strength + this.size;
    if (total < 65) {
      return "-2";
    } else if (total < 85) {
      return "-1";
    } else if (total < 125) {
      return "0";
    } else if (total < 165) {
      return "+1D4";
    } else if (total < 205) {
      return "+1D6";
    } else {
      const rolls = Math.floor((total - 205) / 80) + 2;
      return `+${rolls}D6`;
    }
  }
}
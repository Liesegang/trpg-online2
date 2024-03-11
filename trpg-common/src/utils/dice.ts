export function rollDice(n: number, m: number): number {
  return Array.from({ length: n }).reduce((acc: number) => acc + Math.floor(Math.random() * m) + 1, 0);
}

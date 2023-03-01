export function generateRecovery(): number {
  const initial = [1, 1, 1, 1, 1, 1, 1, 1];
  return parseInt(
    initial.map((value) => value * Math.floor(Math.random() * 10)).join(''),
    10,
  );
}

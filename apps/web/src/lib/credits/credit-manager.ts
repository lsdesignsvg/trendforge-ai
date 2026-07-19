export function canUseAI(credits: number) {
  return credits > 0;
}

export function consumeCredit(credits: number) {
  return credits - 1;
}

export function calculateWinnings(
  amountBet: number,
  totalWinningBetAmount: number,
  totalBetAmount: number,
): number {
  const houseTax = 1 - 0.3;
  return (amountBet / totalWinningBetAmount) * totalBetAmount * houseTax;
}

export function calculateWinnings(
  amountBet: number,
  totalWinningBetAmount: number,
  totalBetAmount: number,
): number {
  const houseTaxRate = 0.7;
  return (amountBet / totalWinningBetAmount) * totalBetAmount * houseTaxRate;
}

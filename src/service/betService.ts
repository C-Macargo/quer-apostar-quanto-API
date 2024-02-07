import { gameAlreadyFinishedError } from "@/error/gameAlreadyFinishedError";
import { insufficientFundsError } from "@/error/insufficientFundsError";
import { missingGameError } from "@/error/missingGameError";
import { missingParticipantError } from "@/error/missingParticipantError";
import { CreateBetParams } from "@/interface/betInterface";
import { betRepository } from "@/repository/betRepository";
import { gameRepository } from "@/repository/gameRepository";
import { participantRepository } from "@/repository/participantRepository";
import { calculateWinnings } from "@/utils/calculateWinnnings";

async function createBet(betParams: CreateBetParams) {
  await isBetValid(betParams);
  const bet = await betRepository.createBetAndRemoveBalanceTransaction(
    betParams as CreateBetParams,
  );
  return bet;
}

async function finishWinningBets(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
): Promise<void> {
  const totalBetAmount = await betRepository.totalBetValue(gameIdNumber);
  const winningBets = await betRepository.findWinningBets(
    gameIdNumber,
    homeTeamScore,
    awayTeamScore,
  );

  const totalWinningBetAmount = winningBets.reduce(
    (sum, bet) => sum + bet.amountBet,
    0,
  );

  if (totalWinningBetAmount === 0) return;

  for (const bet of winningBets) {
    const winnings = calculateWinnings(
      bet.amountBet,
      totalWinningBetAmount,
      totalBetAmount,
    );
    await betRepository.updateBetStatusAndWinnings(bet, winnings);
    await betRepository.updateParticipantBalance(
      bet.participantId,
      winnings,
      bet.amountBet,
    );
  }
}

async function isBetValid(betParams: CreateBetParams) {
  const participantId = betParams.participantId;
  const gameId = betParams.gameId;
  const amountBet = betParams.amountBet;
  const participantExists =
    await participantRepository.findParticipantById(participantId);
  if (!participantExists) throw missingParticipantError();
  const gameExists = await gameRepository.findGameById(gameId);
  if (!gameExists) throw missingGameError();
  const participantHasFunds = await participantRepository.checkParticipantFunds(
    participantId,
    amountBet,
  );
  if (participantHasFunds == false) throw insufficientFundsError();
  const isGameFinished = await gameRepository.isGameFinished(gameId);
  if (isGameFinished == true) throw gameAlreadyFinishedError();
}

export const betService = {
  createBet,
  finishWinningBets,
};

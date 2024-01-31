import prisma from "@/config/database";
import { participantRepository } from "./participantRepository";
import { Bet } from "@/util/types";
import { duplicateUserError } from "@/error/duplicateUserError";

async function createBet(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number,
) {
  return prisma.bet.create({
    data: {
      homeTeamScore: homeTeamScore,
      awayTeamScore: awayTeamScore,
      amountBet: amountBet,
      gameId: gameId,
      participantId: participantId,
    },
  });
}

async function createBetAndRemoveBalanceTransaction(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number,
): Promise<Bet> {
  try {
    return await prisma.$transaction(async () => {
      throw duplicateUserError();
      const bet = await createBet(
        homeTeamScore,
        awayTeamScore,
        amountBet,
        gameId,
        participantId,
      );
      await participantRepository.removeBalance(participantId, amountBet);
      return bet;
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

export const betRepository = {
  createBet,
  createBetAndRemoveBalanceTransaction,
};

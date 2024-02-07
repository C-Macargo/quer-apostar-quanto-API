import prisma from "@/config/database";
import { participantRepository } from "./participantRepository";
import { Bet } from "@/types/types";
import { CreateBetParams } from "@/interface/betInterface";

async function createBet(betParams: CreateBetParams) {
  return prisma.bet.create({
    data: {
      homeTeamScore: betParams.homeTeamScore,
      awayTeamScore: betParams.awayTeamScore,
      amountBet: betParams.amountBet,
      gameId: betParams.gameId,
      participantId: betParams.participantId,
    },
  });
}

async function createBetAndRemoveBalanceTransaction(
  betParams: CreateBetParams,
): Promise<Bet> {
  try {
    return await prisma.$transaction(async () => {
      const bet = await createBet(betParams);
      await participantRepository.removeBalance(
        betParams.participantId,
        betParams.amountBet,
      );
      return bet;
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

async function finishLosingBets(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
) {
  return await prisma.bet.updateMany({
    where: {
      gameId: gameIdNumber,
      OR: [
        { homeTeamScore: { not: homeTeamScore } },
        { awayTeamScore: { not: awayTeamScore } },
      ],
    },
    data: {
      status: "LOST",
      amountWon: 0,
    },
  });
}

async function totalBetValue(gameIdNumber: number): Promise<number> {
  const {
    _sum: { amountBet },
  } = await prisma.bet.aggregate({
    where: { gameId: gameIdNumber },
    _sum: {
      amountBet: true,
    },
  });

  return amountBet;
}

async function findWinningBets(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
) {
  const winningBets = await prisma.bet.findMany({
    where: {
      gameId: gameIdNumber,
      homeTeamScore: homeTeamScore,
      awayTeamScore: awayTeamScore,
    },
  });
  return winningBets;
}

async function updateBetStatusAndWinnings(
  bet: { id: number; participantId: number; amountBet: number },
  winnings: number,
): Promise<void> {
  await prisma.bet.update({
    where: { id: bet.id },
    data: { amountWon: winnings, status: "WON" },
  });
}

async function updateParticipantBalance(
  participantId: number,
  winnings: number,
  originalBet: number,
): Promise<void> {
  const participant =
    await participantRepository.findParticipantById(participantId);
  await prisma.participant.update({
    where: { id: participant.id },
    data: { balance: participant.balance + winnings + originalBet },
  });
}

export const betRepository = {
  createBet,
  createBetAndRemoveBalanceTransaction,
  totalBetValue,
  finishLosingBets,
  findWinningBets,
  updateParticipantBalance,
  updateBetStatusAndWinnings,
};

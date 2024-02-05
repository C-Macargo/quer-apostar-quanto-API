import prisma from "@/config/database";
import { participantRepository } from "./participantRepository";
import { Bet } from "@/types/types";

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

async function finishWinningBets(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
): Promise<void> {
  const totalBetAmount = await totalBetValue(gameIdNumber);
  const winningBets = await findWinningBets(
    gameIdNumber,
    homeTeamScore,
    awayTeamScore,
  );
  const totalWinningBetAmount = winningBets.reduce(
    (sum: number, { amountBet }: { amountBet: number }) => sum + amountBet,
    0,
  );
  if (totalWinningBetAmount === 0) {
    return;
  }
  for (const bet of winningBets) {
    const winnings =
      (bet.amountBet / totalWinningBetAmount) * totalBetAmount * 0.7;

    await prisma.bet.update({
      where: { id: bet.id },
      data: { amountWon: winnings, status: "WON" },
    });

    const participant = await participantRepository.findParticipantById(
      bet.participantId,
    );
    await prisma.participant.update({
      where: { id: participant.id },
      data: { balance: participant.balance + winnings + bet.amountBet },
    });
  }
}

export const betRepository = {
  createBet,
  createBetAndRemoveBalanceTransaction,
  totalBetValue,
  finishLosingBets,
  finishWinningBets,
};

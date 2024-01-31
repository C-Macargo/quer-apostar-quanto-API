import prisma from "@/config/database";
import { betRepository } from "./betRepository";
import { Game } from "@/util/types";

async function createGame(homeTeamName: string, awayTeamName: string) {
  return prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
    },
  });
}

async function findGames() {
  return prisma.game.findMany({});
}

async function findGameById(id: number) {
  return prisma.game.findFirst({
    where: {
      id: id,
    },
  });
}

async function isGameFinished(gameId: number) {
  const isGameFinished = prisma.game.findFirst({
    where: {
      id: gameId,
    },
    select: {
      isFinished: true,
    },
  });
  return (await isGameFinished).isFinished;
}

async function updateGameScore(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
): Promise<Game> {
  const game = await prisma.game.update({
    where: {
      id: gameIdNumber,
    },
    data: {
      homeTeamScore: homeTeamScore,
      awayTeamScore: awayTeamScore,
      isFinished: true,
    },
  });

  return game;
}

async function finishGameTransaction(
  gameIdNumber: number,
  homeTeamScore: number,
  awayTeamScore: number,
): Promise<Game> {
  try {
    return await prisma.$transaction(async () => {
      await betRepository.finishLosingBets(
        gameIdNumber,
        homeTeamScore,
        awayTeamScore,
      );
      await betRepository.finishWinningBets(
        gameIdNumber,
        homeTeamScore,
        awayTeamScore,
      );
      const game = await updateGameScore(
        gameIdNumber,
        homeTeamScore,
        awayTeamScore,
      );
      return game;
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}
export const gameRepository = {
  createGame,
  findGames,
  findGameById,
  isGameFinished,
  updateGameScore,
  finishGameTransaction,
};

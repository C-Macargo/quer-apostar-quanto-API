import prisma from "@/config/database";

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

export const gameRepository = {
  createGame,
  findGames,
  findGameById,
  isGameFinished,
};

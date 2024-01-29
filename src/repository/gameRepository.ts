import prisma from "@/config/database";

async function createGame(homeTeamName:string, awayTeamName:string) {
    return prisma.game.create({
      data: {
        homeTeamName,
        awayTeamName,
      },
    });
  }

  export const gameRepository = {
    createGame
}
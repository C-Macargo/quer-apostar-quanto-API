import prisma from "@/config/database";

async function createGame(homeTeamName:string, awayTeamName:string) {
    return prisma.game.create({
      data: {
        homeTeamName,
        awayTeamName,
      },
    });
  }

async function findGames(){
    return prisma.game.findMany({})
}

  export const gameRepository = {
    createGame,
    findGames
}
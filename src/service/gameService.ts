import { gameRepository } from "@/repository/gameRepository";

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = await gameRepository.createGame(homeTeamName, awayTeamName);
  return game;
}

async function findGames() {
  const games = await gameRepository.findGames();
  return games;
}

async function findGameById(gameId: string) {
  const id = parseInt(gameId, 10);
  const game = await gameRepository.findGameById(id);
  return game;
}

export const gameService = {
  createGame,
  findGames,
  findGameById,
};

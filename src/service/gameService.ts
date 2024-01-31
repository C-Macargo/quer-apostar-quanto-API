import { gameAlreadyFinishedError } from "@/error/gameAlreadyFinishedError";
import { missingGameError } from "@/error/missingGameError";
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
  const gamneIdNumber = parseInt(gameId, 10);
  const game = await gameRepository.findGameById(gamneIdNumber);
  if (!game) throw missingGameError();
  return game;
}

async function finishGame(
  gameId: string,
  homeTeamScore: number,
  awayTeamScore: number,
) {
  const gamneIdNumber = parseInt(gameId, 10);
  const isGameFinished = await gameRepository.isGameFinished(gamneIdNumber);
  if (isGameFinished == true) throw gameAlreadyFinishedError();
  const game = await gameRepository.finishGameTransaction(
    gamneIdNumber,
    homeTeamScore,
    awayTeamScore,
  );
  return game;
}

export const gameService = {
  createGame,
  findGames,
  findGameById,
  finishGame,
};

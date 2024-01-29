import { gameRepository } from "@/repository/gameRepository";

async function createGame(homeTeamName: string, awayTeamName: string) {
	const game = await gameRepository.createGame(
		homeTeamName,
		awayTeamName
	);
    return game
}

async function findGames(){
    const games = await gameRepository.findGames();
    return games
} 

export const gameService = {
    createGame,
    findGames
}

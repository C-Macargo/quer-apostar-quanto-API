import { gameRepository } from "@/repository/gameRepository";

async function createGame(homeTeamName: string, awayTeamName: string) {
	const game = await gameRepository.createGame(
		homeTeamName,
		awayTeamName
	);
    return game
}

export const gameService = {
    createGame
}

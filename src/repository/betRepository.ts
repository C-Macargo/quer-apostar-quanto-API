import prisma from "@/config/database";

async function createBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
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


export const betRepository = {
createBet
}

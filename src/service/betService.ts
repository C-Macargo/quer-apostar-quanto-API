import { gameAlreadyFinishedError } from "@/error/gameAlreadyFinishedError";
import { insufficientFundsError } from "@/error/insufficientFundsError";
import { missingGameError } from "@/error/missingGameError";
import { missingParticipantError } from "@/error/missingParticipantError";
import { betRepository } from "@/repository/betRepository";
import { gameRepository } from "@/repository/gameRepository";
import { participantRepository } from "@/repository/participantRepository";

async function createBet(homeTeamScore:number, awayTeamScore:number, amountBet:number, gameId:number, participantId:number) {
    const participantExists = await participantRepository.findParticipantById(participantId)
    if (!participantExists) throw missingParticipantError()
    const gameExists = await gameRepository.findGameById(gameId)
    if (!gameExists) throw missingGameError()
    const participantHasFunds = await participantRepository.checkParticipantFunds(participantId, amountBet)
    if (participantHasFunds == false) throw insufficientFundsError()
    const isGameFinished = await gameRepository.isGameFinished(gameId)
    if (isGameFinished == true) throw gameAlreadyFinishedError()
	const bet = await betRepository.createBet(
        homeTeamScore, awayTeamScore, amountBet, gameId, participantId
	);
    return bet
}

export const betService = {
    createBet
}
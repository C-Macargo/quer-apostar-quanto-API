import { duplicateUserError } from "@/error/duplicateUserError";
import { participantRepository } from "@/repository/participantRepository";

async function findParticipants() {
	const participants = await participantRepository.findParticipants();
	return participants;
}

async function createParticipant(name: string, balance: number) {
    const participantExists = await participantRepository.findParticipantByName(name)
    if (participantExists) throw duplicateUserError()
	const participant = await participantRepository.createParticipant(
		name,
		balance
	);
}

export const participantService = {
	findParticipants,
	createParticipant,
};

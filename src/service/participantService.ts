import { participantRepository } from "@/repository/participantRepository";

async function findParticipants() {
    try {
      const participant = await participantRepository.findParticipants();
      return participant;
    } catch (error) {
        console.log(error)
    }
}

async function createParticipant(name:string, balance:number) {
    try {
      const participant = await participantRepository.createParticipant(name, balance);
    } catch (error) {
      console.error(error);
    }
  }

export const participantService = {
    findParticipants,
    createParticipant
}
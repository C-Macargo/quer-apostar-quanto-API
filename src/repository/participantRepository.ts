import prisma from "@/config/database";

async function findParticipants() {
    const participants = await prisma.participant.findMany({});
    return participants;
  }
  
  async function createParticipant(name:string, balance:number) {
    return prisma.participant.create({
      data: {
        name,
        balance,
      },
    });
  }


export const participantRepository = {
    findParticipants,
    createParticipant
}
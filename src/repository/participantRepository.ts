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

  async function findParticipantByName(name: string) {
    const participant = await prisma.participant.findFirst({
        where: {
            name: name, 
        },
    });
    return participant;
}


export const participantRepository = {
    findParticipants,
    createParticipant,
    findParticipantByName
}
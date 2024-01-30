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

  async function findParticipantById(partidipantId : number){
    const participant = await prisma.participant.findFirst({
      where: {
          id: partidipantId, 
      },
  });
  return participant;
  }

  async function checkParticipantFunds(participantId:number, amountBet : number){
    const participant = await prisma.participant.findFirst({
      where: {
        id: participantId,
      },
    });
    const hasSufficientFunds = participant.balance >= amountBet;
  return hasSufficientFunds 
  }

export const participantRepository = {
    findParticipants,
    createParticipant,
    findParticipantByName,
    findParticipantById,
    checkParticipantFunds
}
import prisma from "@/config/database";
import { faker } from "@faker-js/faker";

export async function createParticipant() {
  const participant = await prisma.participant.create({
    data: {
      name: faker.person.firstName(),
      balance: faker.number.int({ min: 1001, max: 10000 }),
    },
  });
  return participant;
}

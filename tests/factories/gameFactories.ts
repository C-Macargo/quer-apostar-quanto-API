import prisma from "@/config/database";
import { faker } from "@faker-js/faker";

export async function createGame() {
  const participant = await prisma.game.create({
    data: {
      homeTeamName: faker.person.jobTitle(),
      awayTeamName: faker.person.zodiacSign(),
    },
  });
  return participant;
}

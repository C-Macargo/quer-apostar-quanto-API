import prisma from "@/config/database";
import { faker } from "@faker-js/faker";

export async function createGame() {
  const game = await prisma.game.create({
    data: {
      homeTeamName: faker.person.jobTitle(),
      awayTeamName: faker.person.zodiacSign(),
    },
  });
  return game;
}

export async function createFinishedGame() {
  const game = await prisma.game.create({
    data: {
      homeTeamName: faker.person.jobTitle(),
      awayTeamName: faker.person.zodiacSign(),
      isFinished: true,
    },
  });
  return game;
}

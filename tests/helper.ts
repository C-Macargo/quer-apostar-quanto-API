import prisma from "@/config/database";

export async function cleanDb() {
  await prisma.$transaction([
    prisma.bet.deleteMany({}),
    prisma.game.deleteMany({}),
    prisma.participant.deleteMany({}),
  ]);
}

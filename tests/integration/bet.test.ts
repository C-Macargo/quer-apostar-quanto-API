import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helper";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createGame } from "../factories/gameFactories";
import { createParticipant } from "../factories/participantFactories";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe("POST /bets", () => {
  it("should return the created bet and respond with status 201", async () => {
    const game = await createGame();
    const participant = await createParticipant();
    const randomNumber = faker.number.int({ min: 1, max: 5 });
    const betBody = {
      homeTeamScore: randomNumber,
      awayTeamScore: randomNumber,
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    };
    const response = await api.post("/bets/").send(betBody);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      awayTeamScore: expect.any(Number),
      homeTeamScore: expect.any(Number),
      gameId: game.id,
      amountBet: betBody.amountBet,
    });
  });
});

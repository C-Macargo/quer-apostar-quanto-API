import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helper";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createFinishedGame, createGame } from "../factories/gameFactories";
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

  it("should return a 404 status code if the game does not exist", async () => {
    const gameId = faker.number.int({ min: 1, max: 5 });
    const participant = await createParticipant();
    const randomNumber = faker.number.int({ min: 1, max: 5 });
    const betBody = {
      homeTeamScore: randomNumber,
      awayTeamScore: randomNumber,
      amountBet: participant.balance,
      gameId: gameId,
      participantId: participant.id,
    };
    const response = await api.post("/bets/").send(betBody);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    const expectedErrorMessage = "Game does not exist!";
    expect(response.body.message).toBe(expectedErrorMessage);
  });

  it("should return a 404 status code if the participant does not exist", async () => {
    const game = await createGame();
    const participantId = faker.number.int({ min: 1, max: 5 });
    const randomNumber = faker.number.int({ min: 1, max: 5 });
    const betBody = {
      homeTeamScore: randomNumber,
      awayTeamScore: randomNumber,
      amountBet: 1000,
      gameId: game.id,
      participantId: participantId,
    };
    const response = await api.post("/bets/").send(betBody);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    const expectedErrorMessage = "Participant does not exist!";
    expect(response.body.message).toBe(expectedErrorMessage);
  });

  it("should return a 403 status code if the participant does not have funds", async () => {
    const game = await createGame();
    const participant = await createParticipant();
    const randomNumber = faker.number.int({ min: 1, max: 5 });
    const betBody = {
      homeTeamScore: randomNumber,
      awayTeamScore: randomNumber,
      amountBet:
        participant.balance + faker.number.int({ min: 100, max: 1000 }),
      gameId: game.id,
      participantId: participant.id,
    };
    const response = await api.post("/bets/").send(betBody);
    expect(response.status).toBe(httpStatus.FORBIDDEN);
    const expectedErrorMessage =
      "Participant does not have enough funds to bet!";
    expect(response.body.message).toBe(expectedErrorMessage);
  });

  it("should return a 403 status code if the game is already finished", async () => {
    const game = await createFinishedGame();
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
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    const expectedErrorMessage = "The game has already finished!";
    expect(response.body.message).toBe(expectedErrorMessage);
  });
});

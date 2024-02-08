import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helper";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createGame } from "../factories/gameFactories";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe("GET /games", () => {
  it("should return all games and respond with status 200", async () => {
    const game = await createGame();
    const response = await api.get("/games/");
    expect(response.status).toBe(httpStatus.OK);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          homeTeamName: game.homeTeamName,
          awayTeamName: game.awayTeamName,
          awayTeamScore: expect.any(Number),
          homeTeamScore: expect.any(Number),
          isFinished: expect.any(Boolean),
        }),
      ]),
    );
  });

  it("should return 200 even if the table is empty", async () => {
    const response = await api.get("/games/");
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("GET /games/id", () => {
  it("should return the game corresponding to the specific id and respond with status 200", async () => {
    const game = await createGame();
    const response = await api.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toMatchObject({
      id: game.id,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      awayTeamScore: expect.any(Number),
      homeTeamScore: expect.any(Number),
      isFinished: expect.any(Boolean),
    });
  });

  it("should return status code 404 if there is no game matching the id", async () => {
    const id = faker.number.int({ min: 1, max: 999 });
    const response = await api.get(`/games/${id}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});

describe("POST /games", () => {
  it("should return the created game and respond with status 201", async () => {
    const game = {
      awayTeamName: faker.person.zodiacSign(),
      homeTeamName: faker.person.zodiacSign(),
    };
    const response = await api.post("/games/").send(game);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      awayTeamScore: expect.any(Number),
      homeTeamScore: expect.any(Number),
      isFinished: expect.any(Boolean),
    });
  });
});

describe("POST /games/:id/finish", () => {
  it("should return the created game and respond with status 200", async () => {
    const game = await createGame();
    const finishGameBody = {
      awayTeamScore: faker.number.int({ min: 1, max: 10 }),
      homeTeamScore: faker.number.int({ min: 1, max: 10 }),
    };
    const response = await api
      .post(`/games/${game.id}/finish`)
      .send(finishGameBody);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toMatchObject({
      id: game.id,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      awayTeamScore: expect.any(Number),
      homeTeamScore: expect.any(Number),
      isFinished: true,
    });
  });
});

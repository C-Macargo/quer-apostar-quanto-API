import app, { init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helper";
import { createParticipant } from "../factories/participantFactories";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe("GET /participants", () => {
  it("should return all participants and respond with status 200", async () => {
    const participant = await createParticipant();
    const response = await api.get("/participants/");
    expect(response.status).toBe(httpStatus.OK);
    expect(Array.isArray(response.body)).toBeTruthy();

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: participant.id,
          name: participant.name,
          balance: participant.balance,
        }),
      ]),
    );
  });
  it("should return 200 even if table is empty", async () => {
    const response = await api.get("/participants/");
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("post /participants", () => {
  it("should return status code 400 if balance is smaller than 1000", async () => {
    const participant = {
      name: faker.person.firstName(),
      balance: faker.number.int({ min: 1, max: 999 }),
    };
    const response = await api.post("/participants/").send(participant);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return status code 409 if participant already exists", async () => {
    const participant = await createParticipant();
    const newParticipant = {
      name: participant.name,
      balance: participant.balance,
    };
    const response = await api.post("/participants/").send(newParticipant);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should return the created participant and respond with status 201", async () => {
    const participant = {
      name: faker.person.firstName(),
      balance: faker.number.int({ min: 1000, max: 10000 }),
    };
    const response = await api.post("/participants/").send(participant);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toMatchObject({
      name: participant.name,
      balance: participant.balance,
    });
  });
});

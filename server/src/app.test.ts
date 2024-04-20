import supertest, { SuperTest, Test } from "supertest";
import { app } from "./app";

const request: SuperTest<Test> = supertest(app);

describe("POST /auth", () => {
  describe("given a username and password", () => {
    // should save the username and password to the database
    // should respond with a json object containing a message: message: `New user username has been successfully signed in.

    test("should respond with a 201 status code", async () => {
      const response = await request.post("/auth").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(201);
    });
    // should respond with a 201 status code
    // should specify json in the content type header
  });
  describe("when the username and password is missing", () => {
    // should respond with a status code of 400
  });
});

import { app } from "../app";

import request from "supertest";

describe("GET /stats", () => {
  it("returns status code 200 if username is passed", async () => {
    const res = await request(app).get("/stats:romaniso");

    expect(res.statusCode).toEqual(200);
  });
});

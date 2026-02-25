import request from "supertest";
import express from "express";
import { customerRouter } from "../src/customer/customer.routes";

describe("Customer API", () => {
  const app = express();
  app.use(express.json());
  app.use("/customers", customerRouter);

  test("POST /customers creates a customer", async () => {
    const res = await request(app)
      .post("/customers")
      .send({ name: "Alice", email: "alice@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Alice");
  });

  test("GET /customers/:id returns a customer", async () => {
    const createRes = await request(app)
      .post("/customers")
      .send({ name: "Bob", email: "bob@example.com" });

    const id = createRes.body.id;

    const getRes = await request(app).get(`/customers/${id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(id);
  });

  test("GET /customers/:id returns 404 for unknown id", async () => {
    const res = await request(app).get("/customers/unknown-id");

    expect(res.status).toBe(404);
  });
});

import request from "supertest";
import app from "../src/app";

describe("Loan API - No Auth", () => {
  it("GET /api/v1/health returns 200", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET /api/v1/loans without token returns 401", async () => {
    const res = await request(app).get("/api/v1/loans");
    expect(res.status).toBe(401);
    expect(res.body.errorCode).toBe("TOKEN_NOT_FOUND");
  });

  it("GET /api/v1/loans with invalid token returns 401", async () => {
    const res = await request(app)
      .get("/api/v1/loans")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.status).toBe(401);
    expect(res.body.errorCode).toBe("TOKEN_INVALID");
  });

  it("POST /api/v1/loans without token returns 401", async () => {
    const res = await request(app).post("/api/v1/loans").send({ applicant: "Test", amount: 1000 });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/v1/loans/1 without token returns 401", async () => {
    const res = await request(app).delete("/api/v1/loans/1");
    expect(res.status).toBe(401);
  });
});
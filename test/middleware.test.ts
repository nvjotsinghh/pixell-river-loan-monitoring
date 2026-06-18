jest.mock("../src/config/firebase", () => ({
  auth: {
    verifyIdToken: jest.fn().mockRejectedValue(new Error("Invalid token")),
  },
  default: {},
}));

import { Request, Response, NextFunction } from "express";
import { authenticate } from "../src/api/v1/middleware/authenticate";

describe("authenticate middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = { locals: {} };
    mockNext = jest.fn();
  });

  it("calls next with TOKEN_NOT_FOUND when no Authorization header", async () => {
    await authenticate(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({ errorCode: "TOKEN_NOT_FOUND" })
    );
  });

  it("calls next with TOKEN_NOT_FOUND when header does not start with Bearer", async () => {
    mockReq.headers = { authorization: "Basic sometoken" };
    await authenticate(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({ errorCode: "TOKEN_NOT_FOUND" })
    );
  });

  it("calls next with TOKEN_INVALID when token is invalid", async () => {
    mockReq.headers = { authorization: "Bearer badtoken" };
    await authenticate(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({ errorCode: "TOKEN_INVALID" })
    );
  });
});
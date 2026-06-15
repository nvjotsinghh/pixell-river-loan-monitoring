export const getAuth = jest.fn(() => ({
  verifyIdToken: jest.fn().mockRejectedValue(new Error("Invalid token")),
  getUser: jest.fn(),
  setCustomUserClaims: jest.fn(),
}));
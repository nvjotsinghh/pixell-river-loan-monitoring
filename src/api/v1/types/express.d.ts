import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Locals {
      user?: DecodedIdToken;
    }
  }
}
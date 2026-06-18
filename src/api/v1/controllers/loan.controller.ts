import { Request, Response, NextFunction } from "express";
import { LoanModel } from "../models/loan.model";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "../errors/ValidationError";
import { sendSuccess } from "../utils/responseUtils";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const loanController = {
  getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const loans = LoanModel.findAll();
      sendSuccess(res, loans, HTTP_STATUS.OK, "Loans retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id as string, 10);
      const loan = LoanModel.findById(id);
      if (!loan) throw new NotFoundError(`Loan with id ${id} not found`);
      sendSuccess(res, loan, HTTP_STATUS.OK, "Loan retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { applicant, amount, status } = req.body;
      if (!applicant || !amount) {
        throw new ValidationError("applicant and amount are required");
      }
      const loan = LoanModel.create({ applicant, amount, status });
      sendSuccess(res, loan, HTTP_STATUS.CREATED, "Loan created successfully");
    } catch (error) {
      next(error);
    }
  },

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id as string, 10);
      const loan = LoanModel.update(id, req.body);
      if (!loan) throw new NotFoundError(`Loan with id ${id} not found`);
      sendSuccess(res, loan, HTTP_STATUS.OK, "Loan updated successfully");
    } catch (error) {
      next(error);
    }
  },

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id as string, 10);
      const deleted = LoanModel.delete(id);
      if (!deleted) throw new NotFoundError(`Loan with id ${id} not found`);
      sendSuccess(res, { id }, HTTP_STATUS.OK, "Loan deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
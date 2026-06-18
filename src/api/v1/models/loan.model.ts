import { LoanApplication, CreateLoanDto, UpdateLoanDto } from "../types/loan.types";

let loans: LoanApplication[] = [
  { id: 1, applicant: "John Smith",     amount: 50000,    status: "pending",      createdAt: "2025-01-10T10:00:00.000Z" },
  { id: 2, applicant: "Sarah Johnson",  amount: 150000,   status: "under_review", createdAt: "2025-01-08T10:00:00.000Z" },
  { id: 3, applicant: "Michael Chen",   amount: 500000,   status: "pending",      createdAt: "2025-01-05T10:00:00.000Z" },
  { id: 4, applicant: "Emily Williams", amount: 1000000,  status: "flagged",      createdAt: "2025-01-03T10:00:00.000Z" },
];

let nextId = 5;

export const LoanModel = {
  findAll(): LoanApplication[] {
    return loans;
  },

  findById(id: number): LoanApplication | undefined {
    return loans.find((l) => l.id === id);
  },

  create(dto: CreateLoanDto): LoanApplication {
    const loan: LoanApplication = {
      id: nextId++,
      applicant: dto.applicant,
      amount: dto.amount,
      status: dto.status ?? "pending",
      createdAt: new Date().toISOString(),
    };
    loans.push(loan);
    return loan;
  },

  update(id: number, dto: UpdateLoanDto): LoanApplication | undefined {
    const index = loans.findIndex((l) => l.id === id);
    if (index === -1) return undefined;
    loans[index] = { ...loans[index], ...dto };
    return loans[index];
  },

  delete(id: number): boolean {
    const index = loans.findIndex((l) => l.id === id);
    if (index === -1) return false;
    loans.splice(index, 1);
    return true;
  },
};
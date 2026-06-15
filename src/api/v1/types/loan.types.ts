export type LoanStatus = "pending" | "under_review" | "flagged" | "approved" | "rejected";

export interface LoanApplication {
  id: number;
  applicant: string;
  amount: number;
  status: LoanStatus;
  createdAt: string;
}

export interface CreateLoanDto {
  applicant: string;
  amount: number;
  status?: LoanStatus;
}

export interface UpdateLoanDto {
  applicant?: string;
  amount?: number;
  status?: LoanStatus;
}
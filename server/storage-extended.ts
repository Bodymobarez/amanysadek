// Extended storage functions for all services
// This will be merged into storage.ts

import { db } from "./db";
import { 
  auditSessions,
  auditReports,
  taxReturns,
  taxInspections,
  legalCases,
  contracts,
  feasibilityStudies,
  employees,
  payrollRecords,
  insuranceRecords,
  type InsertAuditSession,
  type AuditSession,
  type InsertAuditReport,
  type AuditReport,
  type InsertTaxReturn,
  type TaxReturn,
  type InsertTaxInspection,
  type TaxInspection,
  type InsertLegalCase,
  type LegalCase,
  type InsertContract,
  type Contract,
  type InsertFeasibilityStudy,
  type FeasibilityStudy,
  type InsertEmployee,
  type Employee,
  type InsertPayrollRecord,
  type PayrollRecord,
  type InsertInsuranceRecord,
  type InsuranceRecord,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

// ==================== AUDITING SERVICE ====================

export async function createAuditSession(session: InsertAuditSession): Promise<AuditSession> {
  const [result] = await db.insert(auditSessions).values(session).returning();
  return result;
}

export async function getAuditSessions(companyId?: number): Promise<AuditSession[]> {
  if (companyId) {
    return await db.select().from(auditSessions).where(eq(auditSessions.companyId, companyId)).orderBy(desc(auditSessions.createdAt));
  }
  return await db.select().from(auditSessions).orderBy(desc(auditSessions.createdAt));
}

export async function getAuditSessionById(id: number): Promise<AuditSession | undefined> {
  const [session] = await db.select().from(auditSessions).where(eq(auditSessions.id, id));
  return session;
}

export async function updateAuditSession(id: number, updates: Partial<InsertAuditSession>): Promise<AuditSession> {
  const [session] = await db
    .update(auditSessions)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(auditSessions.id, id))
    .returning();
  return session;
}

export async function createAuditReport(report: InsertAuditReport): Promise<AuditReport> {
  const [result] = await db.insert(auditReports).values(report).returning();
  return result;
}

export async function getAuditReports(sessionId: number): Promise<AuditReport[]> {
  return await db.select().from(auditReports).where(eq(auditReports.auditSessionId, sessionId));
}

// ==================== TAX SERVICE ====================

export async function createTaxReturn(taxReturn: InsertTaxReturn): Promise<TaxReturn> {
  const [result] = await db.insert(taxReturns).values(taxReturn).returning();
  return result;
}

export async function getTaxReturns(companyId?: number): Promise<TaxReturn[]> {
  if (companyId) {
    return await db.select().from(taxReturns).where(eq(taxReturns.companyId, companyId)).orderBy(desc(taxReturns.createdAt));
  }
  return await db.select().from(taxReturns).orderBy(desc(taxReturns.createdAt));
}

export async function getTaxReturnById(id: number): Promise<TaxReturn | undefined> {
  const [result] = await db.select().from(taxReturns).where(eq(taxReturns.id, id));
  return result;
}

export async function updateTaxReturn(id: number, updates: Partial<InsertTaxReturn>): Promise<TaxReturn> {
  const [result] = await db
    .update(taxReturns)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(taxReturns.id, id))
    .returning();
  return result;
}

export async function createTaxInspection(inspection: InsertTaxInspection): Promise<TaxInspection> {
  const [result] = await db.insert(taxInspections).values(inspection).returning();
  return result;
}

export async function getTaxInspections(companyId?: number): Promise<TaxInspection[]> {
  if (companyId) {
    return await db.select().from(taxInspections).where(eq(taxInspections.companyId, companyId)).orderBy(desc(taxInspections.createdAt));
  }
  return await db.select().from(taxInspections).orderBy(desc(taxInspections.createdAt));
}

// ==================== LEGAL SERVICE ====================

export async function createLegalCase(legalCase: InsertLegalCase): Promise<LegalCase> {
  const [result] = await db.insert(legalCases).values(legalCase).returning();
  return result;
}

export async function getLegalCases(companyId?: number): Promise<LegalCase[]> {
  if (companyId) {
    return await db.select().from(legalCases).where(eq(legalCases.companyId, companyId)).orderBy(desc(legalCases.createdAt));
  }
  return await db.select().from(legalCases).orderBy(desc(legalCases.createdAt));
}

export async function getLegalCaseById(id: number): Promise<LegalCase | undefined> {
  const [result] = await db.select().from(legalCases).where(eq(legalCases.id, id));
  return result;
}

export async function updateLegalCase(id: number, updates: Partial<InsertLegalCase>): Promise<LegalCase> {
  const [result] = await db
    .update(legalCases)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(legalCases.id, id))
    .returning();
  return result;
}

export async function createContract(contract: InsertContract): Promise<Contract> {
  const [result] = await db.insert(contracts).values(contract).returning();
  return result;
}

export async function getContracts(companyId?: number): Promise<Contract[]> {
  if (companyId) {
    return await db.select().from(contracts).where(eq(contracts.companyId, companyId)).orderBy(desc(contracts.createdAt));
  }
  return await db.select().from(contracts).orderBy(desc(contracts.createdAt));
}

export async function getContractById(id: number): Promise<Contract | undefined> {
  const [result] = await db.select().from(contracts).where(eq(contracts.id, id));
  return result;
}

// ==================== FEASIBILITY STUDIES SERVICE ====================

export async function createFeasibilityStudy(study: InsertFeasibilityStudy): Promise<FeasibilityStudy> {
  const [result] = await db.insert(feasibilityStudies).values(study).returning();
  return result;
}

export async function getFeasibilityStudies(): Promise<FeasibilityStudy[]> {
  return await db.select().from(feasibilityStudies).orderBy(desc(feasibilityStudies.createdAt));
}

export async function getFeasibilityStudyById(id: number): Promise<FeasibilityStudy | undefined> {
  const [result] = await db.select().from(feasibilityStudies).where(eq(feasibilityStudies.id, id));
  return result;
}

export async function updateFeasibilityStudy(id: number, updates: Partial<InsertFeasibilityStudy>): Promise<FeasibilityStudy> {
  const [result] = await db
    .update(feasibilityStudies)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(feasibilityStudies.id, id))
    .returning();
  return result;
}

// ==================== PAYROLL SERVICE ====================

export async function createEmployee(employee: InsertEmployee): Promise<Employee> {
  const [result] = await db.insert(employees).values(employee).returning();
  return result;
}

export async function getEmployees(companyId?: number): Promise<Employee[]> {
  if (companyId) {
    return await db.select().from(employees).where(eq(employees.companyId, companyId)).orderBy(desc(employees.createdAt));
  }
  return await db.select().from(employees).orderBy(desc(employees.createdAt));
}

export async function getEmployeeById(id: number): Promise<Employee | undefined> {
  const [result] = await db.select().from(employees).where(eq(employees.id, id));
  return result;
}

export async function updateEmployee(id: number, updates: Partial<InsertEmployee>): Promise<Employee> {
  const [result] = await db
    .update(employees)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(employees.id, id))
    .returning();
  return result;
}

export async function createPayrollRecord(record: InsertPayrollRecord): Promise<PayrollRecord> {
  const [result] = await db.insert(payrollRecords).values(record).returning();
  return result;
}

export async function getPayrollRecords(companyId?: number, period?: string): Promise<PayrollRecord[]> {
  let query = db.select().from(payrollRecords);
  if (companyId && period) {
    return await query.where(and(eq(payrollRecords.companyId, companyId), eq(payrollRecords.period, period))).orderBy(desc(payrollRecords.createdAt));
  }
  if (companyId) {
    return await query.where(eq(payrollRecords.companyId, companyId)).orderBy(desc(payrollRecords.createdAt));
  }
  return await query.orderBy(desc(payrollRecords.createdAt));
}

export async function createInsuranceRecord(record: InsertInsuranceRecord): Promise<InsuranceRecord> {
  const [result] = await db.insert(insuranceRecords).values(record).returning();
  return result;
}

export async function getInsuranceRecords(companyId?: number): Promise<InsuranceRecord[]> {
  if (companyId) {
    return await db.select().from(insuranceRecords).where(eq(insuranceRecords.companyId, companyId)).orderBy(desc(insuranceRecords.createdAt));
  }
  return await db.select().from(insuranceRecords).orderBy(desc(insuranceRecords.createdAt));
}


import { db } from "./db";
import { 
  inquiries, 
  companies,
  incorporationRequests,
  shareholders,
  documents,
  users,
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
  serviceRequests,
  type InsertInquiry, 
  type Inquiry,
  type InsertCompany,
  type Company,
  type InsertIncorporationRequest,
  type IncorporationRequest,
  type InsertShareholder,
  type Shareholder,
  type InsertDocument,
  type Document,
  type InsertUser,
  type User,
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
  type InsertServiceRequest,
  type ServiceRequest,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Companies
  createCompany(company: InsertCompany): Promise<Company>;
  getCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  updateCompanyStatus(id: number, status: string): Promise<Company>;
  
  // Incorporation Requests
  createIncorporationRequest(request: InsertIncorporationRequest): Promise<IncorporationRequest>;
  getIncorporationRequests(): Promise<IncorporationRequest[]>;
  getIncorporationRequestById(id: number): Promise<IncorporationRequest | undefined>;
  updateIncorporationStep(id: number, step: string, status?: string): Promise<IncorporationRequest>;
  
  // Shareholders
  createShareholder(shareholder: InsertShareholder): Promise<Shareholder>;
  getShareholdersByIncorporationId(incorporationId: number): Promise<Shareholder[]>;
  
  // Documents
  createDocument(document: InsertDocument): Promise<Document>;
  getDocumentsByIncorporationId(incorporationId: number): Promise<Document[]>;
  
  // Users (Authentication)
  createUser(user: InsertUser & { password: string }): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Inquiries
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  // Companies
  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values(insertCompany).returning();
    return company;
  }

  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company;
  }

  async updateCompanyStatus(id: number, status: string): Promise<Company> {
    const [company] = await db
      .update(companies)
      .set({ status, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return company;
  }

  async updateCompany(id: number, updates: Partial<InsertCompany>): Promise<Company> {
    const [company] = await db
      .update(companies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return company;
  }

  async deleteCompany(id: number): Promise<void> {
    await db.delete(companies).where(eq(companies.id, id));
  }

  // Incorporation Requests
  async createIncorporationRequest(insertRequest: InsertIncorporationRequest): Promise<IncorporationRequest> {
    const [request] = await db
      .insert(incorporationRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getIncorporationRequests(): Promise<IncorporationRequest[]> {
    return await db.select().from(incorporationRequests);
  }

  async getIncorporationRequestById(id: number): Promise<IncorporationRequest | undefined> {
    const [request] = await db
      .select()
      .from(incorporationRequests)
      .where(eq(incorporationRequests.id, id));
    return request;
  }

  async updateIncorporationStep(id: number, step: string, status?: string): Promise<IncorporationRequest> {
    const updateData: any = { currentStep: step, updatedAt: new Date() };
    if (status) {
      updateData.status = status;
    }
    
    const [request] = await db
      .update(incorporationRequests)
      .set(updateData)
      .where(eq(incorporationRequests.id, id))
      .returning();
    return request;
  }

  // Shareholders
  async createShareholder(insertShareholder: InsertShareholder): Promise<Shareholder> {
    const [shareholder] = await db
      .insert(shareholders)
      .values(insertShareholder)
      .returning();
    return shareholder;
  }

  async getShareholdersByIncorporationId(incorporationId: number): Promise<Shareholder[]> {
    return await db
      .select()
      .from(shareholders)
      .where(eq(shareholders.incorporationId, incorporationId));
  }

  // Documents
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return document;
  }

  async getDocumentsByIncorporationId(incorporationId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.incorporationId, incorporationId));
  }

  // Users (Authentication)
  async createUser(insertUser: InsertUser & { password: string }): Promise<User> {
    const { password, ...userData } = insertUser;
    const [user] = await db
      .insert(users)
      .values({ ...userData, password })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // ==================== AUDITING SERVICE ====================
  async createAuditSession(session: InsertAuditSession): Promise<AuditSession> {
    const [result] = await db.insert(auditSessions).values(session).returning();
    return result;
  }

  async getAuditSessions(companyId?: number): Promise<AuditSession[]> {
    if (companyId) {
      return await db.select().from(auditSessions).where(eq(auditSessions.companyId, companyId)).orderBy(desc(auditSessions.createdAt));
    }
    return await db.select().from(auditSessions).orderBy(desc(auditSessions.createdAt));
  }

  async getAuditSessionById(id: number): Promise<AuditSession | undefined> {
    const [session] = await db.select().from(auditSessions).where(eq(auditSessions.id, id));
    return session;
  }

  async updateAuditSession(id: number, updates: Partial<InsertAuditSession>): Promise<AuditSession> {
    const [session] = await db
      .update(auditSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(auditSessions.id, id))
      .returning();
    return session;
  }

  async deleteAuditSession(id: number): Promise<void> {
    await db.delete(auditSessions).where(eq(auditSessions.id, id));
  }

  async getAuditReportById(id: number): Promise<AuditReport | undefined> {
    const [report] = await db.select().from(auditReports).where(eq(auditReports.id, id));
    return report;
  }

  async updateAuditReport(id: number, updates: Partial<InsertAuditReport>): Promise<AuditReport> {
    const [report] = await db
      .update(auditReports)
      .set(updates)
      .where(eq(auditReports.id, id))
      .returning();
    return report;
  }

  async deleteAuditReport(id: number): Promise<void> {
    await db.delete(auditReports).where(eq(auditReports.id, id));
  }

  async createAuditReport(report: InsertAuditReport): Promise<AuditReport> {
    const [result] = await db.insert(auditReports).values(report).returning();
    return result;
  }

  async getAuditReports(sessionId: number): Promise<AuditReport[]> {
    return await db.select().from(auditReports).where(eq(auditReports.auditSessionId, sessionId));
  }

  // ==================== TAX SERVICE ====================
  async createTaxReturn(taxReturn: InsertTaxReturn): Promise<TaxReturn> {
    const [result] = await db.insert(taxReturns).values(taxReturn).returning();
    return result;
  }

  async getTaxReturns(companyId?: number): Promise<TaxReturn[]> {
    if (companyId) {
      return await db.select().from(taxReturns).where(eq(taxReturns.companyId, companyId)).orderBy(desc(taxReturns.createdAt));
    }
    return await db.select().from(taxReturns).orderBy(desc(taxReturns.createdAt));
  }

  async getTaxReturnById(id: number): Promise<TaxReturn | undefined> {
    const [result] = await db.select().from(taxReturns).where(eq(taxReturns.id, id));
    return result;
  }

  async updateTaxReturn(id: number, updates: Partial<InsertTaxReturn>): Promise<TaxReturn> {
    const [result] = await db
      .update(taxReturns)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(taxReturns.id, id))
      .returning();
    return result;
  }

  async deleteTaxReturn(id: number): Promise<void> {
    await db.delete(taxReturns).where(eq(taxReturns.id, id));
  }

  async getTaxInspectionById(id: number): Promise<TaxInspection | undefined> {
    const [result] = await db.select().from(taxInspections).where(eq(taxInspections.id, id));
    return result;
  }

  async updateTaxInspection(id: number, updates: Partial<InsertTaxInspection>): Promise<TaxInspection> {
    const [result] = await db
      .update(taxInspections)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(taxInspections.id, id))
      .returning();
    return result;
  }

  async deleteTaxInspection(id: number): Promise<void> {
    await db.delete(taxInspections).where(eq(taxInspections.id, id));
  }

  async createTaxInspection(inspection: InsertTaxInspection): Promise<TaxInspection> {
    const [result] = await db.insert(taxInspections).values(inspection).returning();
    return result;
  }

  async getTaxInspections(companyId?: number): Promise<TaxInspection[]> {
    if (companyId) {
      return await db.select().from(taxInspections).where(eq(taxInspections.companyId, companyId)).orderBy(desc(taxInspections.createdAt));
    }
    return await db.select().from(taxInspections).orderBy(desc(taxInspections.createdAt));
  }

  // ==================== LEGAL SERVICE ====================
  async createLegalCase(legalCase: InsertLegalCase): Promise<LegalCase> {
    const [result] = await db.insert(legalCases).values(legalCase).returning();
    return result;
  }

  async getLegalCases(companyId?: number): Promise<LegalCase[]> {
    if (companyId) {
      return await db.select().from(legalCases).where(eq(legalCases.companyId, companyId)).orderBy(desc(legalCases.createdAt));
    }
    return await db.select().from(legalCases).orderBy(desc(legalCases.createdAt));
  }

  async getLegalCaseById(id: number): Promise<LegalCase | undefined> {
    const [result] = await db.select().from(legalCases).where(eq(legalCases.id, id));
    return result;
  }

  async updateLegalCase(id: number, updates: Partial<InsertLegalCase>): Promise<LegalCase> {
    const [result] = await db
      .update(legalCases)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(legalCases.id, id))
      .returning();
    return result;
  }

  async deleteLegalCase(id: number): Promise<void> {
    await db.delete(legalCases).where(eq(legalCases.id, id));
  }

  async updateContract(id: number, updates: Partial<InsertContract>): Promise<Contract> {
    const [result] = await db
      .update(contracts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contracts.id, id))
      .returning();
    return result;
  }

  async deleteContract(id: number): Promise<void> {
    await db.delete(contracts).where(eq(contracts.id, id));
  }

  async createContract(contract: InsertContract): Promise<Contract> {
    const [result] = await db.insert(contracts).values(contract).returning();
    return result;
  }

  async getContracts(companyId?: number): Promise<Contract[]> {
    if (companyId) {
      return await db.select().from(contracts).where(eq(contracts.companyId, companyId)).orderBy(desc(contracts.createdAt));
    }
    return await db.select().from(contracts).orderBy(desc(contracts.createdAt));
  }

  async getContractById(id: number): Promise<Contract | undefined> {
    const [result] = await db.select().from(contracts).where(eq(contracts.id, id));
    return result;
  }

  // ==================== FEASIBILITY STUDIES SERVICE ====================
  async createFeasibilityStudy(study: InsertFeasibilityStudy): Promise<FeasibilityStudy> {
    const [result] = await db.insert(feasibilityStudies).values(study).returning();
    return result;
  }

  async getFeasibilityStudies(): Promise<FeasibilityStudy[]> {
    return await db.select().from(feasibilityStudies).orderBy(desc(feasibilityStudies.createdAt));
  }

  async getFeasibilityStudyById(id: number): Promise<FeasibilityStudy | undefined> {
    const [result] = await db.select().from(feasibilityStudies).where(eq(feasibilityStudies.id, id));
    return result;
  }

  async updateFeasibilityStudy(id: number, updates: Partial<InsertFeasibilityStudy>): Promise<FeasibilityStudy> {
    const [result] = await db
      .update(feasibilityStudies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(feasibilityStudies.id, id))
      .returning();
    return result;
  }

  async deleteFeasibilityStudy(id: number): Promise<void> {
    await db.delete(feasibilityStudies).where(eq(feasibilityStudies.id, id));
  }

  // ==================== PAYROLL SERVICE ====================
  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const [result] = await db.insert(employees).values(employee).returning();
    return result;
  }

  async getEmployees(companyId?: number): Promise<Employee[]> {
    if (companyId) {
      return await db.select().from(employees).where(eq(employees.companyId, companyId)).orderBy(desc(employees.createdAt));
    }
    return await db.select().from(employees).orderBy(desc(employees.createdAt));
  }

  async getEmployeeById(id: number): Promise<Employee | undefined> {
    const [result] = await db.select().from(employees).where(eq(employees.id, id));
    return result;
  }

  async updateEmployee(id: number, updates: Partial<InsertEmployee>): Promise<Employee> {
    const [result] = await db
      .update(employees)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(employees.id, id))
      .returning();
    return result;
  }

  async deleteEmployee(id: number): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }

  async getPayrollRecordById(id: number): Promise<PayrollRecord | undefined> {
    const [result] = await db.select().from(payrollRecords).where(eq(payrollRecords.id, id));
    return result;
  }

  async updatePayrollRecord(id: number, updates: Partial<InsertPayrollRecord>): Promise<PayrollRecord> {
    const [result] = await db
      .update(payrollRecords)
      .set(updates)
      .where(eq(payrollRecords.id, id))
      .returning();
    return result;
  }

  async deletePayrollRecord(id: number): Promise<void> {
    await db.delete(payrollRecords).where(eq(payrollRecords.id, id));
  }

  async getInsuranceRecordById(id: number): Promise<InsuranceRecord | undefined> {
    const [result] = await db.select().from(insuranceRecords).where(eq(insuranceRecords.id, id));
    return result;
  }

  async updateInsuranceRecord(id: number, updates: Partial<InsertInsuranceRecord>): Promise<InsuranceRecord> {
    const [result] = await db
      .update(insuranceRecords)
      .set(updates)
      .where(eq(insuranceRecords.id, id))
      .returning();
    return result;
  }

  async deleteInsuranceRecord(id: number): Promise<void> {
    await db.delete(insuranceRecords).where(eq(insuranceRecords.id, id));
  }

  async createPayrollRecord(record: InsertPayrollRecord): Promise<PayrollRecord> {
    const [result] = await db.insert(payrollRecords).values(record).returning();
    return result;
  }

  async getPayrollRecords(companyId?: number, period?: string): Promise<PayrollRecord[]> {
    if (companyId && period) {
      return await db.select().from(payrollRecords).where(and(eq(payrollRecords.companyId, companyId), eq(payrollRecords.period, period))).orderBy(desc(payrollRecords.createdAt));
    }
    if (companyId) {
      return await db.select().from(payrollRecords).where(eq(payrollRecords.companyId, companyId)).orderBy(desc(payrollRecords.createdAt));
    }
    return await db.select().from(payrollRecords).orderBy(desc(payrollRecords.createdAt));
  }

  async createInsuranceRecord(record: InsertInsuranceRecord): Promise<InsuranceRecord> {
    const [result] = await db.insert(insuranceRecords).values(record).returning();
    return result;
  }

  async getInsuranceRecords(companyId?: number): Promise<InsuranceRecord[]> {
    if (companyId) {
      return await db.select().from(insuranceRecords).where(eq(insuranceRecords.companyId, companyId)).orderBy(desc(insuranceRecords.createdAt));
    }
    return await db.select().from(insuranceRecords).orderBy(desc(insuranceRecords.createdAt));
  }

  // ==================== SERVICE REQUESTS ====================
  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const [result] = await db.insert(serviceRequests).values(request).returning();
    return result;
  }

  async getServiceRequests(serviceType?: string, status?: string): Promise<ServiceRequest[]> {
    if (serviceType && status) {
      return await db.select().from(serviceRequests)
        .where(and(eq(serviceRequests.serviceType, serviceType), eq(serviceRequests.status, status)))
        .orderBy(desc(serviceRequests.createdAt));
    }
    if (serviceType) {
      return await db.select().from(serviceRequests)
        .where(eq(serviceRequests.serviceType, serviceType))
        .orderBy(desc(serviceRequests.createdAt));
    }
    if (status) {
      return await db.select().from(serviceRequests)
        .where(eq(serviceRequests.status, status))
        .orderBy(desc(serviceRequests.createdAt));
    }
    return await db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
  }

  async getServiceRequestById(id: number): Promise<ServiceRequest | undefined> {
    const [result] = await db.select().from(serviceRequests).where(eq(serviceRequests.id, id));
    return result;
  }

  async updateServiceRequest(id: number, updates: Partial<InsertServiceRequest>): Promise<ServiceRequest> {
    const [result] = await db
      .update(serviceRequests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(serviceRequests.id, id))
      .returning();
    return result;
  }

  async deleteServiceRequest(id: number): Promise<void> {
    await db.delete(serviceRequests).where(eq(serviceRequests.id, id));
  }
}

export const storage = new DatabaseStorage();

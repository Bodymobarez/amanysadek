import { pgTable, text, serial, timestamp, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Inquiries table (existing)
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

// Companies table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  legalForm: text("legal_form").notNull(), // شركة فردية، ذات مسؤولية محدودة، مساهمة، إلخ
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

// Incorporation Requests table
export const incorporationRequests = pgTable("incorporation_requests", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  status: text("status").notNull().default("pending"), // pending, documents, registration, completed
  currentStep: text("current_step").notNull().default("documents"), // documents, registration, license, tax, insurance
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertIncorporationRequestSchema = createInsertSchema(incorporationRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type IncorporationRequest = typeof incorporationRequests.$inferSelect;
export type InsertIncorporationRequest = z.infer<typeof insertIncorporationRequestSchema>;

// Shareholders table
export const shareholders = pgTable("shareholders", {
  id: serial("id").primaryKey(),
  incorporationId: integer("incorporation_id").notNull().references(() => incorporationRequests.id),
  name: text("name").notNull(),
  nationalId: text("national_id").notNull(),
  email: text("email"),
  phone: text("phone"),
  sharePercentage: real("share_percentage").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertShareholderSchema = createInsertSchema(shareholders).omit({
  id: true,
  createdAt: true,
});

export type Shareholder = typeof shareholders.$inferSelect;
export type InsertShareholder = z.infer<typeof insertShareholderSchema>;

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  incorporationId: integer("incorporation_id").notNull().references(() => incorporationRequests.id),
  documentType: text("document_type").notNull(), // contract, id, license, etc
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

// Users table (Authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // hashed password
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // admin, user
  isActive: integer("is_active").notNull().default(1), // 1 = active, 0 = inactive
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// ==================== AUDITING SERVICE ====================

// Audit Sessions table
export const auditSessions = pgTable("audit_sessions", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  auditType: text("audit_type").notNull(), // external, internal, compliance, operational
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  auditorName: text("auditor_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAuditSessionSchema = createInsertSchema(auditSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AuditSession = typeof auditSessions.$inferSelect;
export type InsertAuditSession = z.infer<typeof insertAuditSessionSchema>;

// Audit Reports table
export const auditReports = pgTable("audit_reports", {
  id: serial("id").primaryKey(),
  auditSessionId: integer("audit_session_id").notNull().references(() => auditSessions.id),
  reportType: text("report_type").notNull(), // financial, compliance, operational
  findings: text("findings"),
  recommendations: text("recommendations"),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuditReportSchema = createInsertSchema(auditReports).omit({
  id: true,
  createdAt: true,
});

export type AuditReport = typeof auditReports.$inferSelect;
export type InsertAuditReport = z.infer<typeof insertAuditReportSchema>;

// ==================== TAX SERVICE ====================

// Tax Returns table
export const taxReturns = pgTable("tax_returns", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  taxType: text("tax_type").notNull(), // vat, income, payroll, property, stamp
  period: text("period").notNull(), // 2024-Q1, 2024-01, etc
  amount: real("amount").notNull(),
  status: text("status").notNull().default("draft"), // draft, submitted, approved, rejected
  submissionDate: timestamp("submission_date"),
  dueDate: timestamp("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaxReturnSchema = createInsertSchema(taxReturns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaxReturn = typeof taxReturns.$inferSelect;
export type InsertTaxReturn = z.infer<typeof insertTaxReturnSchema>;

// Tax Inspections table
export const taxInspections = pgTable("tax_inspections", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  inspectionType: text("inspection_type").notNull(), // field, office, document
  status: text("status").notNull().default("scheduled"), // scheduled, in_progress, completed
  inspectorName: text("inspector_name"),
  inspectionDate: timestamp("inspection_date"),
  findings: text("findings"),
  result: text("result"), // approved, adjustments, penalties
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaxInspectionSchema = createInsertSchema(taxInspections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaxInspection = typeof taxInspections.$inferSelect;
export type InsertTaxInspection = z.infer<typeof insertTaxInspectionSchema>;

// ==================== LEGAL SERVICE ====================

// Legal Cases table
export const legalCases = pgTable("legal_cases", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  caseType: text("case_type").notNull(), // contract, dispute, litigation, advisory
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("open"), // open, in_progress, closed, settled
  courtName: text("court_name"),
  caseNumber: text("case_number"),
  lawyerName: text("lawyer_name"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  outcome: text("outcome"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLegalCaseSchema = createInsertSchema(legalCases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type LegalCase = typeof legalCases.$inferSelect;
export type InsertLegalCase = z.infer<typeof insertLegalCaseSchema>;

// Contracts table
export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  contractType: text("contract_type").notNull(), // supply, partnership, lease, employment
  title: text("title").notNull(),
  partyName: text("party_name").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  value: real("value"),
  status: text("status").notNull().default("draft"), // draft, active, expired, terminated
  fileUrl: text("file_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Contract = typeof contracts.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;

// ==================== FEASIBILITY STUDIES SERVICE ====================

// Feasibility Studies table
export const feasibilityStudies = pgTable("feasibility_studies", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  clientPhone: text("client_phone"),
  projectType: text("project_type").notNull(), // industrial, commercial, service, agricultural
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  estimatedCost: real("estimated_cost"),
  estimatedRevenue: real("estimated_revenue"),
  roi: real("roi"), // return on investment percentage
  conclusion: text("conclusion"), // feasible, not_feasible, conditional
  reportUrl: text("report_url"),
  startDate: timestamp("start_date"),
  completionDate: timestamp("completion_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFeasibilityStudySchema = createInsertSchema(feasibilityStudies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type FeasibilityStudy = typeof feasibilityStudies.$inferSelect;
export type InsertFeasibilityStudy = z.infer<typeof insertFeasibilityStudySchema>;

// ==================== PAYROLL SERVICE ====================

// Employees table
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  name: text("name").notNull(),
  nationalId: text("national_id").notNull(),
  email: text("email"),
  phone: text("phone"),
  position: text("position"),
  department: text("department"),
  hireDate: timestamp("hire_date"),
  salary: real("salary").notNull(),
  status: text("status").notNull().default("active"), // active, inactive, terminated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

// Payroll Records table
export const payrollRecords = pgTable("payroll_records", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  employeeId: integer("employee_id").references(() => employees.id),
  period: text("period").notNull(), // 2024-01, 2024-02, etc
  baseSalary: real("base_salary").notNull(),
  allowances: real("allowances").default(0),
  deductions: real("deductions").default(0),
  netSalary: real("net_salary").notNull(),
  taxAmount: real("tax_amount").default(0),
  insuranceAmount: real("insurance_amount").default(0),
  status: text("status").notNull().default("pending"), // pending, processed, paid
  paymentDate: timestamp("payment_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPayrollRecordSchema = createInsertSchema(payrollRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PayrollRecord = typeof payrollRecords.$inferSelect;
export type InsertPayrollRecord = z.infer<typeof insertPayrollRecordSchema>;

// Insurance Records table
export const insuranceRecords = pgTable("insurance_records", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  employeeId: integer("employee_id").references(() => employees.id),
  period: text("period").notNull(),
  contributionAmount: real("contribution_amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, submitted, paid
  submissionDate: timestamp("submission_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertInsuranceRecordSchema = createInsertSchema(insuranceRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsuranceRecord = typeof insuranceRecords.$inferSelect;
export type InsertInsuranceRecord = z.infer<typeof insertInsuranceRecordSchema>;

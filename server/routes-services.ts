// Service-specific routes for all services
import type { Express } from "express";
import { storage } from "./storage";
import { z } from "zod";

export function registerServiceRoutes(app: Express) {
  
  // ==================== AUDITING SERVICE ROUTES ====================
  
  app.post("/api/audit/sessions", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        auditType: z.string(),
        status: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        auditorName: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const session = await storage.createAuditSession(input);
      res.status(201).json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء جلسة التدقيق" });
    }
  });

  app.get("/api/audit/sessions", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const sessions = await storage.getAuditSessions(companyId);
      res.json(sessions);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب جلسات التدقيق" });
    }
  });

  app.get("/api/audit/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getAuditSessionById(id);
      if (!session) {
        return res.status(404).json({ message: "الجلسة غير موجودة" });
      }
      const reports = await storage.getAuditReports(id);
      res.json({ ...session, reports });
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الجلسة" });
    }
  });

  app.post("/api/audit/reports", async (req, res) => {
    try {
      const input = z.object({
        auditSessionId: z.number(),
        reportType: z.string(),
        findings: z.string().optional(),
        recommendations: z.string().optional(),
        fileUrl: z.string().optional(),
      }).parse(req.body);
      
      const report = await storage.createAuditReport(input);
      res.status(201).json(report);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء التقرير" });
    }
  });

  // ==================== TAX SERVICE ROUTES ====================
  
  app.post("/api/tax/returns", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        taxType: z.string(),
        period: z.string(),
        amount: z.number(),
        status: z.string().optional(),
        submissionDate: z.string().optional(),
        dueDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const taxReturn = await storage.createTaxReturn(input);
      res.status(201).json(taxReturn);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء الإقرار الضريبي" });
    }
  });

  app.get("/api/tax/returns", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const returns = await storage.getTaxReturns(companyId);
      res.json(returns);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الإقرارات الضريبية" });
    }
  });

  app.post("/api/tax/inspections", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        inspectionType: z.string(),
        status: z.string().optional(),
        inspectorName: z.string().optional(),
        inspectionDate: z.string().optional(),
        findings: z.string().optional(),
        result: z.string().optional(),
      }).parse(req.body);
      
      const inspection = await storage.createTaxInspection(input);
      res.status(201).json(inspection);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء الفحص الضريبي" });
    }
  });

  app.get("/api/tax/inspections", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const inspections = await storage.getTaxInspections(companyId);
      res.json(inspections);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الفحوصات الضريبية" });
    }
  });

  // ==================== LEGAL SERVICE ROUTES ====================
  
  app.post("/api/legal/cases", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        caseType: z.string(),
        title: z.string(),
        description: z.string().optional(),
        status: z.string().optional(),
        courtName: z.string().optional(),
        caseNumber: z.string().optional(),
        lawyerName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        outcome: z.string().optional(),
      }).parse(req.body);
      
      const legalCase = await storage.createLegalCase(input);
      res.status(201).json(legalCase);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء القضية" });
    }
  });

  app.get("/api/legal/cases", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const cases = await storage.getLegalCases(companyId);
      res.json(cases);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب القضايا" });
    }
  });

  app.post("/api/legal/contracts", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        contractType: z.string(),
        title: z.string(),
        partyName: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        value: z.number().optional(),
        status: z.string().optional(),
        fileUrl: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const contract = await storage.createContract(input);
      res.status(201).json(contract);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء العقد" });
    }
  });

  app.get("/api/legal/contracts", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const contracts = await storage.getContracts(companyId);
      res.json(contracts);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب العقود" });
    }
  });

  // ==================== FEASIBILITY STUDIES SERVICE ROUTES ====================
  
  app.post("/api/feasibility/studies", async (req, res) => {
    try {
      const input = z.object({
        projectName: z.string(),
        clientName: z.string(),
        clientEmail: z.string().optional(),
        clientPhone: z.string().optional(),
        projectType: z.string(),
        status: z.string().optional(),
        estimatedCost: z.number().optional(),
        estimatedRevenue: z.number().optional(),
        roi: z.number().optional(),
        conclusion: z.string().optional(),
        reportUrl: z.string().optional(),
        startDate: z.string().optional(),
        completionDate: z.string().optional(),
      }).parse(req.body);
      
      const study = await storage.createFeasibilityStudy(input);
      res.status(201).json(study);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء دراسة الجدوى" });
    }
  });

  app.get("/api/feasibility/studies", async (req, res) => {
    try {
      const studies = await storage.getFeasibilityStudies();
      res.json(studies);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب دراسات الجدوى" });
    }
  });

  app.get("/api/feasibility/studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const study = await storage.getFeasibilityStudyById(id);
      if (!study) {
        return res.status(404).json({ message: "الدراسة غير موجودة" });
      }
      res.json(study);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الدراسة" });
    }
  });

  // ==================== PAYROLL SERVICE ROUTES ====================
  
  app.post("/api/payroll/employees", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        name: z.string(),
        nationalId: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        position: z.string().optional(),
        department: z.string().optional(),
        hireDate: z.string().optional(),
        salary: z.number(),
        status: z.string().optional(),
      }).parse(req.body);
      
      const employee = await storage.createEmployee(input);
      res.status(201).json(employee);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء الموظف" });
    }
  });

  app.get("/api/payroll/employees", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const employees = await storage.getEmployees(companyId);
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الموظفين" });
    }
  });

  app.post("/api/payroll/records", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        employeeId: z.number().optional(),
        period: z.string(),
        baseSalary: z.number(),
        allowances: z.number().optional(),
        deductions: z.number().optional(),
        netSalary: z.number(),
        taxAmount: z.number().optional(),
        insuranceAmount: z.number().optional(),
        status: z.string().optional(),
        paymentDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const record = await storage.createPayrollRecord(input);
      res.status(201).json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء سجل الرواتب" });
    }
  });

  app.get("/api/payroll/records", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const period = req.query.period as string | undefined;
      const records = await storage.getPayrollRecords(companyId, period);
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب سجلات الرواتب" });
    }
  });

  app.post("/api/payroll/insurance", async (req, res) => {
    try {
      const input = z.object({
        companyId: z.number(),
        employeeId: z.number().optional(),
        period: z.string(),
        contributionAmount: z.number(),
        status: z.string().optional(),
        submissionDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const record = await storage.createInsuranceRecord(input);
      res.status(201).json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء سجل التأمينات" });
    }
  });

  app.get("/api/payroll/insurance", async (req, res) => {
    try {
      const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
      const records = await storage.getInsuranceRecords(companyId);
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب سجلات التأمينات" });
    }
  });
}


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

  app.put("/api/audit/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        auditType: z.string().optional(),
        status: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        auditorName: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const session = await storage.updateAuditSession(id, input);
      res.json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث جلسة التدقيق" });
    }
  });

  app.delete("/api/audit/sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAuditSession(id);
      res.json({ message: "تم حذف الجلسة بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الجلسة" });
    }
  });

  app.get("/api/audit/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getAuditReportById(id);
      if (!report) {
        return res.status(404).json({ message: "التقرير غير موجود" });
      }
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب التقرير" });
    }
  });

  app.put("/api/audit/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        reportType: z.string().optional(),
        findings: z.string().optional(),
        recommendations: z.string().optional(),
        fileUrl: z.string().optional(),
      }).parse(req.body);
      
      const report = await storage.updateAuditReport(id, input);
      res.json(report);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث التقرير" });
    }
  });

  app.delete("/api/audit/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAuditReport(id);
      res.json({ message: "تم حذف التقرير بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف التقرير" });
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

  app.get("/api/tax/returns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const taxReturn = await storage.getTaxReturnById(id);
      if (!taxReturn) {
        return res.status(404).json({ message: "الإقرار غير موجود" });
      }
      res.json(taxReturn);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الإقرار" });
    }
  });

  app.put("/api/tax/returns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        taxType: z.string().optional(),
        period: z.string().optional(),
        amount: z.number().optional(),
        status: z.string().optional(),
        submissionDate: z.string().optional(),
        dueDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const taxReturn = await storage.updateTaxReturn(id, input);
      res.json(taxReturn);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث الإقرار الضريبي" });
    }
  });

  app.delete("/api/tax/returns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTaxReturn(id);
      res.json({ message: "تم حذف الإقرار بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الإقرار" });
    }
  });

  app.get("/api/tax/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const inspection = await storage.getTaxInspectionById(id);
      if (!inspection) {
        return res.status(404).json({ message: "الفحص غير موجود" });
      }
      res.json(inspection);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الفحص" });
    }
  });

  app.put("/api/tax/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        inspectionType: z.string().optional(),
        status: z.string().optional(),
        inspectorName: z.string().optional(),
        inspectionDate: z.string().optional(),
        findings: z.string().optional(),
        result: z.string().optional(),
      }).parse(req.body);
      
      const inspection = await storage.updateTaxInspection(id, input);
      res.json(inspection);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث الفحص الضريبي" });
    }
  });

  app.delete("/api/tax/inspections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTaxInspection(id);
      res.json({ message: "تم حذف الفحص بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الفحص" });
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

  app.get("/api/legal/cases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const legalCase = await storage.getLegalCaseById(id);
      if (!legalCase) {
        return res.status(404).json({ message: "القضية غير موجودة" });
      }
      res.json(legalCase);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب القضية" });
    }
  });

  app.put("/api/legal/cases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        caseType: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
        courtName: z.string().optional(),
        caseNumber: z.string().optional(),
        lawyerName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        outcome: z.string().optional(),
      }).parse(req.body);
      
      const legalCase = await storage.updateLegalCase(id, input);
      res.json(legalCase);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث القضية" });
    }
  });

  app.delete("/api/legal/cases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteLegalCase(id);
      res.json({ message: "تم حذف القضية بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف القضية" });
    }
  });

  app.get("/api/legal/contracts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contract = await storage.getContractById(id);
      if (!contract) {
        return res.status(404).json({ message: "العقد غير موجود" });
      }
      res.json(contract);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب العقد" });
    }
  });

  app.put("/api/legal/contracts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        contractType: z.string().optional(),
        title: z.string().optional(),
        partyName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        value: z.number().optional(),
        status: z.string().optional(),
        fileUrl: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const contract = await storage.updateContract(id, input);
      res.json(contract);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث العقد" });
    }
  });

  app.delete("/api/legal/contracts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContract(id);
      res.json({ message: "تم حذف العقد بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف العقد" });
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

  app.put("/api/feasibility/studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        projectName: z.string().optional(),
        clientName: z.string().optional(),
        clientEmail: z.string().optional(),
        clientPhone: z.string().optional(),
        projectType: z.string().optional(),
        status: z.string().optional(),
        estimatedCost: z.number().optional(),
        estimatedRevenue: z.number().optional(),
        roi: z.number().optional(),
        conclusion: z.string().optional(),
        reportUrl: z.string().optional(),
        startDate: z.string().optional(),
        completionDate: z.string().optional(),
      }).parse(req.body);
      
      const study = await storage.updateFeasibilityStudy(id, input);
      res.json(study);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث دراسة الجدوى" });
    }
  });

  app.delete("/api/feasibility/studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFeasibilityStudy(id);
      res.json({ message: "تم حذف الدراسة بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الدراسة" });
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

  app.get("/api/payroll/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const employee = await storage.getEmployeeById(id);
      if (!employee) {
        return res.status(404).json({ message: "الموظف غير موجود" });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الموظف" });
    }
  });

  app.put("/api/payroll/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        name: z.string().optional(),
        nationalId: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        position: z.string().optional(),
        department: z.string().optional(),
        hireDate: z.string().optional(),
        salary: z.number().optional(),
        status: z.string().optional(),
      }).parse(req.body);
      
      const employee = await storage.updateEmployee(id, input);
      res.json(employee);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث الموظف" });
    }
  });

  app.delete("/api/payroll/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEmployee(id);
      res.json({ message: "تم حذف الموظف بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الموظف" });
    }
  });

  app.get("/api/payroll/records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const record = await storage.getPayrollRecordById(id);
      if (!record) {
        return res.status(404).json({ message: "السجل غير موجود" });
      }
      res.json(record);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب السجل" });
    }
  });

  app.put("/api/payroll/records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        employeeId: z.number().optional(),
        period: z.string().optional(),
        baseSalary: z.number().optional(),
        allowances: z.number().optional(),
        deductions: z.number().optional(),
        netSalary: z.number().optional(),
        taxAmount: z.number().optional(),
        insuranceAmount: z.number().optional(),
        status: z.string().optional(),
        paymentDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const record = await storage.updatePayrollRecord(id, input);
      res.json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث سجل الرواتب" });
    }
  });

  app.delete("/api/payroll/records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePayrollRecord(id);
      res.json({ message: "تم حذف السجل بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف السجل" });
    }
  });

  app.get("/api/payroll/insurance/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const record = await storage.getInsuranceRecordById(id);
      if (!record) {
        return res.status(404).json({ message: "السجل غير موجود" });
      }
      res.json(record);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب السجل" });
    }
  });

  app.put("/api/payroll/insurance/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        companyId: z.number().optional(),
        employeeId: z.number().optional(),
        period: z.string().optional(),
        contributionAmount: z.number().optional(),
        status: z.string().optional(),
        submissionDate: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const record = await storage.updateInsuranceRecord(id, input);
      res.json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث سجل التأمينات" });
    }
  });

  app.delete("/api/payroll/insurance/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteInsuranceRecord(id);
      res.json({ message: "تم حذف السجل بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف السجل" });
    }
  });

  // ==================== SERVICE REQUESTS ROUTES ====================
  
  app.post("/api/service-requests", async (req, res) => {
    try {
      const input = z.object({
        serviceType: z.string().min(1, "نوع الخدمة مطلوب"),
        serviceName: z.string().min(1, "اسم الخدمة مطلوب"),
        name: z.string().min(1, "الاسم مطلوب"),
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        phone: z.string().min(1, "رقم الهاتف مطلوب"),
        company: z.string().optional(),
        message: z.string().min(1, "الرسالة مطلوبة"),
        preferredContact: z.enum(["email", "phone", "both"]).optional(),
        status: z.string().optional(),
      }).parse(req.body);
      
      const request = await storage.createServiceRequest(input);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في إنشاء طلب الخدمة" });
    }
  });

  app.get("/api/service-requests", async (req, res) => {
    try {
      const serviceType = req.query.serviceType as string | undefined;
      const status = req.query.status as string | undefined;
      const requests = await storage.getServiceRequests(serviceType, status);
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب طلبات الخدمات" });
    }
  });

  app.get("/api/service-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getServiceRequestById(id);
      if (!request) {
        return res.status(404).json({ message: "الطلب غير موجود" });
      }
      res.json(request);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الطلب" });
    }
  });

  app.put("/api/service-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = z.object({
        serviceType: z.string().optional(),
        serviceName: z.string().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().optional(),
        preferredContact: z.enum(["email", "phone", "both"]).optional(),
        status: z.string().optional(),
        assignedTo: z.number().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const request = await storage.updateServiceRequest(id, input);
      res.json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "خطأ في تحديث الطلب" });
    }
  });

  app.delete("/api/service-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteServiceRequest(id);
      res.json({ message: "تم حذف الطلب بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الطلب" });
    }
  });
}


import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { hashPassword, comparePassword, generateToken, verifyToken, extractTokenFromHeader } from "./auth";
import { registerServiceRoutes } from "./routes-services";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth middleware
  const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromHeader(req.headers.authorization);
      
      if (!token) {
        return res.status(401).json({ message: "غير مصرح - يرجى تسجيل الدخول" });
      }

      const payload = verifyToken(token);
      if (!payload) {
        return res.status(401).json({ message: "رمز غير صحيح أو منتهي الصلاحية" });
      }

      const user = await storage.getUserById(payload.userId);
      if (!user || user.isActive === 0) {
        return res.status(401).json({ message: "المستخدم غير موجود أو غير نشط" });
      }

      (req as any).user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "خطأ في المصادقة" });
    }
  };

  // Auth routes
  app.post(api.auth.register.path, async (req, res) => {
      try {
        const input = api.auth.register.input.parse(req.body);
        
        // Check if user already exists
        const existingUser = await storage.getUserByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
      }

      // Hash password
      const hashedPassword = await hashPassword(input.password);

      // Create user
      const user = await storage.createUser({
        email: input.email,
        password: hashedPassword,
        name: input.name,
        role: input.role || "user",
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
    });

    app.post(api.auth.login.path, async (req, res) => {
      try {
        const input = api.auth.login.input.parse(req.body);

      // Find user
      const user = await storage.getUserByEmail(input.email);
      if (!user) {
        return res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }

      if (user.isActive === 0) {
        return res.status(401).json({ message: "الحساب غير نشط" });
      }

      // Verify password
      const isValidPassword = await comparePassword(input.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
    });

    app.get(api.auth.me.path, authenticate, async (req, res) => {
      try {
        const user = (req as any).user;
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      } catch (err) {
        res.status(500).json({ message: "خطأ في جلب بيانات المستخدم" });
      }
    });

  // Inquiry routes (existing)
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Company routes
  app.post(api.companies.create.path, async (req, res) => {
    try {
      const input = api.companies.create.input.parse(req.body);
      const company = await storage.createCompany(input);
      res.status(201).json(company);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.companies.list.path, async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الشركات" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompanyById(id);
      if (!company) {
        return res.status(404).json({ message: "الشركة غير موجودة" });
      }
      res.json(company);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الشركة" });
    }
  });

  app.patch("/api/companies/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.companies.updateStatus.input.parse(req.body);
      const company = await storage.updateCompanyStatus(id, input.status);
      res.json(company);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "خطأ في تحديث الشركة" });
    }
  });

  app.put("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.companies.create.input.parse(req.body);
      const company = await storage.updateCompany(id, input);
      res.json(company);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "خطأ في تحديث الشركة" });
    }
  });

  app.delete("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCompany(id);
      res.json({ message: "تم حذف الشركة بنجاح" });
    } catch (err) {
      res.status(500).json({ message: "خطأ في حذف الشركة" });
    }
  });

  // Incorporation Request routes
  app.post(api.incorporations.create.path, async (req, res) => {
    try {
      const input = api.incorporations.create.input.parse(req.body);
      
      // Validate total share percentage
      const totalShares = input.shareholders.reduce((sum, sh) => sum + sh.sharePercentage, 0);
      if (Math.abs(totalShares - 100) > 0.01) {
        return res.status(400).json({
          message: "مجموع نسب الأسهم يجب أن يساوي 100%",
          field: "shareholders",
        });
      }

      // Create incorporation request
      const request = await storage.createIncorporationRequest({
        companyId: input.companyId,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        notes: input.notes,
        status: "pending",
        currentStep: "documents",
      });

      // Create shareholders
      const shareholders = await Promise.all(
        input.shareholders.map(sh =>
          storage.createShareholder({
            incorporationId: request.id,
            ...sh,
          })
        )
      );

      res.status(201).json({
        ...request,
        shareholders,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.incorporations.list.path, async (req, res) => {
    try {
      const requests = await storage.getIncorporationRequests();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب طلبات التأسيس" });
    }
  });

  app.get("/api/incorporations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getIncorporationRequestById(id);
      if (!request) {
        return res.status(404).json({ message: "الطلب غير موجود" });
      }
      res.json(request);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب الطلب" });
    }
  });

  app.get("/api/incorporations/:id/details", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getIncorporationRequestById(id);
      if (!request) {
        return res.status(404).json({ message: "الطلب غير موجود" });
      }

      const company = await storage.getCompanyById(request.companyId);
      const shareholders = await storage.getShareholdersByIncorporationId(id);
      const documents = await storage.getDocumentsByIncorporationId(id);

      res.json({
        ...request,
        company,
        shareholders,
        documents,
      });
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب تفاصيل الطلب" });
    }
  });

  app.patch("/api/incorporations/:id/step", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.incorporations.updateStep.input.parse(req.body);
      const request = await storage.updateIncorporationStep(
        id,
        input.currentStep,
        input.status
      );
      res.json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "خطأ في تحديث الطلب" });
    }
  });

  // Document routes
  app.post(api.documents.create.path, async (req, res) => {
    try {
      const input = api.documents.create.input.parse(req.body);
      const document = await storage.createDocument(input);
      res.status(201).json(document);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get("/api/documents/incorporation/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const documents = await storage.getDocumentsByIncorporationId(id);
      res.json(documents);
    } catch (err) {
      res.status(500).json({ message: "خطأ في جلب المستندات" });
    }
  });

  // Register all service routes
  registerServiceRoutes(app);

  return httpServer;
}


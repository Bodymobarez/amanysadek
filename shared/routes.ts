import { z } from "zod";

// Company routes
export const companyRoutes = {
  create: {
    path: "/api/companies",
    input: z.object({
      name: z.string().min(1, "اسم الشركة مطلوب"),
      legalForm: z.string().min(1, "الشكل القانوني مطلوب"),
      status: z.string().optional(),
    }),
  },
  list: {
    path: "/api/companies",
  },
  getById: {
    path: "/api/companies/:id",
  },
  updateStatus: {
    path: "/api/companies/:id/status",
    input: z.object({
      status: z.string().min(1, "الحالة مطلوبة"),
    }),
  },
};

// Incorporation Request routes
export const incorporationRoutes = {
  create: {
    path: "/api/incorporations",
    input: z.object({
      companyId: z.number(),
      contactName: z.string().min(1, "اسم جهة الاتصال مطلوب"),
      contactEmail: z.string().email("البريد الإلكتروني غير صحيح"),
      contactPhone: z.string().min(1, "رقم الهاتف مطلوب"),
      notes: z.string().optional(),
      shareholders: z.array(
        z.object({
          name: z.string().min(1, "اسم الشريك مطلوب"),
          nationalId: z.string().min(14, "الرقم القومي يجب أن يكون 14 رقم").max(14),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          sharePercentage: z.number().min(0).max(100, "نسبة الأسهم يجب أن تكون بين 0 و 100"),
        })
      ).min(1, "يجب إضافة شريك واحد على الأقل"),
    }),
  },
  list: {
    path: "/api/incorporations",
  },
  getById: {
    path: "/api/incorporations/:id",
  },
  updateStep: {
    path: "/api/incorporations/:id/step",
    input: z.object({
      currentStep: z.string().min(1, "الخطوة الحالية مطلوبة"),
      status: z.string().optional(),
    }),
  },
  getWithDetails: {
    path: "/api/incorporations/:id/details",
  },
};

// Document routes
export const documentRoutes = {
  create: {
    path: "/api/documents",
    input: z.object({
      incorporationId: z.number(),
      documentType: z.string().min(1, "نوع المستند مطلوب"),
      fileName: z.string().min(1, "اسم الملف مطلوب"),
      fileUrl: z.string().url("رابط الملف غير صحيح"),
    }),
  },
  listByIncorporation: {
    path: "/api/documents/incorporation/:id",
  },
};

// Existing inquiry routes
export const inquiryRoutes = {
  create: {
    path: "/api/inquiries/create",
    input: z.object({
      name: z.string().min(1, "الاسم مطلوب"),
      email: z.string().email("البريد الإلكتروني غير صحيح"),
      message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
    }),
  },
};

// Auth routes
export const authRoutes = {
  register: {
    path: "/api/auth/register",
    input: z.object({
      email: z.string().email("البريد الإلكتروني غير صحيح"),
      password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      name: z.string().min(1, "الاسم مطلوب"),
      role: z.enum(["admin", "user"]).optional(),
    }),
  },
  login: {
    path: "/api/auth/login",
    input: z.object({
      email: z.string().email("البريد الإلكتروني غير صحيح"),
      password: z.string().min(1, "كلمة المرور مطلوبة"),
    }),
  },
  me: {
    path: "/api/auth/me",
  },
};

export const api = {
  inquiries: inquiryRoutes,
  companies: companyRoutes,
  incorporations: incorporationRoutes,
  documents: documentRoutes,
  auth: authRoutes,
};


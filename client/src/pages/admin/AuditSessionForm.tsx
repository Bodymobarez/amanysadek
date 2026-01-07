import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const auditSessionSchema = z.object({
  companyId: z.number().min(1, "الشركة مطلوبة"),
  auditType: z.string().min(1, "نوع التدقيق مطلوب"),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  auditorName: z.string().optional(),
  notes: z.string().optional(),
});

type AuditSessionFormData = z.infer<typeof auditSessionSchema>;

export default function AuditSessionForm() {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Array<{ id: number; name: string }>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AuditSessionFormData>({
    resolver: zodResolver(auditSessionSchema),
    defaultValues: {
      companyId: 0,
      auditType: "",
      status: "pending",
      startDate: "",
      endDate: "",
      auditorName: "",
      notes: "",
    },
  });

  useEffect(() => {
    fetchCompanies();
    const pathParts = location.split("/");
    if (pathParts[pathParts.length - 1] === "new") {
      setIsEdit(false);
      reset({
        companyId: 0,
        auditType: "",
        status: "pending",
        startDate: "",
        endDate: "",
        auditorName: "",
        notes: "",
      });
    } else {
      const id = parseInt(pathParts[pathParts.length - 1]);
      if (!isNaN(id)) {
        setIsEdit(true);
        setSessionId(id);
        fetchSession(id);
      }
    }
  }, [location]);

  const fetchCompanies = async () => {
    try {
      const res = await fetch("/api/companies");
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchSession = async (id: number) => {
    try {
      const res = await fetch(`/api/audit/sessions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("companyId", data.companyId);
        setValue("auditType", data.auditType);
        setValue("status", data.status || "pending");
        setValue("startDate", data.startDate ? data.startDate.split("T")[0] : "");
        setValue("endDate", data.endDate ? data.endDate.split("T")[0] : "");
        setValue("auditorName", data.auditorName || "");
        setValue("notes", data.notes || "");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  const onSubmit = async (data: AuditSessionFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/audit/sessions/${sessionId}` : "/api/audit/sessions";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLocation("/admin/auditing");
      } else {
        const error = await res.json();
        alert(error.message || "حدث خطأ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionId || !confirm("هل أنت متأكد من حذف هذه الجلسة؟")) return;

    try {
      const res = await fetch(`/api/audit/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocation("/admin/auditing");
      } else {
        const error = await res.json();
        alert(error.message || "حدث خطأ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/admin/auditing">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة إلى قائمة جلسات التدقيق
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "تعديل جلسة تدقيق" : "إضافة جلسة تدقيق جديدة"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشركة *
            </label>
            <select
              {...register("companyId", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="0">اختر الشركة</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع التدقيق *
            </label>
            <select
              {...register("auditType")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">اختر نوع التدقيق</option>
              <option value="internal">تدقيق داخلي</option>
              <option value="external">تدقيق خارجي</option>
              <option value="financial">تدقيق مالي</option>
              <option value="operational">تدقيق تشغيلي</option>
            </select>
            {errors.auditType && (
              <p className="mt-1 text-sm text-red-600">{errors.auditType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="pending">قيد الانتظار</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتملة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ البدء
              </label>
              <input
                {...register("startDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الانتهاء
              </label>
              <input
                {...register("endDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المدقق
            </label>
            <input
              {...register("auditorName")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="أدخل اسم المدقق"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="أدخل أي ملاحظات..."
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ"
              )}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                حذف
              </button>
            )}
            <Link href="/admin/auditing">
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                إلغاء
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}


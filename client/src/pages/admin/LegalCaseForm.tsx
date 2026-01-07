import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const legalCaseSchema = z.object({
  companyId: z.number().min(1, "الشركة مطلوبة"),
  caseType: z.string().min(1, "نوع القضية مطلوب"),
  title: z.string().min(1, "عنوان القضية مطلوب"),
  description: z.string().optional(),
  status: z.string().optional(),
  courtName: z.string().optional(),
  caseNumber: z.string().optional(),
  lawyerName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  outcome: z.string().optional(),
});

type LegalCaseFormData = z.infer<typeof legalCaseSchema>;

export default function LegalCaseForm() {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [caseId, setCaseId] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Array<{ id: number; name: string }>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<LegalCaseFormData>({
    resolver: zodResolver(legalCaseSchema),
    defaultValues: {
      companyId: 0,
      caseType: "",
      title: "",
      description: "",
      status: "pending",
      courtName: "",
      caseNumber: "",
      lawyerName: "",
      startDate: "",
      endDate: "",
      outcome: "",
    },
  });

  useEffect(() => {
    fetchCompanies();
    const pathParts = location.split("/");
    if (pathParts[pathParts.length - 1] === "new") {
      setIsEdit(false);
      reset({
        companyId: 0,
        caseType: "",
        title: "",
        description: "",
        status: "pending",
        courtName: "",
        caseNumber: "",
        lawyerName: "",
        startDate: "",
        endDate: "",
        outcome: "",
      });
    } else {
      const id = parseInt(pathParts[pathParts.length - 1]);
      if (!isNaN(id)) {
        setIsEdit(true);
        setCaseId(id);
        fetchCase(id);
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

  const fetchCase = async (id: number) => {
    try {
      const res = await fetch(`/api/legal/cases/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("companyId", data.companyId);
        setValue("caseType", data.caseType);
        setValue("title", data.title);
        setValue("description", data.description || "");
        setValue("status", data.status || "pending");
        setValue("courtName", data.courtName || "");
        setValue("caseNumber", data.caseNumber || "");
        setValue("lawyerName", data.lawyerName || "");
        setValue("startDate", data.startDate ? data.startDate.split("T")[0] : "");
        setValue("endDate", data.endDate ? data.endDate.split("T")[0] : "");
        setValue("outcome", data.outcome || "");
      }
    } catch (error) {
      console.error("Error fetching case:", error);
    }
  };

  const onSubmit = async (data: LegalCaseFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/legal/cases/${caseId}` : "/api/legal/cases";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLocation("/admin/legal");
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
    if (!caseId || !confirm("هل أنت متأكد من حذف هذه القضية؟")) return;

    try {
      const res = await fetch(`/api/legal/cases/${caseId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocation("/admin/legal");
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
          <Link href="/admin/legal">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة إلى قائمة القضايا
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "تعديل قضية" : "إضافة قضية جديدة"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشركة *
            </label>
            <select
              {...register("companyId", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              نوع القضية *
            </label>
            <select
              {...register("caseType")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">اختر نوع القضية</option>
              <option value="civil">مدنية</option>
              <option value="commercial">تجارية</option>
              <option value="labor">عمل</option>
              <option value="tax">ضريبية</option>
              <option value="administrative">إدارية</option>
            </select>
            {errors.caseType && (
              <p className="mt-1 text-sm text-red-600">{errors.caseType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان القضية *
            </label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="أدخل عنوان القضية"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="أدخل وصف القضية..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="pending">قيد الانتظار</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="won">منتصرة</option>
              <option value="lost">خاسرة</option>
              <option value="settled">مستقرة</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المحكمة
              </label>
              <input
                {...register("courtName")}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="اسم المحكمة"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم القضية
              </label>
              <input
                {...register("caseNumber")}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="رقم القضية"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المحامي
            </label>
            <input
              {...register("lawyerName")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="اسم المحامي"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ البدء
              </label>
              <input
                {...register("startDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الانتهاء
              </label>
              <input
                {...register("endDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              النتيجة
            </label>
            <input
              {...register("outcome")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="نتيجة القضية"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <Link href="/admin/legal">
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




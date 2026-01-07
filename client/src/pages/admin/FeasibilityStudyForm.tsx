import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const feasibilityStudySchema = z.object({
  projectName: z.string().min(1, "اسم المشروع مطلوب"),
  clientName: z.string().min(1, "اسم العميل مطلوب"),
  clientEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  clientPhone: z.string().optional(),
  projectType: z.string().min(1, "نوع المشروع مطلوب"),
  status: z.string().optional(),
  estimatedCost: z.number().optional(),
  estimatedRevenue: z.number().optional(),
  roi: z.number().optional(),
  conclusion: z.string().optional(),
  reportUrl: z.string().optional(),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
});

type FeasibilityStudyFormData = z.infer<typeof feasibilityStudySchema>;

export default function FeasibilityStudyForm() {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [studyId, setStudyId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<FeasibilityStudyFormData>({
    resolver: zodResolver(feasibilityStudySchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectType: "",
      status: "pending",
      estimatedCost: undefined,
      estimatedRevenue: undefined,
      roi: undefined,
      conclusion: "",
      reportUrl: "",
      startDate: "",
      completionDate: "",
    },
  });

  const estimatedCost = watch("estimatedCost");
  const estimatedRevenue = watch("estimatedRevenue");

  useEffect(() => {
    const pathParts = location.split("/");
    if (pathParts[pathParts.length - 1] === "new") {
      setIsEdit(false);
      reset({
        projectName: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        projectType: "",
        status: "pending",
        estimatedCost: undefined,
        estimatedRevenue: undefined,
        roi: undefined,
        conclusion: "",
        reportUrl: "",
        startDate: "",
        completionDate: "",
      });
    } else {
      const id = parseInt(pathParts[pathParts.length - 1]);
      if (!isNaN(id)) {
        setIsEdit(true);
        setStudyId(id);
        fetchStudy(id);
      }
    }
  }, [location]);

  useEffect(() => {
    if (estimatedCost && estimatedRevenue && estimatedCost > 0) {
      const calculatedROI = ((estimatedRevenue - estimatedCost) / estimatedCost) * 100;
      setValue("roi", Number(calculatedROI.toFixed(2)));
    }
  }, [estimatedCost, estimatedRevenue, setValue]);

  const fetchStudy = async (id: number) => {
    try {
      const res = await fetch(`/api/feasibility/studies/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("projectName", data.projectName);
        setValue("clientName", data.clientName);
        setValue("clientEmail", data.clientEmail || "");
        setValue("clientPhone", data.clientPhone || "");
        setValue("projectType", data.projectType);
        setValue("status", data.status || "pending");
        setValue("estimatedCost", data.estimatedCost);
        setValue("estimatedRevenue", data.estimatedRevenue);
        setValue("roi", data.roi);
        setValue("conclusion", data.conclusion || "");
        setValue("reportUrl", data.reportUrl || "");
        setValue("startDate", data.startDate ? data.startDate.split("T")[0] : "");
        setValue("completionDate", data.completionDate ? data.completionDate.split("T")[0] : "");
      }
    } catch (error) {
      console.error("Error fetching study:", error);
    }
  };

  const onSubmit = async (data: FeasibilityStudyFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/feasibility/studies/${studyId}` : "/api/feasibility/studies";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLocation("/admin/feasibility");
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
    if (!studyId || !confirm("هل أنت متأكد من حذف هذه الدراسة؟")) return;

    try {
      const res = await fetch(`/api/feasibility/studies/${studyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocation("/admin/feasibility");
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
          <Link href="/admin/feasibility">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة إلى قائمة دراسات الجدوى
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "تعديل دراسة جدوى" : "إضافة دراسة جدوى جديدة"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المشروع *
            </label>
            <input
              {...register("projectName")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="أدخل اسم المشروع"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم العميل *
              </label>
              <input
                {...register("clientName")}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="اسم العميل"
              />
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                {...register("clientEmail")}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="email@example.com"
              />
              {errors.clientEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف
            </label>
            <input
              {...register("clientPhone")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="رقم الهاتف"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع المشروع *
            </label>
            <select
              {...register("projectType")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">اختر نوع المشروع</option>
              <option value="industrial">صناعي</option>
              <option value="commercial">تجاري</option>
              <option value="service">خدمي</option>
              <option value="agricultural">زراعي</option>
              <option value="real_estate">عقاري</option>
            </select>
            {errors.projectType && (
              <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                التكلفة المقدرة (ج.م)
              </label>
              <input
                {...register("estimatedCost", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الإيرادات المقدرة (ج.م)
              </label>
              <input
                {...register("estimatedRevenue", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              معدل العائد على الاستثمار (%)
            </label>
            <input
              {...register("roi", { valueAsNumber: true })}
              type="number"
              step="0.01"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="سيتم حسابه تلقائياً"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الانتهاء
              </label>
              <input
                {...register("completionDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط التقرير
            </label>
            <input
              {...register("reportUrl")}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الخلاصة
            </label>
            <textarea
              {...register("conclusion")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="أدخل خلاصة الدراسة..."
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <Link href="/admin/feasibility">
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


import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const taxReturnSchema = z.object({
  companyId: z.number().min(1, "الشركة مطلوبة"),
  taxType: z.string().min(1, "نوع الضريبة مطلوب"),
  period: z.string().min(1, "الفترة مطلوبة"),
  amount: z.number().min(0, "المبلغ يجب أن يكون أكبر من أو يساوي صفر"),
  status: z.string().optional(),
  submissionDate: z.string().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

type TaxReturnFormData = z.infer<typeof taxReturnSchema>;

export default function TaxReturnForm() {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [returnId, setReturnId] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Array<{ id: number; name: string }>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TaxReturnFormData>({
    resolver: zodResolver(taxReturnSchema),
    defaultValues: {
      companyId: 0,
      taxType: "",
      period: "",
      amount: 0,
      status: "draft",
      submissionDate: "",
      dueDate: "",
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
        taxType: "",
        period: "",
        amount: 0,
        status: "draft",
        submissionDate: "",
        dueDate: "",
        notes: "",
      });
    } else {
      const id = parseInt(pathParts[pathParts.length - 1]);
      if (!isNaN(id)) {
        setIsEdit(true);
        setReturnId(id);
        fetchReturn(id);
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

  const fetchReturn = async (id: number) => {
    try {
      const res = await fetch(`/api/tax/returns/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("companyId", data.companyId);
        setValue("taxType", data.taxType);
        setValue("period", data.period);
        setValue("amount", data.amount);
        setValue("status", data.status || "draft");
        setValue("submissionDate", data.submissionDate ? data.submissionDate.split("T")[0] : "");
        setValue("dueDate", data.dueDate ? data.dueDate.split("T")[0] : "");
        setValue("notes", data.notes || "");
      }
    } catch (error) {
      console.error("Error fetching return:", error);
    }
  };

  const onSubmit = async (data: TaxReturnFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/tax/returns/${returnId}` : "/api/tax/returns";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLocation("/admin/tax");
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
    if (!returnId || !confirm("هل أنت متأكد من حذف هذا الإقرار؟")) return;

    try {
      const res = await fetch(`/api/tax/returns/${returnId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocation("/admin/tax");
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
          <Link href="/admin/tax">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة إلى قائمة الإقرارات الضريبية
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "تعديل إقرار ضريبي" : "إضافة إقرار ضريبي جديد"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشركة *
            </label>
            <select
              {...register("companyId", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
              نوع الضريبة *
            </label>
            <select
              {...register("taxType")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">اختر نوع الضريبة</option>
              <option value="vat">ضريبة القيمة المضافة</option>
              <option value="income">ضريبة الدخل</option>
              <option value="corporate">ضريبة الشركات</option>
              <option value="withholding">ضريبة الاستقطاع</option>
            </select>
            {errors.taxType && (
              <p className="mt-1 text-sm text-red-600">{errors.taxType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الفترة (YYYY-MM) *
            </label>
            <input
              {...register("period")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="مثال: 2024-01"
            />
            {errors.period && (
              <p className="mt-1 text-sm text-red-600">{errors.period.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المبلغ (ج.م) *
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="draft">مسودة</option>
              <option value="submitted">مقدمة</option>
              <option value="under_review">قيد المراجعة</option>
              <option value="approved">معتمدة</option>
              <option value="rejected">مرفوضة</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ التقديم
              </label>
              <input
                {...register("submissionDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الاستحقاق
              </label>
              <input
                {...register("dueDate")}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="أدخل أي ملاحظات..."
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <Link href="/admin/tax">
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


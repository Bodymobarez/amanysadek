import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const companySchema = z.object({
  name: z.string().min(1, "اسم الشركة مطلوب"),
  legalForm: z.string().min(1, "الشكل القانوني مطلوب"),
  status: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyForm() {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [companyId, setCompanyId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      legalForm: "",
      status: "pending",
    },
  });

  useEffect(() => {
    const pathParts = location.split("/");
    if (pathParts[pathParts.length - 1] === "new") {
      setIsEdit(false);
      reset({ name: "", legalForm: "", status: "pending" });
    } else {
      const id = parseInt(pathParts[pathParts.length - 1]);
      if (!isNaN(id)) {
        setIsEdit(true);
        setCompanyId(id);
        fetchCompany(id);
      }
    }
  }, [location]);

  const fetchCompany = async (id: number) => {
    try {
      const res = await fetch(`/api/companies/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("name", data.name);
        setValue("legalForm", data.legalForm);
        setValue("status", data.status);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/companies/${companyId}` : "/api/companies";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLocation("/admin/companies");
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
    if (!companyId || !confirm("هل أنت متأكد من حذف هذه الشركة؟")) return;

    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocation("/admin/companies");
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
          <Link href="/admin/companies">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة إلى قائمة الشركات
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "تعديل شركة" : "إضافة شركة جديدة"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الشركة *
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل اسم الشركة"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشكل القانوني *
            </label>
            <select
              {...register("legalForm")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر الشكل القانوني</option>
              <option value="شركة فردية">شركة فردية</option>
              <option value="ذات مسؤولية محدودة">ذات مسؤولية محدودة</option>
              <option value="مساهمة">مساهمة</option>
              <option value="تضامن">تضامن</option>
              <option value="توصية بسيطة">توصية بسيطة</option>
            </select>
            {errors.legalForm && (
              <p className="mt-1 text-sm text-red-600">{errors.legalForm.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">قيد الانتظار</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتملة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <Link href="/admin/companies">
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




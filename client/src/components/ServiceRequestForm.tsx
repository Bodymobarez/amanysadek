import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const serviceRequestSchema = z.object({
  serviceType: z.string().min(1, "نوع الخدمة مطلوب"),
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  company: z.string().optional(),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
  preferredContact: z.enum(["email", "phone", "both"]).optional(),
});

type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

interface ServiceRequestFormProps {
  serviceType: string;
  serviceName: string;
  onSubmitSuccess?: () => void;
}

export function ServiceRequestForm({ 
  serviceType, 
  serviceName,
  onSubmitSuccess 
}: ServiceRequestFormProps) {
  const { toast } = useToast();

  const form = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceType,
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      preferredContact: "both",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ServiceRequestFormData) => {
      const response = await fetch("/api/inquiries/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `نوع الخدمة: ${serviceName}\nرقم الهاتف: ${data.phone}\nالشركة: ${data.company || "غير محدد"}\nطريقة التواصل المفضلة: ${data.preferredContact === "email" ? "بريد إلكتروني" : data.preferredContact === "phone" ? "هاتف" : "كلاهما"}\n\nالرسالة:\n${data.message}`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "حدث خطأ أثناء إرسال الطلب");
      }

      return response.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "تم إرسال الطلب بنجاح!",
        description: `شكراً لك! سنتواصل معك قريباً بخصوص خدمة ${serviceName}.`,
      });
      onSubmitSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشل إرسال الطلب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ServiceRequestFormData) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#4F516F] mb-2">تم إرسال طلبك بنجاح!</h3>
          <p className="text-gray-600 mb-6">
            شكراً لك! سنتواصل معك قريباً بخصوص خدمة {serviceName}.
          </p>
          <button
            onClick={() => {
              form.reset();
              window.location.reload();
            }}
            className="bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] px-6 py-3 rounded-xl font-semibold transition-all"
          >
            إرسال طلب آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#4F516F] mb-2">اطلب خدمة {serviceName}</h3>
        <p className="text-gray-600 text-sm">
          املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
        </p>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">الاسم الكامل *</label>
            <input
              {...form.register("name")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all"
              placeholder="مثال: محمد أحمد"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">البريد الإلكتروني *</label>
            <input
              {...form.register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all"
              placeholder="name@company.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">رقم الهاتف *</label>
            <input
              {...form.register("phone")}
              type="tel"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all"
              placeholder="01XXXXXXXXX"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">اسم الشركة (اختياري)</label>
            <input
              {...form.register("company")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all"
              placeholder="اسم الشركة"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">طريقة التواصل المفضلة</label>
          <select
            {...form.register("preferredContact")}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all"
          >
            <option value="both">بريد إلكتروني وهاتف</option>
            <option value="email">بريد إلكتروني فقط</option>
            <option value="phone">هاتف فقط</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">تفاصيل الطلب *</label>
          <textarea
            {...form.register("message")}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all resize-none"
            placeholder="أخبرنا عن احتياجاتك ونساعدك في اختيار الحل المناسب..."
          />
          {form.formState.errors.message && (
            <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#4F516F] hover:bg-[#3d3f57] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#4F516F]/20 hover:shadow-xl hover:shadow-[#4F516F]/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              جاري إرسال الطلب...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              إرسال طلب الخدمة
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          * الحقول المميزة بعلامة النجمة إلزامية
        </p>
      </form>
    </div>
  );
}


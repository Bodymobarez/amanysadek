import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Loader2, Send } from "lucide-react";
import type { InsertInquiry } from "@shared/schema";

export function ContactForm() {
  const { mutate, isPending } = useCreateInquiry();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-[#4F516F] mb-6">أرسل استفسارك</h3>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">الاسم الكامل</label>
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
          <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">نص الرسالة</label>
          <textarea
            {...form.register("message")}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D6BF78] focus:ring-1 focus:ring-[#D6BF78] transition-all resize-none"
            placeholder="كيف يمكننا مساعدتك؟"
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
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              إرسال الرسالة
            </>
          )}
        </button>
      </form>
    </div>
  );
}

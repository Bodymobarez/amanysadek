import { motion } from "framer-motion";
import { Building2, Calendar, Briefcase } from "lucide-react";

interface Client {
  name: string;
  activity: string;
  startYear: number;
}

const clients: Client[] = [
  { name: "مصر للصناعه والتجاره ( منترا )", activity: "منطقة حرة/ تصدير", startYear: 1997 },
  { name: "الدار المصرية للكتب", activity: "توريدات", startYear: 1997 },
  { name: "عميلى ترافيل للسياحة", activity: "سياحة", startYear: 2010 },
  { name: "الاخوة لتصنيع الاثاث الخشبى", activity: "تصنيع اثاث", startYear: 2008 },
  { name: "ماجى ميديكال", activity: "استيراد اجزة طبية", startYear: 2005 },
  { name: "تواصل لتكنولوجيا المعلومات", activity: "استيراد وتوريدات", startYear: 2008 },
  { name: "سمارت كنترول", activity: "استيراد وتصدير", startYear: 2000 },
  { name: "دى دبلو ايه التجارية والتوكيلات", activity: "توريدات", startYear: 2015 },
  { name: "جيرتيكس لادارة العقارات", activity: "خدمات", startYear: 2020 },
  { name: "اس واى اس للاستشارت", activity: "استشارات", startYear: 2019 },
  { name: "سندال للمقاولات ( شخص واحد )", activity: "مقاولات", startYear: 2020 },
  { name: "كيفوس للدعاية والاعلان", activity: "دعاية واعلان", startYear: 2018 },
  { name: "ديرجيست للطباعة", activity: "صحافة", startYear: 1998 },
  { name: "ديرجيست للاستشارات", activity: "استشارات تسويقية", startYear: 1998 },
  { name: "نيوهوريزون للدعايو الاعلان", activity: "دعاية واعلان", startYear: 2022 },
  { name: "بريميم للتوريدات", activity: "توريدات", startYear: 2022 },
  { name: "برو وان للدعاية والاعلان", activity: "دعاية واعلان", startYear: 2022 },
  { name: "قطب ستيل", activity: "تجارة عامة", startYear: 2023 },
  { name: "شركة المعادى تى ام للدعاية", activity: "دعاية واعلان", startYear: 2023 },
  { name: "اد سوليوشن لصناعة البرمجيات", activity: "تسويق الكترونى", startYear: 2024 },
  { name: "بى تى دى", activity: "تسويق الكترونى", startYear: 2024 },
  { name: "منشأة يونيفيرسال", activity: "مهنى واستيراد واتصدير", startYear: 1997 },
  { name: "يونى تريد للتوكيلات التجارية", activity: "استيراد وتصدير", startYear: 2008 },
  { name: "منشأ العربية للتوريدات", activity: "توريدات", startYear: 2020 },
];

export function ClientsSection() {
  // ترتيب العملاء حسب سنة بداية التعامل (من الأقدم للأحدث)
  const sortedClients = [...clients].sort((a, b) => a.startYear - b.startYear);

  // تجميع العملاء حسب النشاط
  const clientsByActivity = sortedClients.reduce((acc, client) => {
    if (!acc[client.activity]) {
      acc[client.activity] = [];
    }
    acc[client.activity].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  return (
    <section id="clients" className="py-24 bg-gradient-to-br from-[#F7F6F2] to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-[#D6BF78] font-bold text-sm tracking-widest uppercase mb-2 block">
            عملاؤنا
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#4F516F] mb-4">
            أهم عملاء المكتب
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            نفتخر بثقة عملائنا الكرام الذين اختارونا كشريك موثوق في رحلتهم المالية والقانونية
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#4F516F] text-white">
                  <tr>
                    <th className="px-6 py-4 text-right font-bold text-lg">اسم العميل</th>
                    <th className="px-6 py-4 text-right font-bold text-lg">النشاط</th>
                    <th className="px-6 py-4 text-center font-bold text-lg">بداية التعامل</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClients.map((client, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="border-b border-gray-100 hover:bg-[#F7F6F2] transition-colors"
                    >
                      <td className="px-6 py-4 text-right font-semibold text-[#4F516F]">
                        {client.name}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        <span className="inline-flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#D6BF78]" />
                          {client.activity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-2 bg-[#D6BF78]/10 text-[#4F516F] px-3 py-1 rounded-full font-semibold">
                          <Calendar className="w-4 h-4 text-[#D6BF78]" />
                          {client.startYear}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedClients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#D6BF78]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#4F516F] mb-2">
                    {client.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Briefcase className="w-4 h-4 text-[#D6BF78]" />
                    <span>{client.activity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D6BF78]" />
                    <span className="bg-[#D6BF78]/10 text-[#4F516F] px-3 py-1 rounded-full font-semibold text-sm">
                      بداية التعامل: {client.startYear}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-[#D6BF78] mb-2">{clients.length}</div>
            <div className="text-gray-600 font-semibold">عميل</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-[#D6BF78] mb-2">
              {new Date().getFullYear() - Math.min(...clients.map(c => c.startYear))}
            </div>
            <div className="text-gray-600 font-semibold">سنة خبرة</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-[#D6BF78] mb-2">
              {Object.keys(clientsByActivity).length}
            </div>
            <div className="text-gray-600 font-semibold">نشاط مختلف</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
          >
            <div className="text-4xl font-bold text-[#D6BF78] mb-2">
              {clients.filter(c => c.startYear <= 2000).length}
            </div>
            <div className="text-gray-600 font-semibold">عميل منذ 2000</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


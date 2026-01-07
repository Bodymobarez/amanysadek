import { Navigation } from "@/components/Navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { 
  Calculator, 
  Scale, 
  FileText, 
  Briefcase, 
  Users, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Award,
  CheckCircle2,
  Clock,
  Search
} from "lucide-react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp, 
  FaYoutube,
  FaTiktok,
  FaSnapchat
} from "react-icons/fa";

const NAV_LINKS = [
  { name: "الرئيسية", href: "#home" },
  { name: "خدماتنا", href: "#services" },
  { name: "من نحن", href: "#about" },
  { name: "التدريب", href: "#training" },
  { name: "اتصل بنا", href: "#contact" },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[#F7F6F2]">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#4F516F]/90 mix-blend-multiply z-10" />
          {/* Business/Office background */}
          <img 
            src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80" 
            alt="Office background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center md:text-right">
          <div className="max-w-3xl mr-0 md:mr-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-[#D6BF78]/20 text-[#D6BF78] font-bold text-sm mb-6 border border-[#D6BF78]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              شريكك الموثوق في النجاح المالي
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              خبرة قانونية ومحاسبية <span className="text-[#D6BF78]">تثق بها</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              نقدم حلول متكاملة في تأسيس الشركات، المحاسبة، المراجعة، الضرائب والإجراءات القانونية وفق أعلى المعايير المهنية لضمان استقرار ونمو أعمالكم.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] rounded-xl font-bold text-lg shadow-lg shadow-[#D6BF78]/20 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                اطلب استشارة مجانية
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg backdrop-blur-sm transition-all"
              >
                استكشف خدماتنا
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F6F2] to-transparent z-20 pointer-events-none" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="خدماتنا المتميزة" 
            subtitle="ماذا نقدم"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="تأسيس الشركات" 
              description="إجراءات تأسيس شاملة لجميع أنواع الشركات، من التراخيص إلى السجلات التجارية، بسرعة وكفاءة عالية."
              icon={Building2}
              delay={0.1}
              href="/services/company-formation"
            />
            <ServiceCard 
              title="المراجعة والتدقيق" 
              description="خدمات تدقيق مالي وفق المعايير الدولية لضمان دقة وشفافية بياناتك المالية وتعزيز الثقة."
              icon={Search}
              delay={0.2}
              href="/services/auditing"
            />
            <ServiceCard 
              title="الاستشارات الضريبية" 
              description="تخطيط ضريبي ذكي وإعداد الإقرارات (قيمة مضافة، دخل) لضمان الامتثال وتوفير التكاليف."
              icon={Calculator}
              delay={0.3}
              href="/services/tax-consulting"
            />
            <ServiceCard 
              title="الخدمات القانونية" 
              description="صياغة العقود التجارية، وتمثيل قانوني أمام الجهات المختصة لحماية مصالح شركتك."
              icon={Scale}
              delay={0.4}
              href="/services/legal-services"
            />
            <ServiceCard 
              title="دراسات الجدوى" 
              description="دراسات اقتصادية ومالية دقيقة للمشاريع الجديدة تساعدك على اتخاذ قرارات استثمارية مدروسة."
              icon={FileText}
              delay={0.5}
              href="/services/feasibility-studies"
            />
            <ServiceCard 
              title="إدارة الرواتب" 
              description="حلول متكاملة لإدارة كشوف المرتبات والتأمين الاجتماعي لضمان رضا الموظفين والامتثال."
              icon={Users}
              delay={0.6}
              href="/services/payroll-management"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#4F516F] text-white relative overflow-hidden">
        {/* Texture/Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D6BF78 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#D6BF78] font-bold text-sm tracking-widest uppercase mb-2 block">
                من نحن
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                أماني صادق وشركاه <br />
                <span className="text-[#D6BF78]">شغف بالتميز والريادة</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                نحن مكتب محاسبة ومراجعة قانونية معتمد، نجمع بين الخبرة العميقة والمعرفة الحديثة لتقديم خدمات استثنائية لعملائنا. نسعى لأن نكون الشريك الاستراتيجي الأول للشركات في مصر والشرق الأوسط.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                فريقنا يضم نخبة من المحاسبين والمستشارين القانونيين ذوي الكفاءة العالية، ملتزمين بتقديم حلول مبتكرة تناسب تحديات السوق المتغيرة.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D6BF78]/20 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-[#D6BF78] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">خبرة ممتدة</h4>
                    <p className="text-sm text-gray-400">سنوات من العمل المتميز في السوق المصري</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D6BF78]/20 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-[#D6BF78] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">معايير عالمية</h4>
                    <p className="text-sm text-gray-400">تطبيق أحدث معايير المحاسبة والمراجعة</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl rotate-3 blur-sm" />
              {/* Meeting/Professional image */}
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" 
                alt="Team meeting" 
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-24 bg-[#F7F6F2]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="التدريب والتطوير" 
            subtitle="بناء القدرات"
          />

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-64 lg:h-auto">
              {/* Training/Workshop image */}
              <img 
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80" 
                alt="Training session" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#4F516F]/60" />
              <div className="absolute bottom-8 right-8 text-white">
                <h3 className="text-2xl font-bold mb-2">تأهيل المحاسبين لسوق العمل</h3>
                <p className="opacity-90">برامج تدريبية عملية مكثفة</p>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#4F516F] mb-6">نصنع قادة المستقبل المالي</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                نقدم برامج تدريبية متخصصة للطلاب والخريجين والمحاسبين المبتدئين، تركز على التطبيق العملي للأنظمة المحاسبية الحديثة، الضرائب، والمعايير الدولية.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "تدريب عملي على البرامج المحاسبية (Excel, QuickBooks, Odoo)",
                  "ورش عمل في إعداد القوائم المالية والتحليل المالي",
                  "دبلومة الضرائب المصرية والتطبيقات العملية",
                  "شهادات معتمدة وفرص توظيف للمتميزين"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D6BF78]" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className="self-start text-[#4F516F] font-bold hover:text-[#D6BF78] transition-colors flex items-center gap-2 group">
                سجل اهتمامك بالدورات القادمة
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="تواصل معنا" 
            subtitle="نحن هنا للمساعدة"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-[#4F516F] mb-6">معلومات الاتصال</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">
                هل لديك استفسار أو ترغب في تحديد موعد؟ لا تتردد في التواصل معنا. فريقنا جاهز للرد على جميع استفساراتك وتقديم الدعم اللازم.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#F7F6F2] rounded-full flex items-center justify-center shrink-0 text-[#4F516F]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#4F516F] mb-1">الهاتف</h4>
                    <p className="text-gray-500 dir-ltr text-right">+20 123 456 7890</p>
                    <p className="text-gray-500 dir-ltr text-right">+20 100 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#F7F6F2] rounded-full flex items-center justify-center shrink-0 text-[#4F516F]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#4F516F] mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-500">info@amanysadek.com</p>
                    <p className="text-gray-500">support@amanysadek.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#F7F6F2] rounded-full flex items-center justify-center shrink-0 text-[#4F516F]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#4F516F] mb-1">العنوان</h4>
                    <p className="text-gray-500">
                      123 شارع التحرير، الدقي<br />
                      القاهرة، مصر
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#F7F6F2] rounded-full flex items-center justify-center shrink-0 text-[#4F516F]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#4F516F] mb-1">ساعات العمل</h4>
                    <p className="text-gray-500">الأحد - الخميس: 9:00 ص - 5:00 م</p>
                    <p className="text-gray-500">الجمعة والسبت: مغلق</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-10">
                <h4 className="font-bold text-lg text-[#4F516F] mb-4">تابعنا على</h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1877F2] hover:bg-[#1565C0] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1DA1F2] hover:bg-[#0d8bd9] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-[#E4405F] to-[#C13584] hover:from-[#C13584] hover:to-[#E4405F] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0077B5] hover:bg-[#005885] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://wa.me/201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#000000] hover:bg-[#333333] text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="TikTok"
                  >
                    <FaTiktok className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.snapchat.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#FFFC00] hover:bg-[#E6E300] text-black rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md"
                    aria-label="Snapchat"
                  >
                    <FaSnapchat className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4F516F] text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">أماني صادق وشركاه</h2>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                مكتب محاسبة ومراجعة رائد يقدم حلولاً مالية وقانونية متكاملة للشركات والأفراد. نلتزم بأعلى معايير المهنية والشفافية.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#D6BF78]">روابط سريعة</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#D6BF78]">خدماتنا</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">تأسيس الشركات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">المراجعة والتدقيق</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الضرائب</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">دراسات الجدوى</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} أماني صادق وشركاه. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-[#D6BF78] transition-colors">Facebook</a>
              <a href="#" className="text-gray-500 hover:text-[#D6BF78] transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-500 hover:text-[#D6BF78] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

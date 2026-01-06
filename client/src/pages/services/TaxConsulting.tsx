import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Calculator, CheckCircle2, FileText, Shield, TrendingDown, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function TaxConsulting() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي أنواع الإقرارات الضريبية التي تقدمونها؟",
      answer: "نقدم جميع أنواع الإقرارات الضريبية: إقرارات ضريبة الدخل، ضريبة القيمة المضافة، ضريبة المبيعات، وإقرارات الضرائب الخاصة. كل إقرار يتم إعداده بدقة وفقاً للقوانين."
    },
    {
      question: "كيف يمكنكم مساعدتي في تقليل الأعباء الضريبية؟",
      answer: "نقدم تخطيط ضريبي استراتيجي يساعدك في الاستفادة من جميع الإعفاءات والخصومات القانونية. نحلل وضعك الضريبي ونقدم توصيات مخصصة لتقليل الأعباء بشكل قانوني."
    },
    {
      question: "متى يجب تقديم الإقرارات الضريبية؟",
      answer: "مواعيد تقديم الإقرارات تختلف حسب نوع الضريبة. ضريبة القيمة المضافة شهرياً، ضريبة الدخل سنوياً. سنزودك بجدول مواعيد شامل ونذكرك قبل كل موعد."
    },
    {
      question: "هل تتعاملون مع الفحوصات الضريبية؟",
      answer: "نعم، نقدم خدمات شاملة للتعامل مع الفحوصات الضريبية. نعدك للفحص، نرافقك أثناءه، ونتعامل مع جميع الإجراءات اللازمة لضمان حماية مصالحك."
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F7F6F2]">
      <Navigation />

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#4F516F] to-[#3d3f57] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #D6BF78 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#D6BF78]/20 px-4 py-2 rounded-full mb-6 border border-[#D6BF78]/30 backdrop-blur-sm">
              <Calculator className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">الاستشارات الضريبية</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">خدمات الاستشارات الضريبية المتخصصة</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم استشارات ضريبية متخصصة لمساعدتك في إدارة التزاماتك الضريبية وتقليل الأعباء الضريبية بشكل قانوني. خبرتنا الواسعة تضمن لك أفضل الحلول.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  window.location.href = '/#contact';
                }}
                className="bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:scale-105"
              >
                اطلب استشارة مجانية
              </button>
              <Link href="/admin/tax">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 transition-all">
                  لوحة الإدارة
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#4F516F] mb-6">نظرة عامة على الخدمة</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  الاستشارات الضريبية هي خدمة متخصصة تساعدك في فهم وإدارة التزاماتك الضريبية بشكل فعال. نحن نقدم استشارات شاملة تغطي جميع جوانب الضرائب.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا من المستشارين الضريبيين المعتمدين لديه خبرة واسعة في التعامل مع جميع أنواع الضرائب. نساعدك في تقليل الأعباء الضريبية بشكل قانوني وآمن.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">مستشارون معتمدون</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">توفير في التكاليف</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
                  alt="Tax Consulting" 
                  className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Section - Detailed */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا في الاستشارات الضريبية</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الضريبية لمساعدتك في إدارة التزاماتك الضريبية
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {[
              {
                category: "خدمات الإقرارات الضريبية",
                services: [
                  {
                    title: "إقرارات ضريبة الدخل",
                    description: "إعداد إقرارات ضريبة الدخل للشركات والأفراد",
                    features: ["إقرارات الشركات", "إقرارات الأفراد", "إقرارات المهن الحرة", "إقرارات الاستثمارات"]
                  },
                  {
                    title: "إقرارات ضريبة القيمة المضافة",
                    description: "إعداد إقرارات ضريبة القيمة المضافة الشهرية",
                    features: ["إقرارات شهرية", "إقرارات ربع سنوية", "تصحيح الإقرارات", "المطالبات"]
                  },
                  {
                    title: "إقرارات ضريبة المبيعات",
                    description: "إعداد إقرارات ضريبة المبيعات",
                    features: ["إقرارات المبيعات", "إقرارات الخدمات", "تصحيح الإقرارات", "المطالبات"]
                  },
                  {
                    title: "إقرارات الضرائب الخاصة",
                    description: "إعداد إقرارات الضرائب الخاصة",
                    features: ["ضريبة الأرباح الرأسمالية", "ضريبة العقارات", "ضريبة الأرباح التجارية", "ضرائب أخرى"]
                  }
                ]
              },
              {
                category: "خدمات التخطيط الضريبي",
                services: [
                  {
                    title: "تحليل الوضع الضريبي",
                    description: "تحليل شامل للوضع الضريبي الحالي",
                    features: ["تحليل الالتزامات", "تحليل الفرص", "تحديد المخاطر", "توصيات"]
                  },
                  {
                    title: "التخطيط الضريبي الاستراتيجي",
                    description: "تخطيط ضريبي استراتيجي طويل المدى",
                    features: ["تخطيط سنوي", "تخطيط طويل المدى", "استراتيجيات مخصصة", "توصيات"]
                  },
                  {
                    title: "تحسين الهيكل الضريبي",
                    description: "تحسين الهيكل الضريبي للشركة",
                    features: ["تحليل الهيكل", "توصيات التحسين", "تطبيق التحسينات", "متابعة"]
                  },
                  {
                    title: "استراتيجيات تقليل الأعباء",
                    description: "استراتيجيات قانونية لتقليل الأعباء الضريبية",
                    features: ["تحليل الفرص", "تطبيق الإعفاءات", "تحسين الهيكل", "توفير التكاليف"]
                  }
                ]
              },
              {
                category: "خدمات الفحوصات الضريبية",
                services: [
                  {
                    title: "التحضير للفحص الضريبي",
                    description: "إعداد شامل للفحص الضريبي",
                    features: ["مراجعة المستندات", "إعداد الملفات", "التحضير للفحص", "تدريب الفريق"]
                  },
                  {
                    title: "التمثيل في الفحوصات",
                    description: "التمثيل القانوني في الفحوصات الضريبية",
                    features: ["حضور الفحوصات", "الرد على الاستفسارات", "تقديم المستندات", "المفاوضات"]
                  },
                  {
                    title: "حل النزاعات الضريبية",
                    description: "حل النزاعات مع الجهات الضريبية",
                    features: ["تحليل النزاع", "إعداد الملفات", "المفاوضات", "التسوية"]
                  },
                  {
                    title: "الاستئنافات الضريبية",
                    description: "تقديم الاستئنافات الضريبية",
                    features: ["إعداد الاستئناف", "تقديم الاستئناف", "المتابعة", "التمثيل القانوني"]
                  }
                ]
              },
              {
                category: "خدمات المتابعة والدعم",
                services: [
                  {
                    title: "المتابعة الضريبية",
                    description: "متابعة مستمرة للوضع الضريبي",
                    features: ["متابعة دورية", "تذكيرات مهمة", "تقارير ضريبية", "إشعارات فورية"]
                  },
                  {
                    title: "الاستشارات الضريبية",
                    description: "استشارات ضريبية متخصصة",
                    features: ["استشارات قانونية", "تحليل القضايا", "حلول مخصصة", "دعم مستمر"]
                  },
                  {
                    title: "التعامل مع الجهات الضريبية",
                    description: "التعامل مع جميع الجهات الضريبية",
                    features: ["تقديم الإقرارات", "المتابعة مع المصلحة", "حل النزاعات", "التمثيل القانوني"]
                  },
                  {
                    title: "التحديثات القانونية",
                    description: "تحديثات مستمرة عن القوانين الضريبية",
                    features: ["تحديثات قانونية", "تحليل التغييرات", "توصيات", "تدريب"]
                  }
                ]
              }
            ].map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-[#D6BF78]">
                  <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-[#D6BF78]" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#4F516F]">{category.category}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group">
                      <h4 className="text-xl font-bold text-[#4F516F] mb-3 group-hover:text-[#D6BF78] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-[#D6BF78] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#4F516F] to-[#3d3f57] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">لماذا تختارنا؟</h2>
              <p className="text-xl text-gray-300">نقدم لك أفضل الخدمات بأعلى معايير الجودة</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Award, title: "خبرة واسعة", desc: "أكثر من 15 عاماً في الاستشارات الضريبية" },
                { icon: Shield, title: "فريق محترف", desc: "مستشارون ضريبيون معتمدون" },
                { icon: CheckCircle2, title: "دقة عالية", desc: "نضمن دقة جميع الإقرارات" },
                { icon: TrendingDown, title: "توفير في التكاليف", desc: "نساعدك في تقليل الأعباء الضريبية" },
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل الإقرارات في الوقت المحدد" },
                { icon: Phone, title: "دعم مستمر", desc: "فريق دعم متاح على مدار الساعة" }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                  <benefit.icon className="w-10 h-10 text-[#D6BF78] mb-4" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">عملية الاستشارة الضريبية</h2>
              <p className="text-xl text-gray-600">خطوات واضحة ومنظمة</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "التحليل الأولي", desc: "نحلل وضعك الضريبي الحالي ونحدد الفرص والتحديات", duration: "2-3 أيام" },
                { step: "2", title: "التخطيط الاستراتيجي", desc: "نضع خطة ضريبية مخصصة لتقليل الأعباء وتحسين الوضع", duration: "3-5 أيام" },
                { step: "3", title: "إعداد الإقرارات", desc: "نعد جميع الإقرارات الضريبية بدقة ووفقاً للقوانين", duration: "5-7 أيام" },
                { step: "4", title: "التقديم والمتابعة", desc: "نتولى تقديم الإقرارات ومتابعة جميع الإجراءات", duration: "مستمر" },
                { step: "5", title: "الدعم المستمر", desc: "نقدم دعم مستمر واستشارات دورية لضمان الامتثال", duration: "مستمر" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group">
                  <div className="w-20 h-20 bg-[#D6BF78] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-[#4F516F]">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-[#4F516F]">{item.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.duration}</span>
                    </div>
                    <p className="text-gray-600 text-lg">{item.desc}</p>
                  </div>
                  {idx < 4 && (
                    <ArrowRight className="w-6 h-6 text-[#D6BF78] hidden md:block flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">الأسئلة الشائعة</h2>
              <p className="text-xl text-gray-600">إجابات على أكثر الأسئلة شيوعاً</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <HelpCircle className="w-5 h-5 text-[#D6BF78] flex-shrink-0" />
                      <span className="font-semibold text-[#4F516F] text-lg">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">ابدأ استشارتك الضريبية اليوم</h2>
              <p className="text-xl text-gray-600">تواصل معنا للحصول على استشارة مجانية</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#4F516F] mb-4">معلومات التواصل</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-[#4F516F]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#4F516F]">الهاتف</p>
                        <p className="text-gray-600">+20 123 456 7890</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-[#4F516F]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#4F516F]">البريد الإلكتروني</p>
                        <p className="text-gray-600">info@amanysadek.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#4F516F]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#4F516F]">العنوان</p>
                        <p className="text-gray-600">القاهرة، مصر</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

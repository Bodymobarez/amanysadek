import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { FileCheck, CheckCircle2, Shield, TrendingUp, BarChart3, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, FileText, Search, Eye, Calculator, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Auditing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي أنواع المراجعة التي تقدمونها؟",
      answer: "نقدم أنواعاً متعددة من المراجعة: مراجعة القوائم المالية، التدقيق الداخلي، مراجعة الامتثال، ومراجعة العمليات. كل نوع مصمم لاحتياجات محددة."
    },
    {
      question: "كم تستغرق عملية المراجعة؟",
      answer: "مدة المراجعة تعتمد على حجم الشركة وتعقيد العمليات. عادة ما تستغرق من أسبوعين إلى شهرين. سنزودك بجدول زمني مفصل عند بدء العملية."
    },
    {
      question: "ما هي المعايير التي تتبعونها في المراجعة؟",
      answer: "نتبع المعايير المحاسبية الدولية (IFRS) والمعايير المصرية للمحاسبة والمراجعة. جميع تقاريرنا متوافقة مع أفضل الممارسات العالمية."
    },
    {
      question: "هل تقدمون خدمات المراجعة المستمرة؟",
      answer: "نعم، نقدم خدمات مراجعة دورية (ربع سنوية، نصف سنوية، سنوية) لضمان استمرارية الامتثال والدقة في البيانات المالية."
    }
  ];

  // جميع الخدمات الفرعية للمراجعة والتدقيق
  const allServices = [
    {
      category: "خدمات المراجعة الأساسية",
      services: [
        {
          title: "مراجعة القوائم المالية السنوية",
          description: "مراجعة شاملة للقوائم المالية السنوية وفقاً للمعايير المحاسبية",
          features: ["مراجعة الميزانية العمومية", "مراجعة قائمة الدخل", "مراجعة قائمة التدفقات النقدية", "مراجعة قائمة حقوق الملكية", "تقرير المراجع"]
        },
        {
          title: "مراجعة القوائم المالية المرحلية",
          description: "مراجعة القوائم المالية ربع سنوية ونصف سنوية",
          features: ["مراجعة ربع سنوية", "مراجعة نصف سنوية", "تقارير مرحلية", "تحليل الأداء"]
        },
        {
          title: "مراجعة القوائم المالية المختصرة",
          description: "مراجعة مختصرة للقوائم المالية للشركات الصغيرة",
          features: ["مراجعة مختصرة", "تقرير مبسط", "تحليل أساسي", "توصيات"]
        },
        {
          title: "مراجعة القوائم المالية المدمجة",
          description: "مراجعة القوائم المالية المدمجة للمجموعات",
          features: ["مراجعة مدمجة", "تحليل المجموعة", "تقارير شاملة", "توصيات متكاملة"]
        }
      ]
    },
    {
      category: "خدمات التدقيق الداخلي",
      services: [
        {
          title: "تدقيق الأنظمة والضوابط الداخلية",
          description: "تدقيق شامل للأنظمة والضوابط الداخلية",
          features: ["تقييم الأنظمة", "فحص الضوابط", "تحديد الثغرات", "توصيات التحسين"]
        },
        {
          title: "تدقيق العمليات التشغيلية",
          description: "تدقيق العمليات التشغيلية والمالية",
          features: ["تدقيق العمليات", "تحليل الكفاءة", "تحديد المخاطر", "تحسين العمليات"]
        },
        {
          title: "تدقيق الامتثال",
          description: "تدقيق الامتثال للقوانين واللوائح",
          features: ["فحص الامتثال", "تحديد المخالفات", "توصيات الامتثال", "تقارير الامتثال"]
        },
        {
          title: "تدقيق المخاطر",
          description: "تقييم وإدارة المخاطر المالية والتشغيلية",
          features: ["تحديد المخاطر", "تقييم المخاطر", "إدارة المخاطر", "تقارير المخاطر"]
        }
      ]
    },
    {
      category: "خدمات التحليل المالي",
      services: [
        {
          title: "تحليل النسب المالية",
          description: "تحليل شامل للنسب المالية والمؤشرات",
          features: ["نسب السيولة", "نسب الربحية", "نسب المديونية", "نسب الكفاءة"]
        },
        {
          title: "تحليل التدفقات النقدية",
          description: "تحليل شامل للتدفقات النقدية",
          features: ["تحليل التدفقات", "التنبؤ بالتدفقات", "إدارة السيولة", "توصيات"]
        },
        {
          title: "تحليل الأداء المالي",
          description: "تحليل شامل للأداء المالي والمالي",
          features: ["تحليل الربحية", "تحليل النمو", "تحليل الكفاءة", "مقارنات معيارية"]
        },
        {
          title: "التقييم المالي",
          description: "تقييم القيمة المالية للشركة",
          features: ["تقييم الأصول", "تقييم الشركة", "تقييم الاستثمارات", "تقارير التقييم"]
        }
      ]
    },
    {
      category: "خدمات التقارير المالية",
      services: [
        {
          title: "تقارير المراجعة",
          description: "إعداد تقارير مراجعة شاملة ومفصلة",
          features: ["تقرير المراجع", "تقرير المراجعة المختصرة", "تقرير المراجعة المطولة", "تقرير خاص"]
        },
        {
          title: "تقارير التحليل المالي",
          description: "إعداد تقارير تحليل مالي مفصلة",
          features: ["تقارير دورية", "تقارير خاصة", "تقارير تحليلية", "تقارير تنبؤية"]
        },
        {
          title: "تقارير الامتثال",
          description: "إعداد تقارير الامتثال للقوانين واللوائح",
          features: ["تقارير الامتثال الضريبي", "تقارير الامتثال التجاري", "تقارير الامتثال المالي", "تقارير شاملة"]
        },
        {
          title: "تقارير التدقيق الداخلي",
          description: "إعداد تقارير تدقيق داخلي مفصلة",
          features: ["تقارير الأنظمة", "تقارير العمليات", "تقارير المخاطر", "تقارير التحسين"]
        }
      ]
    },
    {
      category: "خدمات المراجعة المتخصصة",
      services: [
        {
          title: "مراجعة المشاريع",
          description: "مراجعة مالية للمشاريع والاستثمارات",
          features: ["مراجعة المشاريع", "تحليل الجدوى", "تقييم الأداء", "تقارير المشاريع"]
        },
        {
          title: "مراجعة العقود",
          description: "مراجعة مالية للعقود والاتفاقيات",
          features: ["مراجعة العقود", "تحليل التكاليف", "تقييم المخاطر", "توصيات"]
        },
        {
          title: "مراجعة الاستثمارات",
          description: "مراجعة مالية للاستثمارات والمحافظ",
          features: ["مراجعة الاستثمارات", "تحليل العوائد", "تقييم المخاطر", "توصيات الاستثمار"]
        },
        {
          title: "مراجعة خاصة",
          description: "مراجعة مالية خاصة حسب الطلب",
          features: ["مراجعة مخصصة", "تحليل خاص", "تقارير خاصة", "توصيات مخصصة"]
        }
      ]
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
              <FileCheck className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">المراجعة والتدقيق</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">خدمات المراجعة والتدقيق المحاسبي</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم خدمات مراجعة وتدقيق محاسبي شاملة وفقاً للمعايير الدولية. نضمن دقة القوائم المالية وشفافيتها لتعزيز ثقة المستثمرين والجهات الرقابية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  window.location.href = '/#contact';
                }}
                className="bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:scale-105">
                اطلب استشارة مجانية
              </button>
              <Link href="/admin/auditing">
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
                  المراجعة والتدقيق المحاسبي هي عملية فحص مستقلة للقوائم المالية والأنظمة المحاسبية لضمان دقتها وشفافيتها. نحن نقدم خدمات مراجعة شاملة وفقاً للمعايير الدولية.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا من المحاسبين القانونيين المعتمدين لديه خبرة واسعة في مراجعة جميع أنواع الشركات. نستخدم أحدث الأدوات والتقنيات لضمان دقة وشمولية المراجعة.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">محاسبون معتمدون</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">معايير دولية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">دقة 100%</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" 
                  alt="Auditing" 
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
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا في المراجعة والتدقيق</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات لضمان دقة وشفافية القوائم المالية
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {allServices.map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-[#D6BF78]">
                  <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-[#D6BF78]" />
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
                { icon: Award, title: "فريق محترف", desc: "محاسبون قانونيون معتمدون" },
                { icon: Shield, title: "معايير دولية", desc: "نتبع المعايير المحاسبية الدولية" },
                { icon: CheckCircle2, title: "دقة عالية", desc: "نضمن دقة جميع التقارير" },
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل المراجعة في الوقت المحدد" },
                { icon: TrendingUp, title: "أسعار تنافسية", desc: "أفضل الأسعار في السوق" },
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">عملية المراجعة</h2>
              <p className="text-xl text-gray-600">خطوات واضحة ومنظمة</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "التخطيط", desc: "نضع خطة مراجعة شاملة بناءً على حجم ونوع الشركة", duration: "3-5 أيام" },
                { step: "2", title: "الفحص الأولي", desc: "نفحص الأنظمة المحاسبية والمالية الأساسية", duration: "5-7 أيام" },
                { step: "3", title: "المراجعة التفصيلية", desc: "نراجع جميع القوائم المالية والمستندات بالتفصيل", duration: "10-15 يوم" },
                { step: "4", title: "إعداد التقرير", desc: "نعد تقرير مراجعة شامل مع التوصيات", duration: "3-5 أيام" },
                { step: "5", title: "التسليم والمتابعة", desc: "نسلم التقرير ونقدم الدعم والمتابعة", duration: "مستمر" }
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">ابدأ مراجعة شركتك اليوم</h2>
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

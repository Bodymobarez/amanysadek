import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Briefcase, CheckCircle2, TrendingUp, BarChart3, FileText, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, Target } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function FeasibilityStudies() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي مدة إعداد دراسة الجدوى؟",
      answer: "مدة إعداد دراسة الجدوى تعتمد على حجم وتعقيد المشروع. عادة ما تستغرق من 3 إلى 8 أسابيع. للمشاريع الكبيرة قد تستغرق وقتاً أطول."
    },
    {
      question: "ما هي أقسام دراسة الجدوى؟",
      answer: "تتكون دراسة الجدوى من عدة أقسام: الدراسة السوقية، الدراسة الفنية، الدراسة المالية، الدراسة القانونية، والدراسة البيئية. كل قسم يقدم تحليلاً شاملاً."
    },
    {
      question: "هل تساعدون في تنفيذ المشروع بعد الدراسة؟",
      answer: "نعم، نقدم خدمات متابعة وتنفيذ بعد إعداد دراسة الجدوى. نساعدك في تطبيق التوصيات ومراقبة تنفيذ المشروع."
    },
    {
      question: "ما هي تكلفة دراسة الجدوى؟",
      answer: "تكلفة دراسة الجدوى تختلف حسب حجم المشروع وتعقيده. نقدم استشارة أولية مجانية لتقييم احتياجاتك وتقديم عرض سعر مناسب."
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
              <Briefcase className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">دراسات الجدوى</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">دراسات الجدوى الشاملة</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم دراسات جدوى شاملة ومفصلة لمشاريعك لمساعدتك في اتخاذ القرارات الاستثمارية الصحيحة. خبرتنا تضمن لك تحليلاً دقيقاً وموثوقاً.
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
              <Link href="/admin/feasibility">
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
                  دراسة الجدوى هي تحليل شامل لتقييم جدوى مشروعك من جميع الجوانب. نحن نقدم دراسات جدوى شاملة تغطي جميع العوامل المؤثرة على نجاح المشروع.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا من الخبراء الاقتصاديين والمحللين الماليين لديه خبرة واسعة في إعداد دراسات الجدوى لمختلف أنواع المشاريع. نضمن لك تحليلاً دقيقاً وموثوقاً.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">خبراء معتمدون</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">تحليل دقيق</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
                  alt="Feasibility Studies" 
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
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا في دراسات الجدوى</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم دراسات جدوى شاملة تغطي جميع جوانب المشروع
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {[
              {
                category: "الدراسات المالية والاقتصادية",
                services: [
                  {
                    title: "تحليل التكاليف",
                    description: "تحليل شامل لتكاليف المشروع",
                    features: ["التكاليف الاستثمارية", "التكاليف التشغيلية", "التكاليف الرأسمالية", "تحليل التكاليف"]
                  },
                  {
                    title: "تحليل الإيرادات",
                    description: "تحليل شامل لإيرادات المشروع",
                    features: ["الإيرادات المتوقعة", "تحليل المبيعات", "تحليل الأسعار", "تحليل الإيرادات"]
                  },
                  {
                    title: "تحليل الربحية",
                    description: "تحليل شامل لربحية المشروع",
                    features: ["معدل العائد", "فترة الاسترداد", "صافي القيمة الحالية", "معدل العائد الداخلي"]
                  },
                  {
                    title: "تحليل التدفقات النقدية",
                    description: "تحليل شامل للتدفقات النقدية",
                    features: ["التدفقات الداخلة", "التدفقات الخارجة", "صافي التدفقات", "تحليل السيولة"]
                  }
                ]
              },
              {
                category: "الدراسات السوقية",
                services: [
                  {
                    title: "تحليل السوق",
                    description: "تحليل شامل للسوق المستهدف",
                    features: ["حجم السوق", "نمو السوق", "اتجاهات السوق", "فرص السوق"]
                  },
                  {
                    title: "تحليل المنافسين",
                    description: "تحليل شامل للمنافسين",
                    features: ["تحليل المنافسين", "نقاط القوة والضعف", "الاستراتيجيات", "الميزة التنافسية"]
                  },
                  {
                    title: "تحليل العملاء",
                    description: "تحليل شامل للعملاء المستهدفين",
                    features: ["شريحة العملاء", "احتياجات العملاء", "سلوك الشراء", "رضا العملاء"]
                  },
                  {
                    title: "تحليل الطلب",
                    description: "تحليل شامل للطلب على المنتج",
                    features: ["حجم الطلب", "اتجاهات الطلب", "العوامل المؤثرة", "التنبؤ بالطلب"]
                  }
                ]
              },
              {
                category: "الدراسات الفنية",
                services: [
                  {
                    title: "الموارد المطلوبة",
                    description: "تحليل الموارد المطلوبة للمشروع",
                    features: ["الموارد البشرية", "الموارد المادية", "الموارد المالية", "الموارد التقنية"]
                  },
                  {
                    title: "التكنولوجيا",
                    description: "تحليل التكنولوجيا المطلوبة",
                    features: ["التكنولوجيا المتاحة", "اختيار التكنولوجيا", "تكلفة التكنولوجيا", "تطوير التكنولوجيا"]
                  },
                  {
                    title: "العمليات",
                    description: "تحليل العمليات التشغيلية",
                    features: ["العمليات الإنتاجية", "العمليات الخدمية", "تحسين العمليات", "إدارة العمليات"]
                  },
                  {
                    title: "البنية التحتية",
                    description: "تحليل البنية التحتية المطلوبة",
                    features: ["الموقع", "المرافق", "البنية التحتية", "الخدمات"]
                  }
                ]
              },
              {
                category: "الدراسات القانونية والبيئية",
                services: [
                  {
                    title: "التراخيص والتصاريح",
                    description: "تحليل التراخيص والتصاريح المطلوبة",
                    features: ["التراخيص التجارية", "التراخيص الصناعية", "التراخيص البيئية", "التصاريح"]
                  },
                  {
                    title: "القوانين واللوائح",
                    description: "تحليل القوانين واللوائح المؤثرة",
                    features: ["القوانين التجارية", "القوانين العمالية", "القوانين البيئية", "اللوائح"]
                  },
                  {
                    title: "الامتثال القانوني",
                    description: "تحليل متطلبات الامتثال القانوني",
                    features: ["متطلبات الامتثال", "تقييم المخاطر", "توصيات الامتثال", "التقارير"]
                  },
                  {
                    title: "المخاطر القانونية",
                    description: "تحليل المخاطر القانونية",
                    features: ["تحديد المخاطر", "تقييم المخاطر", "إدارة المخاطر", "التخفيف من المخاطر"]
                  }
                ]
              },
              {
                category: "التقارير والتوصيات",
                services: [
                  {
                    title: "التقرير النهائي",
                    description: "تقرير شامل بجميع النتائج",
                    features: ["تحليل شامل", "النتائج", "التوصيات", "الخلاصة"]
                  },
                  {
                    title: "خطة التنفيذ",
                    description: "خطة شاملة لتنفيذ المشروع",
                    features: ["المراحل", "الجدول الزمني", "الموارد", "الميزانية"]
                  },
                  {
                    title: "التوصيات",
                    description: "توصيات عملية قابلة للتطبيق",
                    features: ["توصيات مالية", "توصيات فنية", "توصيات قانونية", "توصيات عامة"]
                  },
                  {
                    title: "المتابعة والدعم",
                    description: "متابعة ودعم بعد إعداد الدراسة",
                    features: ["متابعة التنفيذ", "دعم فني", "استشارات", "تحديثات"]
                  }
                ]
              }
            ].map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-[#D6BF78]">
                  <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-[#D6BF78]" />
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
                { icon: Award, title: "خبرة واسعة", desc: "أكثر من 15 عاماً في دراسات الجدوى" },
                { icon: Target, title: "تحليل دقيق", desc: "تحليل شامل ودقيق لجميع الجوانب" },
                { icon: CheckCircle2, title: "توصيات عملية", desc: "توصيات قابلة للتطبيق" },
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل الدراسة في الوقت المحدد" },
                { icon: TrendingUp, title: "أسعار عادلة", desc: "أسعار تنافسية وشفافة" },
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">عملية إعداد دراسة الجدوى</h2>
              <p className="text-xl text-gray-600">خطوات واضحة ومنظمة</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "الاستشارة الأولية", desc: "نستمع لفكرتك ونقدم الاستشارة الأولية", duration: "يوم واحد" },
                { step: "2", title: "جمع البيانات", desc: "نجمع جميع البيانات والمعلومات المطلوبة", duration: "3-5 أيام" },
                { step: "3", title: "التحليل الشامل", desc: "نحلل جميع جوانب المشروع (مالي، سوقي، فني، قانوني)", duration: "10-15 يوم" },
                { step: "4", title: "إعداد التقرير", desc: "نعد تقرير شامل بجميع النتائج والتوصيات", duration: "5-7 أيام" },
                { step: "5", title: "التسليم والعرض", desc: "نسلم التقرير ونعرض النتائج والتوصيات", duration: "يوم واحد" }
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">ابدأ دراسة جدوى مشروعك اليوم</h2>
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

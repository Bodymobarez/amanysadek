import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { Building2, CheckCircle2, FileText, Users, Shield, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, TrendingUp, FileCheck, Briefcase, Scale, Globe } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function CompanyFormation() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "كم تستغرق عملية تأسيس الشركة؟",
      answer: "عادة ما تستغرق عملية تأسيس الشركة من 7 إلى 15 يوم عمل، حسب نوع الشركة والإجراءات المطلوبة. نحن نضمن إتمام جميع الإجراءات في أقصر وقت ممكن."
    },
    {
      question: "ما هي المستندات المطلوبة لتأسيس الشركة؟",
      answer: "المستندات المطلوبة تختلف حسب نوع الشركة، ولكن بشكل عام تشمل: صور شخصية للشركاء، بطاقات الهوية الوطنية، شهادات السكن، وبيانات الشركاء. سنزودك بقائمة كاملة عند بدء العملية."
    },
    {
      question: "هل يمكن تأسيس شركة برأس مال صغير؟",
      answer: "نعم، يمكن تأسيس شركة ذات مسؤولية محدودة برأس مال يبدأ من 1000 جنيه مصري. سنساعدك في تحديد رأس المال المناسب لنشاطك."
    },
    {
      question: "ما الفرق بين أنواع الشركات المختلفة؟",
      answer: "هناك عدة أنواع من الشركات: شركة ذات مسؤولية محدودة (الأكثر شيوعاً)، شركة مساهمة، شركة تضامن، وشركة توصية. سنساعدك في اختيار النوع المناسب لنشاطك."
    }
  ];

  // جميع الخدمات الفرعية لتأسيس الشركات
  const allServices = [
    {
      category: "خدمات التأسيس الأساسية",
      services: [
        {
          title: "تأسيس شركة ذات مسؤولية محدودة",
          description: "تأسيس شركة ذات مسؤولية محدودة مع جميع الإجراءات القانونية",
          features: ["إعداد عقد التأسيس", "التسجيل في السجل التجاري", "إصدار السجل الضريبي", "إصدار البطاقة الضريبية", "فتح حساب بنكي"]
        },
        {
          title: "تأسيس شركة مساهمة",
          description: "تأسيس شركة مساهمة مع جميع المتطلبات القانونية",
          features: ["إعداد النظام الأساسي", "تسجيل رأس المال", "إصدار الأسهم", "التسجيل في البورصة (اختياري)", "إصدار جميع التراخيص"]
        },
        {
          title: "تأسيس شركة تضامن",
          description: "تأسيس شركة تضامن مع اتفاقية الشراكة",
          features: ["إعداد عقد التضامن", "تسجيل الشركاء", "إصدار التراخيص", "التسجيل التجاري", "السجلات الضريبية"]
        },
        {
          title: "تأسيس شركة توصية",
          description: "تأسيس شركة توصية بسيطة أو بالأسهم",
          features: ["إعداد عقد التوصية", "تسجيل الشركاء المتضامنين", "تسجيل الشركاء الموصين", "إصدار التراخيص", "التسجيل الكامل"]
        }
      ]
    },
    {
      category: "خدمات التوثيق القانوني",
      services: [
        {
          title: "إعداد عقد التأسيس",
          description: "إعداد عقد تأسيس شامل ومتوافق مع القوانين المصرية",
          features: ["صياغة العقد", "مراجعة قانونية", "التوقيع والتصديق", "التوثيق الرسمي"]
        },
        {
          title: "إعداد النظام الأساسي",
          description: "إعداد النظام الأساسي للشركة مع جميع البنود",
          features: ["صياغة النظام", "تحديد الهيكل الإداري", "قواعد التصويت", "توزيع الأرباح"]
        },
        {
          title: "محاضر الجمعيات",
          description: "إعداد محاضر الجمعيات العمومية والخاصة",
          features: ["محاضر التأسيس", "محاضر الجمعيات العادية", "محاضر الجمعيات غير العادية", "التوثيق"]
        },
        {
          title: "سجلات الشركة",
          description: "إعداد جميع سجلات الشركة المطلوبة قانونياً",
          features: ["سجل الشركاء", "سجل الأسهم", "سجل الجمعيات", "سجل القرارات"]
        }
      ]
    },
    {
      category: "خدمات التراخيص والتصاريح",
      services: [
        {
          title: "تراخيص النشاط",
          description: "الحصول على جميع تراخيص النشاط المطلوبة",
          features: ["ترخيص تجاري", "ترخيص صناعي", "ترخيص خدمي", "تراخيص خاصة"]
        },
        {
          title: "تصاريح البناء",
          description: "الحصول على تصاريح البناء والتشييد",
          features: ["تصريح البناء", "تصريح الهدم", "تصريح التعديل", "شهادة الإتمام"]
        },
        {
          title: "تراخيص البيئة",
          description: "الحصول على تراخيص البيئة والسلامة",
          features: ["ترخيص بيئي", "شهادة السلامة", "ترخيص النفايات", "شهادة المطابقة"]
        },
        {
          title: "تراخيص الاستيراد والتصدير",
          description: "الحصول على تراخيص الاستيراد والتصدير",
          features: ["سجل المستوردين", "سجل المصدرين", "تراخيص خاصة", "شهادات المنشأ"]
        }
      ]
    },
    {
      category: "خدمات إدارة الشركاء",
      services: [
        {
          title: "تسجيل الشركاء",
          description: "تسجيل جميع الشركاء والمساهمين بشكل قانوني",
          features: ["تسجيل البيانات", "التحقق من الهوية", "تسجيل الأسهم", "إصدار الشهادات"]
        },
        {
          title: "إدارة الأسهم",
          description: "إدارة توزيع الأسهم والمساهمات",
          features: ["توزيع الأسهم", "نقل الملكية", "تحديث السجلات", "إصدار الشهادات"]
        },
        {
          title: "اتفاقيات الشراكة",
          description: "إعداد اتفاقيات الشراكة والمساهمات",
          features: ["اتفاقية الشراكة", "اتفاقية المساهمات", "اتفاقية الإدارة", "اتفاقيات خاصة"]
        },
        {
          title: "محاضر الجمعيات",
          description: "إعداد ومتابعة محاضر الجمعيات",
          features: ["محاضر التأسيس", "محاضر العادية", "محاضر غير العادية", "التوثيق"]
        }
      ]
    },
    {
      category: "خدمات المتابعة والدعم",
      services: [
        {
          title: "متابعة الإجراءات",
          description: "متابعة مستمرة لجميع إجراءات التأسيس",
          features: ["متابعة يومية", "تحديثات فورية", "تقارير دورية", "إشعارات"]
        },
        {
          title: "الاستشارات القانونية",
          description: "استشارات قانونية متخصصة في التأسيس",
          features: ["استشارات مجانية", "تحليل قانوني", "توصيات مخصصة", "دعم مستمر"]
        },
        {
          title: "التحديثات والتجديدات",
          description: "تحديث وتجديد جميع التراخيص والسجلات",
          features: ["تجديد التراخيص", "تحديث السجلات", "تجديد البطاقات", "التحديثات القانونية"]
        },
        {
          title: "الدعم الفني",
          description: "دعم فني مستمر بعد التأسيس",
          features: ["دعم فني", "استشارات", "متابعة", "حل المشاكل"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F7F6F2]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#4F516F] to-[#3d3f57] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #D6BF78 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#D6BF78]/20 px-4 py-2 rounded-full mb-6 border border-[#D6BF78]/30 backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">تأسيس الشركات</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">خدمات تأسيس الشركات الشاملة</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم خدمات تأسيس الشركات بجميع أنواعها مع إجراءات سريعة وآمنة. من التأسيس إلى التسجيل التجاري، نحن معك في كل خطوة لضمان نجاح مشروعك.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  window.location.href = '/#contact';
                }}
                className="bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:scale-105">
                اطلب استشارة مجانية
              </button>
              <Link href="/admin/companies">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 transition-all">
                  لوحة الإدارة
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#4F516F] mb-6">نظرة عامة على الخدمة</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  تأسيس الشركات هو الخطوة الأولى في رحلة نجاحك التجاري. نحن نقدم خدمات شاملة تغطي جميع جوانب التأسيس، من الاستشارة الأولية حتى الحصول على جميع التراخيص والسجلات المطلوبة.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا المتخصص لديه خبرة واسعة في تأسيس جميع أنواع الشركات وفقاً للقوانين المصرية. نضمن لك إتمام جميع الإجراءات بدقة وسرعة، مع توفير الوقت والجهد.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">15+ سنة خبرة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">500+ شركة تم تأسيسها</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">ضمان 100%</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80" 
                  alt="Company Formation" 
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
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا في التأسيس</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات لتأسيس شركتك بسهولة وسرعة
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {allServices.map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-[#D6BF78]">
                  <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#D6BF78]" />
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

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#4F516F] to-[#3d3f57] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">لماذا تختارنا؟</h2>
              <p className="text-xl text-gray-300">نقدم لك أفضل الخدمات بأعلى معايير الجودة</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل إجراءات التأسيس في أقل وقت ممكن" },
                { icon: Award, title: "خبرة واسعة", desc: "أكثر من 15 عاماً في تأسيس الشركات" },
                { icon: TrendingUp, title: "أسعار تنافسية", desc: "أفضل الأسعار في السوق" },
                { icon: Shield, title: "متابعة مستمرة", desc: "فريق متخصص يتابع كل خطوة" },
                { icon: CheckCircle2, title: "ضمان الجودة", desc: "نضمن دقة جميع المستندات والإجراءات" },
                { icon: Phone, title: "دعم فني", desc: "فريق دعم متاح على مدار الساعة" }
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">خطوات التأسيس</h2>
              <p className="text-xl text-gray-600">عملية بسيطة وواضحة من البداية للنهاية</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "الاستشارة الأولية", desc: "نستمع لاحتياجاتك ونقدم الاستشارة المناسبة", duration: "يوم واحد" },
                { step: "2", title: "إعداد المستندات", desc: "نقوم بإعداد جميع المستندات القانونية المطلوبة", duration: "2-3 أيام" },
                { step: "3", title: "التسجيل والترخيص", desc: "نتولى جميع إجراءات التسجيل والحصول على التراخيص", duration: "3-5 أيام" },
                { step: "4", title: "إصدار السجلات", desc: "نحصل على السجل التجاري والضريبي", duration: "2-3 أيام" },
                { step: "5", title: "التسليم", desc: "نسلمك جميع المستندات والتراخيص جاهزة", duration: "يوم واحد" }
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

      {/* FAQ Section */}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">ابدأ تأسيس شركتك اليوم</h2>
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
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-[#4F516F] mb-4">ساعات العمل</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>الأحد - الخميس: 9:00 ص - 5:00 م</p>
                    <p>الجمعة - السبت: مغلق</p>
                  </div>
                </div>
              </div>
              <div>
                <ServiceRequestForm 
                  serviceType="company-formation"
                  serviceName="تأسيس الشركات"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

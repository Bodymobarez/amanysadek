import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { Users, CheckCircle2, Calculator, FileText, Shield, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function PayrollManagement() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي الخدمات المقدمة في إدارة الرواتب؟",
      answer: "نقدم خدمات شاملة تشمل: حساب الرواتب، إعداد كشوف المرتبات، إدارة التأمينات الاجتماعية، إدارة بيانات الموظفين، ومتابعة جميع الالتزامات القانونية."
    },
    {
      question: "كم يستغرق حساب الرواتب؟",
      answer: "عادة ما يتم حساب الرواتب في غضون يومين إلى ثلاثة أيام من استلام البيانات. للمؤسسات الكبيرة قد يستغرق وقتاً أطول حسب عدد الموظفين."
    },
    {
      question: "هل تتعاملون مع التأمينات الاجتماعية؟",
      answer: "نعم، نقدم خدمات شاملة للتعامل مع التأمينات الاجتماعية: تسجيل الموظفين، دفع الاشتراكات، متابعة المطالبات، وحل جميع المشاكل المتعلقة بالتأمينات."
    },
    {
      question: "ما هي تكلفة خدمة إدارة الرواتب؟",
      answer: "تكلفة الخدمة تعتمد على عدد الموظفين ونوع الخدمات المطلوبة. نقدم استشارة مجانية لتقييم احتياجاتك وتقديم عرض سعر مناسب."
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
              <Users className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">إدارة الرواتب</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">خدمات إدارة الرواتب الشاملة</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم خدمات إدارة رواتب شاملة ومتكاملة لموظفيك. من حساب الرواتب إلى التأمينات الاجتماعية، نحن معك لضمان رضا الموظفين والامتثال القانوني.
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
              <Link href="/admin/payroll">
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
                  إدارة الرواتب هي خدمة متخصصة تساعدك في إدارة جميع جوانب رواتب موظفيك. نحن نقدم خدمات شاملة تغطي حساب الرواتب، التأمينات الاجتماعية، وإدارة بيانات الموظفين.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا المتخصص لديه خبرة واسعة في إدارة الرواتب لجميع أنواع المؤسسات. نضمن لك دقة الحسابات والامتثال لجميع القوانين واللوائح.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">خبرة واسعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">امتثال قانوني</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80" 
                  alt="Payroll Management" 
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
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا في إدارة الرواتب</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم خدمات شاملة لإدارة رواتب موظفيك
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {[
              {
                category: "خدمات حساب الرواتب",
                services: [
                  {
                    title: "حساب الراتب الأساسي",
                    description: "حساب دقيق للراتب الأساسي",
                    features: ["حساب الراتب", "الزيادات", "الترقيات", "التعديلات"]
                  },
                  {
                    title: "حساب البدلات",
                    description: "حساب جميع أنواع البدلات",
                    features: ["بدل السكن", "بدل المواصلات", "بدل الطعام", "بدلات أخرى"]
                  },
                  {
                    title: "حساب الخصومات",
                    description: "حساب جميع أنواع الخصومات",
                    features: ["خصم التأمينات", "خصم الضرائب", "خصم القروض", "خصومات أخرى"]
                  },
                  {
                    title: "حساب صافي الراتب",
                    description: "حساب صافي الراتب النهائي",
                    features: ["صافي الراتب", "التحقق", "التسليم", "المتابعة"]
                  }
                ]
              },
              {
                category: "خدمات كشوف الرواتب",
                services: [
                  {
                    title: "كشوف الرواتب الشهرية",
                    description: "إعداد كشوف رواتب شهرية مفصلة",
                    features: ["كشوف شهرية", "تفاصيل كاملة", "التسليم", "الأرشفة"]
                  },
                  {
                    title: "كشوف الرواتب السنوية",
                    description: "إعداد كشوف رواتب سنوية",
                    features: ["كشوف سنوية", "ملخص سنوي", "التقارير", "الأرشفة"]
                  },
                  {
                    title: "تقارير مالية",
                    description: "إعداد تقارير مالية عن الرواتب",
                    features: ["تقارير مالية", "تحليل التكاليف", "الميزانيات", "التوقعات"]
                  },
                  {
                    title: "تقارير إحصائية",
                    description: "إعداد تقارير إحصائية عن الرواتب",
                    features: ["إحصائيات", "تحليل البيانات", "الرسوم البيانية", "التقارير"]
                  }
                ]
              },
              {
                category: "خدمات التأمينات الاجتماعية",
                services: [
                  {
                    title: "تسجيل الموظفين",
                    description: "تسجيل الموظفين في التأمينات الاجتماعية",
                    features: ["التسجيل", "التحديث", "المتابعة", "التوثيق"]
                  },
                  {
                    title: "دفع الاشتراكات",
                    description: "دفع اشتراكات التأمينات الاجتماعية",
                    features: ["حساب الاشتراكات", "الدفع", "المتابعة", "التوثيق"]
                  },
                  {
                    title: "المتابعة",
                    description: "متابعة مستمرة للتأمينات الاجتماعية",
                    features: ["متابعة دورية", "تحديثات", "تقارير", "إشعارات"]
                  },
                  {
                    title: "حل المشاكل",
                    description: "حل جميع المشاكل المتعلقة بالتأمينات",
                    features: ["تحليل المشاكل", "الحلول", "المتابعة", "التوثيق"]
                  }
                ]
              },
              {
                category: "خدمات إدارة الموظفين",
                services: [
                  {
                    title: "بيانات الموظفين",
                    description: "إدارة شاملة لبيانات الموظفين",
                    features: ["البيانات الشخصية", "البيانات الوظيفية", "التحديثات", "الأرشفة"]
                  },
                  {
                    title: "السجلات",
                    description: "إدارة سجلات الموظفين",
                    features: ["السجلات", "التحديثات", "المتابعة", "الأرشفة"]
                  },
                  {
                    title: "التقارير",
                    description: "إعداد تقارير عن الموظفين",
                    features: ["تقارير الموظفين", "تقارير الرواتب", "تقارير أخرى", "التحليل"]
                  },
                  {
                    title: "المتابعة",
                    description: "متابعة مستمرة لبيانات الموظفين",
                    features: ["متابعة دورية", "تحديثات", "تقارير", "إشعارات"]
                  }
                ]
              },
              {
                category: "خدمات المتابعة والامتثال",
                services: [
                  {
                    title: "المتابعة المستمرة",
                    description: "متابعة مستمرة للرواتب",
                    features: ["متابعة شهرية", "تحديثات", "تقارير", "إشعارات"]
                  },
                  {
                    title: "الامتثال القانوني",
                    description: "ضمان الامتثال للقوانين العمالية",
                    features: ["القوانين العمالية", "اللوائح", "الامتثال", "التقارير"]
                  },
                  {
                    title: "التحديثات القانونية",
                    description: "تحديثات مستمرة عن القوانين",
                    features: ["تحديثات قانونية", "تحليل التغييرات", "توصيات", "تدريب"]
                  },
                  {
                    title: "الدعم الفني",
                    description: "دعم فني مستمر",
                    features: ["استشارات", "دعم فني", "متابعة", "حل المشاكل"]
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
                { icon: Award, title: "خبرة واسعة", desc: "أكثر من 15 عاماً في إدارة الرواتب" },
                { icon: CheckCircle2, title: "دقة عالية", desc: "نضمن دقة جميع الحسابات" },
                { icon: Shield, title: "امتثال قانوني", desc: "ضمان الامتثال لجميع القوانين" },
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل الحسابات في الوقت المحدد" },
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">عملية إدارة الرواتب</h2>
              <p className="text-xl text-gray-600">خطوات واضحة ومنظمة</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "جمع البيانات", desc: "نجمع بيانات الموظفين والرواتب", duration: "يوم واحد" },
                { step: "2", title: "حساب الرواتب", desc: "نحسب الرواتب والبدلات والخصومات بدقة", duration: "2-3 أيام" },
                { step: "3", title: "إعداد الكشوف", desc: "نعد كشوف رواتب مفصلة لكل موظف", duration: "1-2 يوم" },
                { step: "4", title: "التأمينات الاجتماعية", desc: "نتعامل مع التأمينات الاجتماعية ودفع الاشتراكات", duration: "2-3 أيام" },
                { step: "5", title: "التسليم والمتابعة", desc: "نسلم الكشوف ونقدم دعم مستمر", duration: "مستمر" }
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">ابدأ إدارة رواتب موظفيك اليوم</h2>
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
                <ServiceRequestForm 
                  serviceType="payroll-management"
                  serviceName="إدارة الرواتب"
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

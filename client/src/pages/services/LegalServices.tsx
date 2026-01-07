import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { Scale, CheckCircle2, FileText, Shield, Gavel, Clock, ArrowRight, Award, Phone, Mail, MapPin, HelpCircle, Star, ChevronDown, Users } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function LegalServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "ما هي أنواع القضايا التي تتعاملون معها؟",
      answer: "نتعامل مع جميع أنواع القضايا: قضايا تجارية، قضايا مدنية، قضايا عمالية، قضايا ضريبية، وقضايا عقارية. لدينا خبرة واسعة في جميع المجالات القانونية."
    },
    {
      question: "كم تستغرق إعداد العقد القانوني؟",
      answer: "مدة إعداد العقد تعتمد على تعقيده ونوعه. عادة ما تستغرق من 3 إلى 7 أيام عمل. للعقود المعقدة قد تستغرق وقتاً أطول."
    },
    {
      question: "هل تقدمون خدمات التحكيم؟",
      answer: "نعم، نقدم خدمات التحكيم التجاري وحل النزاعات خارج المحاكم. التحكيم أسرع وأقل تكلفة من التقاضي العادي."
    },
    {
      question: "ما هي تكلفة الاستشارة القانونية؟",
      answer: "تكلفة الاستشارة القانونية تختلف حسب نوع الاستشارة وتعقيدها. نقدم استشارة أولية مجانية لتقييم احتياجاتك وتقديم عرض سعر مناسب."
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
              <Scale className="w-5 h-5 text-[#D6BF78]" />
              <span className="text-sm font-semibold text-[#D6BF78]">الخدمات القانونية</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">الخدمات القانونية المتخصصة</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              نقدم خدمات قانونية شاملة للشركات والأفراد. من إعداد العقود إلى تمثيلك في القضايا القانونية، نحن معك لحماية مصالحك.
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
              <Link href="/admin/legal">
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
                  الخدمات القانونية هي أساس حماية مصالحك التجارية والشخصية. نحن نقدم خدمات قانونية شاملة تغطي جميع احتياجاتك القانونية.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  فريقنا من المحامين المتخصصين لديه خبرة واسعة في جميع المجالات القانونية. نضمن لك أفضل تمثيل قانوني وحماية لمصالحك.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">محامون معتمدون</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#D6BF78]" />
                    <span className="font-semibold text-[#4F516F]">حماية المصالح</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D6BF78]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
                  alt="Legal Services" 
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
            <h2 className="text-4xl font-bold text-[#4F516F] mb-4">جميع خدماتنا القانونية</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات القانونية لحماية مصالحك
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {[
              {
                category: "خدمات القضايا والتمثيل القانوني",
                services: [
                  {
                    title: "القضايا التجارية",
                    description: "تمثيلك في جميع القضايا التجارية",
                    features: ["قضايا العقود", "قضايا الشيكات", "قضايا الأوراق التجارية", "قضايا الشركات"]
                  },
                  {
                    title: "القضايا المدنية",
                    description: "تمثيلك في القضايا المدنية",
                    features: ["قضايا التعويضات", "قضايا العقارات", "قضايا الملكية", "قضايا أخرى"]
                  },
                  {
                    title: "القضايا العمالية",
                    description: "تمثيلك في القضايا العمالية",
                    features: ["قضايا الفصل", "قضايا التعويضات", "قضايا الأجور", "قضايا أخرى"]
                  },
                  {
                    title: "القضايا الضريبية",
                    description: "تمثيلك في القضايا الضريبية",
                    features: ["قضايا الإقرارات", "قضايا الفحوصات", "قضايا الاستئنافات", "قضايا أخرى"]
                  }
                ]
              },
              {
                category: "خدمات إعداد العقود",
                services: [
                  {
                    title: "عقود العمل",
                    description: "إعداد جميع أنواع عقود العمل",
                    features: ["عقود دائمة", "عقود مؤقتة", "عقود التدريب", "عقود أخرى"]
                  },
                  {
                    title: "عقود الشراكة",
                    description: "إعداد عقود الشراكة والمساهمات",
                    features: ["عقود التأسيس", "عقود الشراكة", "عقود المساهمات", "عقود أخرى"]
                  },
                  {
                    title: "عقود التوريد",
                    description: "إعداد عقود التوريد والشراء",
                    features: ["عقود التوريد", "عقود الشراء", "عقود التوزيع", "عقود أخرى"]
                  },
                  {
                    title: "عقود الخدمات",
                    description: "إعداد عقود الخدمات",
                    features: ["عقود الاستشارات", "عقود الصيانة", "عقود الخدمات", "عقود أخرى"]
                  }
                ]
              },
              {
                category: "خدمات الاستشارات القانونية",
                services: [
                  {
                    title: "الاستشارات التجارية",
                    description: "استشارات قانونية في المجال التجاري",
                    features: ["استشارات التأسيس", "استشارات العقود", "استشارات الشركات", "استشارات أخرى"]
                  },
                  {
                    title: "الاستشارات العمالية",
                    description: "استشارات قانونية في المجال العمالي",
                    features: ["استشارات التوظيف", "استشارات الفصل", "استشارات الأجور", "استشارات أخرى"]
                  },
                  {
                    title: "الاستشارات الضريبية",
                    description: "استشارات قانونية في المجال الضريبي",
                    features: ["استشارات الإقرارات", "استشارات الفحوصات", "استشارات النزاعات", "استشارات أخرى"]
                  },
                  {
                    title: "الاستشارات العقارية",
                    description: "استشارات قانونية في المجال العقاري",
                    features: ["استشارات الشراء", "استشارات البيع", "استشارات الإيجار", "استشارات أخرى"]
                  }
                ]
              },
              {
                category: "خدمات التحكيم وحل النزاعات",
                services: [
                  {
                    title: "التحكيم التجاري",
                    description: "خدمات التحكيم التجاري",
                    features: ["تحكيم تجاري", "حل النزاعات", "الوساطة", "التوفيق"]
                  },
                  {
                    title: "حل النزاعات",
                    description: "حل النزاعات خارج المحاكم",
                    features: ["الوساطة", "التوفيق", "التسوية", "التحكيم"]
                  },
                  {
                    title: "التمثيل في التحكيم",
                    description: "التمثيل القانوني في التحكيم",
                    features: ["إعداد الملفات", "التمثيل", "المفاوضات", "المتابعة"]
                  },
                  {
                    title: "إعداد اتفاقيات التحكيم",
                    description: "إعداد اتفاقيات التحكيم",
                    features: ["اتفاقيات التحكيم", "شروط التحكيم", "إجراءات التحكيم", "تنفيذ الأحكام"]
                  }
                ]
              },
              {
                category: "خدمات المتابعة والامتثال",
                services: [
                  {
                    title: "المتابعة القانونية",
                    description: "متابعة مستمرة للقضايا والإجراءات",
                    features: ["متابعة القضايا", "تحديثات دورية", "تقارير قانونية", "إشعارات فورية"]
                  },
                  {
                    title: "الامتثال القانوني",
                    description: "ضمان الامتثال للقوانين واللوائح",
                    features: ["مراجعة قانونية", "تقييم المخاطر", "توصيات قانونية", "تقارير الامتثال"]
                  },
                  {
                    title: "التحديثات القانونية",
                    description: "تحديثات مستمرة عن القوانين",
                    features: ["تحديثات قانونية", "تحليل التغييرات", "توصيات", "تدريب"]
                  },
                  {
                    title: "الدعم القانوني",
                    description: "دعم قانوني مستمر",
                    features: ["استشارات مستمرة", "دعم فني", "متابعة", "حل المشاكل"]
                  }
                ]
              }
            ].map((category, categoryIdx) => (
              <div key={categoryIdx} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-[#D6BF78]">
                  <div className="w-12 h-12 bg-[#D6BF78]/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-[#D6BF78]" />
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
                { icon: Award, title: "خبرة واسعة", desc: "أكثر من 15 عاماً في الخدمات القانونية" },
                { icon: Shield, title: "فريق محترف", desc: "محامون متخصصون معتمدون" },
                { icon: CheckCircle2, title: "نجاح عالي", desc: "نسبة نجاح عالية في القضايا" },
                { icon: Clock, title: "سرعة في الإنجاز", desc: "نكمل الإجراءات في الوقت المحدد" },
                { icon: Scale, title: "أسعار عادلة", desc: "أسعار تنافسية وشفافة" },
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">عملية الخدمة القانونية</h2>
              <p className="text-xl text-gray-600">خطوات واضحة ومنظمة</p>
            </div>
            <div className="space-y-8">
              {[
                { step: "1", title: "الاستشارة الأولية", desc: "نستمع لمشكلتك القانونية ونقدم الاستشارة المناسبة", duration: "يوم واحد" },
                { step: "2", title: "التحليل والتخطيط", desc: "نحلل القضية ونضع خطة عمل قانونية شاملة", duration: "2-3 أيام" },
                { step: "3", title: "تنفيذ الخطة", desc: "ننفذ الخطة القانونية (إعداد عقود، تمثيل في القضايا، إلخ)", duration: "حسب القضية" },
                { step: "4", title: "المتابعة", desc: "نتابع جميع الإجراءات القانونية ونحدثك بانتظام", duration: "مستمر" },
                { step: "5", title: "الحل النهائي", desc: "نضمن حصولك على أفضل نتيجة ممكنة", duration: "حتى الحل" }
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
              <h2 className="text-4xl font-bold text-[#4F516F] mb-4">تواصل معنا</h2>
              <p className="text-xl text-gray-600">احصل على استشارة قانونية مجانية</p>
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
                  serviceType="legal-services"
                  serviceName="الخدمات القانونية"
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

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Building2, 
  Search, 
  Calculator, 
  Scale, 
  FileText, 
  Users,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail
} from "lucide-react";

interface Stats {
  companies: number;
  incorporations: number;
  audits: number;
  taxReturns: number;
  legalCases: number;
  studies: number;
  employees: number;
  serviceRequests: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    companies: 0,
    incorporations: 0,
    audits: 0,
    taxReturns: 0,
    legalCases: 0,
    studies: 0,
    employees: 0,
    serviceRequests: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    Promise.all([
      fetch("/api/companies").then(r => r.ok ? r.json() : []).then(d => ({ companies: Array.isArray(d) ? d.length : 0 })).catch(() => ({ companies: 0 })),
      fetch("/api/incorporations").then(r => r.ok ? r.json() : []).then(d => ({ incorporations: Array.isArray(d) ? d.length : 0 })).catch(() => ({ incorporations: 0 })),
      fetch("/api/audit/sessions").then(r => r.ok ? r.json() : []).then(d => ({ audits: Array.isArray(d) ? d.length : 0 })).catch(() => ({ audits: 0 })),
      fetch("/api/tax/returns").then(r => r.ok ? r.json() : []).then(d => ({ taxReturns: Array.isArray(d) ? d.length : 0 })).catch(() => ({ taxReturns: 0 })),
      fetch("/api/legal/cases").then(r => r.ok ? r.json() : []).then(d => ({ legalCases: Array.isArray(d) ? d.length : 0 })).catch(() => ({ legalCases: 0 })),
      fetch("/api/feasibility/studies").then(r => r.ok ? r.json() : []).then(d => ({ studies: Array.isArray(d) ? d.length : 0 })).catch(() => ({ studies: 0 })),
      fetch("/api/payroll/employees").then(r => r.ok ? r.json() : []).then(d => ({ employees: Array.isArray(d) ? d.length : 0 })).catch(() => ({ employees: 0 })),
      fetch("/api/service-requests").then(r => r.ok ? r.json() : []).then(d => ({ serviceRequests: Array.isArray(d) ? d.length : 0 })).catch(() => ({ serviceRequests: 0 })),
    ]).then(results => {
      const combined = Object.assign({}, ...results);
      setStats(combined);
    }).catch(error => {
      console.error("Error fetching stats:", error);
    });
  }, []);

  const services = [
    {
      title: "إدارة الشركات",
      description: "إدارة الشركات وطلبات التأسيس",
      icon: Building2,
      href: "/admin/companies",
      color: "bg-blue-500",
      count: stats.companies + stats.incorporations,
    },
    {
      title: "المراجعة والتدقيق",
      description: "إدارة جلسات التدقيق والتقارير",
      icon: Search,
      href: "/admin/auditing",
      color: "bg-green-500",
      count: stats.audits,
    },
    {
      title: "الاستشارات الضريبية",
      description: "إدارة الإقرارات والفحوصات الضريبية",
      icon: Calculator,
      href: "/admin/tax",
      color: "bg-yellow-500",
      count: stats.taxReturns,
    },
    {
      title: "الخدمات القانونية",
      description: "إدارة القضايا والعقود",
      icon: Scale,
      href: "/admin/legal",
      color: "bg-purple-500",
      count: stats.legalCases,
    },
    {
      title: "دراسات الجدوى",
      description: "إدارة دراسات الجدوى الاقتصادية",
      icon: FileText,
      href: "/admin/feasibility",
      color: "bg-indigo-500",
      count: stats.studies,
    },
    {
      title: "إدارة الرواتب",
      description: "إدارة الموظفين والرواتب والتأمينات",
      icon: Users,
      href: "/admin/payroll",
      color: "bg-pink-500",
      count: stats.employees,
    },
    {
      title: "طلبات الخدمات",
      description: "عرض وإدارة طلبات الخدمات من العملاء",
      icon: Mail,
      href: "/admin/service-requests",
      color: "bg-orange-500",
      count: stats.serviceRequests,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">نظرة عامة على جميع الخدمات</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الشركات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.companies}</p>
              </div>
              <Building2 className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">جلسات التدقيق</p>
                <p className="text-2xl font-bold text-gray-900">{stats.audits}</p>
              </div>
              <Search className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الإقرارات الضريبية</p>
                <p className="text-2xl font-bold text-gray-900">{stats.taxReturns}</p>
              </div>
              <Calculator className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الموظفين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.employees}</p>
              </div>
              <Users className="w-12 h-12 text-pink-500" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${service.color} p-3 rounded-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{service.count}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>إدارة الخدمة</span>
                  <span className="mr-2">←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/companies/new">
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                إضافة شركة جديدة
              </button>
            </Link>
            <Link href="/admin/auditing/new">
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                بدء جلسة تدقيق
              </button>
            </Link>
            <Link href="/admin/tax/returns/new">
              <button className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors">
                إضافة إقرار ضريبي
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


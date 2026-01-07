import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Building2, Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";

interface Company {
  id: number;
  name: string;
  legalForm: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IncorporationRequest {
  id: number;
  companyId: number;
  status: string;
  currentStep: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export default function CompaniesManagement() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [incorporations, setIncorporations] = useState<IncorporationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companiesRes, incorporationsRes] = await Promise.all([
        fetch("/api/companies"),
        fetch("/api/incorporations"),
      ]);
      
      let companiesData = [];
      let incorporationsData = [];
      
      if (companiesRes.ok) {
        companiesData = await companiesRes.json();
        if (!Array.isArray(companiesData)) {
          companiesData = [];
        }
      } else {
        console.error("Error fetching companies:", companiesRes.status);
      }
      
      if (incorporationsRes.ok) {
        incorporationsData = await incorporationsRes.json();
        if (!Array.isArray(incorporationsData)) {
          incorporationsData = [];
        }
      } else {
        console.error("Error fetching incorporations:", incorporationsRes.status);
      }
      
      setCompanies(companiesData);
      setIncorporations(incorporationsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCompanies([]);
      setIncorporations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = Array.isArray(companies) ? companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الشركات</h1>
            <p className="text-gray-600">إدارة الشركات وطلبات التأسيس</p>
          </div>
          <Link href="/admin/companies/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              إضافة شركة جديدة
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الشركات</p>
            <p className="text-3xl font-bold text-gray-900">{companies.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">طلبات التأسيس</p>
            <p className="text-3xl font-bold text-gray-900">{incorporations.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد التنفيذ</p>
            <p className="text-3xl font-bold text-blue-600">
              {companies.filter(c => c.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مكتملة</p>
            <p className="text-3xl font-bold text-green-600">
              {companies.filter(c => c.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن شركة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
                <option value="cancelled">ملغية</option>
              </select>
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    اسم الشركة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الشكل القانوني
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإنشاء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 text-gray-400 ml-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">ID: {company.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.legalForm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                        {company.status === "pending" && "قيد الانتظار"}
                        {company.status === "in_progress" && "قيد التنفيذ"}
                        {company.status === "completed" && "مكتملة"}
                        {company.status === "cancelled" && "ملغية"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(company.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/companies/${company.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="عرض">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                        <Link href={`/admin/companies/${company.id}/edit`}>
                          <button className="text-yellow-600 hover:text-yellow-900" title="تعديل">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm("هل أنت متأكد من حذف هذه الشركة؟")) {
                              try {
                                const res = await fetch(`/api/companies/${company.id}`, {
                                  method: "DELETE",
                                });
                                if (res.ok) {
                                  fetchData();
                                } else {
                                  alert("حدث خطأ أثناء الحذف");
                                }
                              } catch (error) {
                                console.error("Error:", error);
                                alert("حدث خطأ أثناء الحذف");
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد شركات</p>
            </div>
          )}
        </div>

        {/* Incorporation Requests Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">طلبات التأسيس الأخيرة</h2>
          <div className="space-y-4">
            {incorporations.slice(0, 5).map((inc) => (
              <div key={inc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{inc.contactName}</p>
                    <p className="text-sm text-gray-500">{inc.contactEmail}</p>
                  </div>
                  <div className="text-left">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inc.status)}`}>
                      {inc.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">الخطوة: {inc.currentStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


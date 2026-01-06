import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Plus, Scale, Calendar, Eye, Edit, Trash2, Filter, Gavel } from "lucide-react";

interface LegalCase {
  id: number;
  companyId: number;
  caseType: string;
  status: string;
  courtName: string | null;
  caseNumber: string | null;
  startDate: string;
  endDate: string | null;
  createdAt: string;
}

export default function LegalManagement() {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/api/legal/cases")
      .then(r => r.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredCases = cases.filter(legalCase => {
    const matchesSearch = legalCase.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         legalCase.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || legalCase.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      won: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
      settled: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الخدمات القانونية</h1>
            <p className="text-gray-600">إدارة القضايا والعقود القانونية</p>
          </div>
          <Link href="/admin/legal/cases/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              إضافة قضية جديدة
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي القضايا</p>
            <p className="text-3xl font-bold text-gray-900">{cases.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد التنفيذ</p>
            <p className="text-3xl font-bold text-blue-600">
              {cases.filter(c => c.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">منتصرة</p>
            <p className="text-3xl font-bold text-green-600">
              {cases.filter(c => c.status === "won").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مستقرة</p>
            <p className="text-3xl font-bold text-purple-600">
              {cases.filter(c => c.status === "settled").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن قضية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="won">منتصرة</option>
                <option value="lost">خاسرة</option>
                <option value="settled">مستقرة</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع القضية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم القضية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المحكمة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCases.map((legalCase) => (
                  <tr key={legalCase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{legalCase.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {legalCase.caseType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {legalCase.caseNumber || "غير محدد"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {legalCase.courtName || "غير محدد"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(legalCase.status)}`}>
                        {legalCase.status === "pending" && "قيد الانتظار"}
                        {legalCase.status === "in_progress" && "قيد التنفيذ"}
                        {legalCase.status === "won" && "منتصرة"}
                        {legalCase.status === "lost" && "خاسرة"}
                        {legalCase.status === "settled" && "مستقرة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/legal/cases/${legalCase.id}`}>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <Gavel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد قضايا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

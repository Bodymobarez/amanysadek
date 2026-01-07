import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Plus, Calculator, Calendar, Eye, Edit, Trash2, Filter, FileText } from "lucide-react";

interface TaxReturn {
  id: number;
  companyId: number;
  returnType: string;
  taxYear: number;
  status: string;
  amount: number | null;
  dueDate: string | null;
  submittedDate: string | null;
  createdAt: string;
}

export default function TaxManagement() {
  const [returns, setReturns] = useState<TaxReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/api/tax/returns")
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error(`HTTP ${r.status}`);
      })
      .then(data => {
        setReturns(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tax returns:", error);
        setReturns([]);
        setLoading(false);
      });
  }, []);

  const filteredReturns = Array.isArray(returns) ? returns.filter(taxReturn => {
    const matchesSearch = taxReturn.returnType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || taxReturn.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      under_review: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الاستشارات الضريبية</h1>
            <p className="text-gray-600">إدارة الإقرارات والفحوصات الضريبية</p>
          </div>
          <Link href="/admin/tax/returns/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              إضافة إقرار ضريبي جديد
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الإقرارات</p>
            <p className="text-3xl font-bold text-gray-900">{returns.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مقدمة</p>
            <p className="text-3xl font-bold text-blue-600">
              {returns.filter(r => r.status === "submitted").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">معتمدة</p>
            <p className="text-3xl font-bold text-green-600">
              {returns.filter(r => r.status === "approved").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد المراجعة</p>
            <p className="text-3xl font-bold text-yellow-600">
              {returns.filter(r => r.status === "under_review").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن إقرار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="draft">مسودة</option>
                <option value="submitted">مقدمة</option>
                <option value="under_review">قيد المراجعة</option>
                <option value="approved">معتمدة</option>
                <option value="rejected">مرفوضة</option>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع الإقرار</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السنة الضريبية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReturns.map((taxReturn) => (
                  <tr key={taxReturn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{taxReturn.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {taxReturn.returnType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {taxReturn.taxYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {taxReturn.amount ? `${taxReturn.amount.toLocaleString()} ج.م` : "غير محدد"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(taxReturn.status)}`}>
                        {taxReturn.status === "draft" && "مسودة"}
                        {taxReturn.status === "submitted" && "مقدمة"}
                        {taxReturn.status === "under_review" && "قيد المراجعة"}
                        {taxReturn.status === "approved" && "معتمدة"}
                        {taxReturn.status === "rejected" && "مرفوضة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/tax/returns/${taxReturn.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="عرض">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                        <Link href={`/admin/tax/returns/${taxReturn.id}/edit`}>
                          <button className="text-yellow-600 hover:text-yellow-900" title="تعديل">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm("هل أنت متأكد من حذف هذا الإقرار؟")) {
                              try {
                                const res = await fetch(`/api/tax/returns/${taxReturn.id}`, {
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
          {filteredReturns.length === 0 && (
            <div className="text-center py-12">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد إقرارات ضريبية</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

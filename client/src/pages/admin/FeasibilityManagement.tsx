import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Plus, Briefcase, Calendar, Eye, Edit, Trash2, Filter, FileText } from "lucide-react";

interface FeasibilityStudy {
  id: number;
  companyId: number;
  projectName: string;
  studyType: string;
  status: string;
  startDate: string;
  completionDate: string | null;
  createdAt: string;
}

export default function FeasibilityManagement() {
  const [studies, setStudies] = useState<FeasibilityStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/api/feasibility/studies")
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error(`HTTP ${r.status}`);
      })
      .then(data => {
        setStudies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching feasibility studies:", error);
        setStudies([]);
        setLoading(false);
      });
  }, []);

  const filteredStudies = Array.isArray(studies) ? studies.filter(study => {
    const matchesSearch = study.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.studyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || study.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة دراسات الجدوى</h1>
            <p className="text-gray-600">إدارة دراسات الجدوى الاقتصادية</p>
          </div>
          <Link href="/admin/feasibility/studies/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              إضافة دراسة جدوى جديدة
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الدراسات</p>
            <p className="text-3xl font-bold text-gray-900">{studies.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد التنفيذ</p>
            <p className="text-3xl font-bold text-blue-600">
              {studies.filter(s => s.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مكتملة</p>
            <p className="text-3xl font-bold text-green-600">
              {studies.filter(s => s.status === "completed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مسودة</p>
            <p className="text-3xl font-bold text-gray-600">
              {studies.filter(s => s.status === "draft").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن دراسة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="draft">مسودة</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
                <option value="cancelled">ملغية</option>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم المشروع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع الدراسة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ البدء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{study.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {study.projectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {study.studyType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(study.startDate).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(study.status)}`}>
                        {study.status === "draft" && "مسودة"}
                        {study.status === "in_progress" && "قيد التنفيذ"}
                        {study.status === "completed" && "مكتملة"}
                        {study.status === "cancelled" && "ملغية"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/feasibility/studies/${study.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="عرض">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                        <Link href={`/admin/feasibility/studies/${study.id}/edit`}>
                          <button className="text-yellow-600 hover:text-yellow-900" title="تعديل">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm("هل أنت متأكد من حذف هذه الدراسة؟")) {
                              try {
                                const res = await fetch(`/api/feasibility/studies/${study.id}`, {
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
          {filteredStudies.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد دراسات جدوى</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

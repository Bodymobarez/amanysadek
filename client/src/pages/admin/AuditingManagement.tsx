import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Plus, FileText, Calendar, Eye, Edit, Trash2, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";

interface AuditSession {
  id: number;
  companyId: number;
  auditType: string;
  status: string;
  startDate: string;
  endDate: string | null;
  auditorName: string | null;
  notes: string | null;
  createdAt: string;
}

interface AuditReport {
  id: number;
  sessionId: number;
  reportType: string;
  findings: string | null;
  recommendations: string | null;
  status: string;
  createdAt: string;
}

export default function AuditingManagement() {
  const [sessions, setSessions] = useState<AuditSession[]>([]);
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsRes, reportsRes] = await Promise.all([
        fetch("/api/audit/sessions"),
        fetch("/api/audit/reports"),
      ]);
      const sessionsData = await sessionsRes.json();
      const reportsData = await reportsRes.json();
      setSessions(sessionsData);
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.auditType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.auditorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المراجعة والتدقيق</h1>
            <p className="text-gray-600">إدارة جلسات التدقيق والتقارير</p>
          </div>
          <Link href="/admin/auditing/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              بدء جلسة تدقيق جديدة
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الجلسات</p>
            <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">التقارير</p>
            <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد التنفيذ</p>
            <p className="text-3xl font-bold text-blue-600">
              {sessions.filter(s => s.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مكتملة</p>
            <p className="text-3xl font-bold text-green-600">
              {sessions.filter(s => s.status === "completed").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن جلسة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع التدقيق</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدقق</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ البدء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{session.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.auditType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.auditorName || "غير محدد"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(session.startDate).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                        {getStatusIcon(session.status)}
                        {session.status === "pending" && "قيد الانتظار"}
                        {session.status === "in_progress" && "قيد التنفيذ"}
                        {session.status === "completed" && "مكتملة"}
                        {session.status === "cancelled" && "ملغية"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/auditing/${session.id}`}>
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
          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد جلسات تدقيق</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">التقارير الأخيرة</h2>
          <div className="space-y-4">
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">تقرير #{report.id}</p>
                    <p className="text-sm text-gray-500">نوع التقرير: {report.reportType}</p>
                  </div>
                  <div className="text-left">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(report.createdAt).toLocaleDateString("ar-EG")}
                    </p>
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

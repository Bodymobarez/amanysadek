import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Filter, Eye, Edit, Trash2, Mail, Phone, Building2, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ServiceRequest {
  id: number;
  serviceType: string;
  serviceName: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  preferredContact: string;
  status: string;
  assignedTo: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const SERVICE_TYPES: Record<string, { name: string; color: string }> = {
  company_formation: { name: "تأسيس الشركات", color: "bg-blue-500" },
  auditing: { name: "المراجعة والتدقيق", color: "bg-green-500" },
  tax: { name: "الاستشارات الضريبية", color: "bg-yellow-500" },
  legal: { name: "الخدمات القانونية", color: "bg-purple-500" },
  feasibility: { name: "دراسات الجدوى", color: "bg-indigo-500" },
  payroll: { name: "إدارة الرواتب", color: "bg-pink-500" },
};

export default function ServiceRequestsManagement() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterServiceType, setFilterServiceType] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/service-requests");
      if (res.ok) {
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []);
      } else {
        console.error("Error fetching service requests:", res.status);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching service requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = Array.isArray(requests) ? requests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm) ||
      request.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;
    const matchesServiceType = filterServiceType === "all" || request.serviceType === filterServiceType;
    return matchesSearch && matchesStatus && matchesServiceType;
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

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4" />;
    if (status === "in_progress") return <Clock className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

    try {
      const res = await fetch(`/api/service-requests/${id}`, {
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
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/service-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchData();
      } else {
        alert("حدث خطأ أثناء التحديث");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء التحديث");
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة طلبات الخدمات</h1>
            <p className="text-gray-600">عرض وإدارة جميع طلبات الخدمات من العملاء</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
            <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد الانتظار</p>
            <p className="text-3xl font-bold text-yellow-600">
              {requests.filter(r => r.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">قيد التنفيذ</p>
            <p className="text-3xl font-bold text-blue-600">
              {requests.filter(r => r.status === "in_progress").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">مكتملة</p>
            <p className="text-3xl font-bold text-green-600">
              {requests.filter(r => r.status === "completed").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن طلب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterServiceType}
                onChange={(e) => setFilterServiceType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الخدمات</option>
                {Object.entries(SERVICE_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
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

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع الخدمة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معلومات الاتصال</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${SERVICE_TYPES[request.serviceType]?.color || "bg-gray-500"}`}></div>
                        <span className="text-sm text-gray-900">{request.serviceName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        {request.company && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {request.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="w-3 h-3" />
                          {request.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3" />
                          {request.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(request.status)}`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="completed">مكتملة</option>
                        <option value="cancelled">ملغية</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            alert(`الرسالة:\n${request.message}`);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(request.id)}
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
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد طلبات خدمات</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




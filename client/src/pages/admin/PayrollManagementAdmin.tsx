import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Plus, Users, Calendar, Eye, Edit, Trash2, Filter, Calculator } from "lucide-react";

interface Employee {
  id: number;
  companyId: number;
  name: string;
  nationalId: string;
  position: string | null;
  salary: number;
  status: string;
  hireDate: string;
  createdAt: string;
}

export default function PayrollManagementAdmin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/api/payroll/employees")
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error(`HTTP ${r.status}`);
      })
      .then(data => {
        setEmployees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = Array.isArray(employees) ? employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.nationalId.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      on_leave: "bg-yellow-100 text-yellow-800",
      terminated: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const totalSalary = Array.isArray(employees) ? employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الرواتب</h1>
            <p className="text-gray-600">إدارة الموظفين والرواتب والتأمينات</p>
          </div>
          <Link href="/admin/payroll/employees/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              إضافة موظف جديد
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الموظفين</p>
            <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">نشط</p>
            <p className="text-3xl font-bold text-green-600">
              {employees.filter(e => e.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">إجمالي الرواتب</p>
            <p className="text-3xl font-bold text-blue-600">
              {totalSalary.toLocaleString()} ج.م
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">في إجازة</p>
            <p className="text-3xl font-bold text-yellow-600">
              {employees.filter(e => e.status === "on_leave").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن موظف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="on_leave">في إجازة</option>
                <option value="terminated">منتهي</option>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنصب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الراتب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-400 ml-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: {employee.nationalId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position || "غير محدد"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.salary.toLocaleString()} ج.م
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status === "active" && "نشط"}
                        {employee.status === "inactive" && "غير نشط"}
                        {employee.status === "on_leave" && "في إجازة"}
                        {employee.status === "terminated" && "منتهي"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/payroll/employees/${employee.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="عرض">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                        <Link href={`/admin/payroll/employees/${employee.id}/edit`}>
                          <button className="text-yellow-600 hover:text-yellow-900" title="تعديل">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={async () => {
                            if (confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
                              try {
                                const res = await fetch(`/api/payroll/employees/${employee.id}`, {
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
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا يوجد موظفين</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

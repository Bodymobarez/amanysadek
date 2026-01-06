import { useState, useEffect } from "react";
import { Users, DollarSign, Calendar } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  status: string;
}

interface PayrollRecord {
  id: number;
  period: string;
  netSalary: number;
  status: string;
}

export default function PayrollManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<PayrollRecord[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/payroll/employees").then(r => r.json()),
      fetch("/api/payroll/records").then(r => r.json()),
    ]).then(([emps, recs]) => {
      setEmployees(emps);
      setRecords(recs);
    }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">إدارة الرواتب</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">الموظفين ({employees.length})</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y">
                {employees.map(emp => (
                  <div key={emp.id} className="p-4">
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm text-gray-600">{emp.position}</p>
                    <p className="text-sm text-gray-500">{emp.salary.toLocaleString()} ج.م</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">سجلات الرواتب</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y">
                {records.slice(0, 10).map(record => (
                  <div key={record.id} className="p-4">
                    <p className="font-semibold">الفترة: {record.period}</p>
                    <p className="text-sm text-gray-600">{record.netSalary.toLocaleString()} ج.م</p>
                    <p className="text-xs text-gray-500">{record.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


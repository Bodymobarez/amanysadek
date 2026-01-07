import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import CompanyFormation from "@/pages/services/CompanyFormation";
import Auditing from "@/pages/services/Auditing";
import TaxConsulting from "@/pages/services/TaxConsulting";
import LegalServices from "@/pages/services/LegalServices";
import FeasibilityStudies from "@/pages/services/FeasibilityStudies";
import PayrollManagement from "@/pages/services/PayrollManagement";
// Admin pages
import Dashboard from "@/pages/admin/Dashboard";
import CompaniesManagement from "@/pages/admin/CompaniesManagement";
import CompanyForm from "@/pages/admin/CompanyForm";
import AuditingManagement from "@/pages/admin/AuditingManagement";
import AuditSessionForm from "@/pages/admin/AuditSessionForm";
import TaxManagement from "@/pages/admin/TaxManagement";
import TaxReturnForm from "@/pages/admin/TaxReturnForm";
import LegalManagement from "@/pages/admin/LegalManagement";
import LegalCaseForm from "@/pages/admin/LegalCaseForm";
import FeasibilityManagement from "@/pages/admin/FeasibilityManagement";
import FeasibilityStudyForm from "@/pages/admin/FeasibilityStudyForm";
import PayrollManagementAdmin from "@/pages/admin/PayrollManagementAdmin";
import EmployeeForm from "@/pages/admin/EmployeeForm";
import ServiceRequestsManagement from "@/pages/admin/ServiceRequestsManagement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/company-formation" component={CompanyFormation} />
      <Route path="/services/auditing" component={Auditing} />
      <Route path="/services/tax-consulting" component={TaxConsulting} />
      <Route path="/services/legal-services" component={LegalServices} />
      <Route path="/services/feasibility-studies" component={FeasibilityStudies} />
      <Route path="/services/payroll-management" component={PayrollManagement} />
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/companies" component={CompaniesManagement} />
      <Route path="/admin/companies/new" component={CompanyForm} />
      <Route path="/admin/companies/:id/edit" component={CompanyForm} />
      <Route path="/admin/auditing" component={AuditingManagement} />
      <Route path="/admin/auditing/new" component={AuditSessionForm} />
      <Route path="/admin/auditing/:id/edit" component={AuditSessionForm} />
      <Route path="/admin/tax" component={TaxManagement} />
      <Route path="/admin/tax/returns/new" component={TaxReturnForm} />
      <Route path="/admin/tax/returns/:id/edit" component={TaxReturnForm} />
      <Route path="/admin/legal" component={LegalManagement} />
      <Route path="/admin/legal/cases/new" component={LegalCaseForm} />
      <Route path="/admin/legal/cases/:id/edit" component={LegalCaseForm} />
      <Route path="/admin/feasibility" component={FeasibilityManagement} />
      <Route path="/admin/feasibility/studies/new" component={FeasibilityStudyForm} />
      <Route path="/admin/feasibility/studies/:id/edit" component={FeasibilityStudyForm} />
      <Route path="/admin/payroll" component={PayrollManagementAdmin} />
      <Route path="/admin/payroll/employees/new" component={EmployeeForm} />
      <Route path="/admin/payroll/employees/:id/edit" component={EmployeeForm} />
      <Route path="/admin/service-requests" component={ServiceRequestsManagement} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div dir="rtl" className="font-sans">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

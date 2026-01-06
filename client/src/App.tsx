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
import AuditingManagement from "@/pages/admin/AuditingManagement";
import TaxManagement from "@/pages/admin/TaxManagement";
import LegalManagement from "@/pages/admin/LegalManagement";
import FeasibilityManagement from "@/pages/admin/FeasibilityManagement";
import PayrollManagementAdmin from "@/pages/admin/PayrollManagementAdmin";

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
      <Route path="/admin/auditing" component={AuditingManagement} />
      <Route path="/admin/tax" component={TaxManagement} />
      <Route path="/admin/legal" component={LegalManagement} />
      <Route path="/admin/feasibility" component={FeasibilityManagement} />
      <Route path="/admin/payroll" component={PayrollManagementAdmin} />
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

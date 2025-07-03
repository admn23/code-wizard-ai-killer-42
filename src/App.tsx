
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import RefundPolicy from "./pages/RefundPolicy";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Changelog from "./pages/Changelog";

// AI Tools
import CodeGenerator from "./pages/tools/CodeGenerator";
import BugFixer from "./pages/tools/BugFixer";
import CodeExplainer from "./pages/tools/CodeExplainer";
import CodeRefactor from "./pages/tools/CodeRefactor";
import CodeOptimizer from "./pages/tools/CodeOptimizer";
import UnitTestGenerator from "./pages/tools/UnitTestGenerator";
import DocumentationGenerator from "./pages/tools/DocumentationGenerator";
import ApiGenerator from "./pages/tools/ApiGenerator";
import ConfigGenerator from "./pages/tools/ConfigGenerator";
import DeploymentScriptGenerator from "./pages/tools/DeploymentScriptGenerator";
import LintFixer from "./pages/tools/LintFixer";
import SecurityChecker from "./pages/tools/SecurityChecker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/changelog" element={<Changelog />} />
            
            {/* AI Tools Routes */}
            <Route path="/tools/code-generator" element={<CodeGenerator />} />
            <Route path="/tools/bug-fixer" element={<BugFixer />} />
            <Route path="/tools/code-explainer" element={<CodeExplainer />} />
            <Route path="/tools/code-refactor" element={<CodeRefactor />} />
            <Route path="/tools/code-optimizer" element={<CodeOptimizer />} />
            <Route path="/tools/unit-test-generator" element={<UnitTestGenerator />} />
            <Route path="/tools/documentation-generator" element={<DocumentationGenerator />} />
            <Route path="/tools/api-generator" element={<ApiGenerator />} />
            <Route path="/tools/config-generator" element={<ConfigGenerator />} />
            <Route path="/tools/deployment-script-generator" element={<DeploymentScriptGenerator />} />
            <Route path="/tools/lint-fixer" element={<LintFixer />} />
            <Route path="/tools/security-checker" element={<SecurityChecker />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

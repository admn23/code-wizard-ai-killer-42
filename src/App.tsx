
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Changelog from "./pages/Changelog";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

// Tool pages
import CodeGenerator from "./pages/tools/CodeGenerator";
import BugFixer from "./pages/tools/BugFixer";
import CodeExplainer from "./pages/tools/CodeExplainer";
import CodeRefactor from "./pages/tools/CodeRefactor";
import CodeOptimizer from "./pages/tools/CodeOptimizer";
import UnitTestGenerator from "./pages/tools/UnitTestGenerator";
import ApiGenerator from "./pages/tools/ApiGenerator";
import ConfigGenerator from "./pages/tools/ConfigGenerator";
import DeploymentScriptGenerator from "./pages/tools/DeploymentScriptGenerator";
import DocumentationGenerator from "./pages/tools/DocumentationGenerator";
import LintFixer from "./pages/tools/LintFixer";
import SecurityChecker from "./pages/tools/SecurityChecker";

const queryClient = new QueryClient();

// Component to handle meta tags based on route
function MetaUpdater() {
  const location = useLocation();

  useEffect(() => {
    const routes = {
      '/': {
        title: 'Coding Killer - AI-Powered Development Tools',
        description: 'Transform your development workflow with AI-powered coding tools. Generate, debug, optimize, and explain code instantly with advanced AI technology.'
      },
      '/tools': {
        title: 'AI Coding Tools - Coding Killer',
        description: 'Explore our comprehensive suite of AI-powered coding tools including code generation, bug fixing, optimization, and more.'
      },
      '/tools/code-generator': {
        title: 'AI Code Generator - Generate Code from Natural Language',
        description: 'Generate clean, efficient code from natural language descriptions in any programming language with AI.'
      },
      '/tools/bug-fixer': {
        title: 'AI Bug Fixer - Automatically Fix Code Bugs',
        description: 'Detect and fix bugs in your code automatically with AI-powered debugging tools.'
      },
      '/tools/code-explainer': {
        title: 'AI Code Explainer - Understand Complex Code',
        description: 'Get detailed explanations of complex code snippets and algorithms with AI assistance.'
      },
      '/tools/code-refactor': {
        title: 'AI Code Refactor - Improve Code Quality',
        description: 'Improve code quality and maintainability with intelligent AI-powered refactoring.'
      },
      '/pricing': {
        title: 'Pricing Plans - Coding Killer',
        description: 'Choose the perfect plan for your development needs. Free and Pro plans available with flexible credit systems.'
      },
      '/about': {
        title: 'About Us - Coding Killer',
        description: 'Learn about Coding Killer and our mission to revolutionize software development with AI-powered tools.'
      },
      '/login': {
        title: 'Sign In - Coding Killer',
        description: 'Sign in to your Coding Killer account to access AI-powered development tools.'
      },
      '/signup': {
        title: 'Get Started - Coding Killer',
        description: 'Create your free Coding Killer account and start using AI-powered development tools today.'
      },
      '/dashboard': {
        title: 'Dashboard - Coding Killer',
        description: 'Your personal dashboard to manage AI tools, credits, and development projects.'
      },
      '/admin': {
        title: 'Admin Panel - Coding Killer',
        description: 'Admin panel for managing users, activities, and system analytics.'
      }
    };

    const route = routes[location.pathname] || {
      title: 'Coding Killer - AI-Powered Development Tools',
      description: 'AI-powered coding tools for modern developers.'
    };

    document.title = route.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', route.description);

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', route.title);

    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', route.description);
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <MetaUpdater />
              <div className="min-h-screen bg-background font-sans antialiased">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/changelog" element={<Changelog />} />
                  <Route path="/payment" element={<Payment />} />
                  
                  {/* Tool Routes */}
                  <Route path="/tools/code-generator" element={<CodeGenerator />} />
                  <Route path="/tools/bug-fixer" element={<BugFixer />} />
                  <Route path="/tools/code-explainer" element={<CodeExplainer />} />
                  <Route path="/tools/code-refactor" element={<CodeRefactor />} />
                  <Route path="/tools/code-optimizer" element={<CodeOptimizer />} />
                  <Route path="/tools/unit-test-generator" element={<UnitTestGenerator />} />
                  <Route path="/tools/api-generator" element={<ApiGenerator />} />
                  <Route path="/tools/config-generator" element={<ConfigGenerator />} />
                  <Route path="/tools/deployment-script-generator" element={<DeploymentScriptGenerator />} />
                  <Route path="/tools/documentation-generator" element={<DocumentationGenerator />} />
                  <Route path="/tools/lint-fixer" element={<LintFixer />} />
                  <Route path="/tools/security-checker" element={<SecurityChecker />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

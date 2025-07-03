
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Bug, 
  FileText, 
  Wrench, 
  Zap, 
  TestTube, 
  Globe, 
  Settings, 
  Rocket, 
  BookOpen,
  Shield,
  Sparkles
} from 'lucide-react';

const Tools = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: dataLoading } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tools = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "AI Code Generator",
      description: "Generate code from natural language descriptions in any programming language",
      href: "/tools/code-generator",
      credits: 1,
      category: "Generation"
    },
    {
      icon: <Bug className="h-8 w-8" />,
      title: "AI Bug Fixer",
      description: "Automatically detect and fix bugs in your code with AI-powered solutions",
      href: "/tools/bug-fixer",
      credits: 1,
      category: "Debugging"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "AI Code Explainer",
      description: "Get detailed explanations of complex code snippets and algorithms",
      href: "/tools/code-explainer",
      credits: 1,
      category: "Analysis"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "AI Code Refactor",
      description: "Improve code quality and maintainability with intelligent refactoring",
      href: "/tools/code-refactor",
      credits: 1,
      category: "Optimization"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Code Optimizer",
      description: "Optimize your code for better performance and efficiency",
      href: "/tools/code-optimizer",
      credits: 1,
      category: "Optimization"
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "AI Unit Test Generator",
      description: "Generate comprehensive unit tests for your functions and methods",
      href: "/tools/unit-test-generator",
      credits: 1,
      category: "Testing"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "AI API Generator",
      description: "Create REST API endpoints with proper routing and validation",
      href: "/tools/api-generator",
      credits: 2,
      category: "Generation"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "AI Config Generator",
      description: "Generate configuration files for popular frameworks and tools",
      href: "/tools/config-generator",
      credits: 1,
      category: "Generation"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "AI Deployment Scripts",
      description: "Create deployment scripts for various platforms and environments",
      href: "/tools/deployment-script-generator",
      credits: 2,
      category: "DevOps"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "AI Documentation Generator",
      description: "Generate comprehensive documentation for your codebase",
      href: "/tools/documentation-generator",
      credits: 1,
      category: "Documentation"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI Lint Fixer",
      description: "Automatically fix linting errors and improve code style",
      href: "/tools/lint-fixer",
      credits: 1,
      category: "Quality"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "AI Security Checker",
      description: "Scan your code for security vulnerabilities and get fixes",
      href: "/tools/security-checker",
      credits: 2,
      category: "Security"
    }
  ];

  const creditsRemaining = profile?.credits_remaining || 0;
  const tasksThisMonth = profile?.tasks_this_month || 0;
  const planType = profile?.plan_type || 'Free';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">AI Coding Tools</h1>
          <p className="text-xl text-gray-600">
            Supercharge your development workflow with our comprehensive suite of AI-powered tools
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-gray-600">AI Tools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{creditsRemaining}</div>
              <div className="text-sm text-gray-600">Credits Left</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{tasksThisMonth}</div>
              <div className="text-sm text-gray-600">Tasks This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{planType}</div>
              <div className="text-sm text-gray-600">Current Plan</div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} to={tool.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/10 hover:border-primary/30 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-primary">
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {tool.credits} credit{tool.credits > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Usage Tips */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">💡 Be Specific</h3>
                <p className="text-gray-600">
                  The more specific your prompts, the better the AI results. Include context, requirements, and expected output.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Combine Tools</h3>
                <p className="text-gray-600">
                  Use multiple tools together - generate code, then optimize it, add tests, and create documentation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔄 Iterate</h3>
                <p className="text-gray-600">
                  Don't hesitate to refine your requests. Each iteration helps the AI understand your needs better.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💾 Save Results</h3>
                <p className="text-gray-600">
                  Copy and save the generated code to your projects. Each result is uniquely generated for your needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tools;

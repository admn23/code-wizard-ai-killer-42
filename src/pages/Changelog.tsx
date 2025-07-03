
import { Navbar2 } from '@/components/ui/navbar-2';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Bug, Sparkles, Zap, Shield, Plus } from 'lucide-react';

const Changelog = () => {
  const updates = [
    {
      version: "v1.2.0",
      date: "January 2024",
      type: "feature",
      items: [
        {
          icon: <Plus className="h-4 w-4" />,
          title: "New API Generator Tool",
          description: "Generate REST API endpoints with proper routing and validation",
          type: "new"
        },
        {
          icon: <Sparkles className="h-4 w-4" />,
          title: "Enhanced Code Explainer",
          description: "Better algorithm explanations with step-by-step breakdowns",
          type: "improvement" 
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Faster Response Times",
          description: "Optimized AI processing for 40% faster code generation",
          type: "improvement"
        }
      ]
    },
    {
      version: "v1.1.5",
      date: "December 2023", 
      type: "bugfix",
      items: [
        {
          icon: <Bug className="h-4 w-4" />,
          title: "Credit Usage Accuracy",
          description: "Fixed issue where credits were incorrectly calculated for large code inputs",
          type: "fix"
        },
        {
          icon: <Shield className="h-4 w-4" />,
          title: "Security Enhancement",
          description: "Improved user authentication and session management",
          type: "fix"
        }
      ]
    },
    {
      version: "v1.1.0",
      date: "November 2023",
      type: "feature",
      items: [
        {
          icon: <Plus className="h-4 w-4" />,
          title: "Unit Test Generator",
          description: "Generate comprehensive unit tests for your functions and methods",
          type: "new"
        },
        {
          icon: <Plus className="h-4 w-4" />,
          title: "Code Refactor Tool",
          description: "Improve code quality and maintainability with intelligent refactoring",
          type: "new"
        },
        {
          icon: <Wrench className="h-4 w-4" />,
          title: "Dashboard Improvements",
          description: "Enhanced user dashboard with better credit tracking and usage analytics",
          type: "improvement"
        }
      ]
    },
    {
      version: "v1.0.5",
      date: "October 2023",
      type: "bugfix", 
      items: [
        {
          icon: <Bug className="h-4 w-4" />,
          title: "Login Issues Fixed",
          description: "Resolved authentication problems for users with special characters in passwords",
          type: "fix"
        },
        {
          icon: <Bug className="h-4 w-4" />,
          title: "Code Syntax Highlighting",
          description: "Fixed syntax highlighting issues in generated code blocks",
          type: "fix"
        }
      ]
    },
    {
      version: "v1.0.0",
      date: "September 2023",
      type: "launch",
      items: [
        {
          icon: <Sparkles className="h-4 w-4" />,
          title: "Initial Launch",
          description: "Coding Killer officially launched with core AI tools",
          type: "new"
        },
        {
          icon: <Plus className="h-4 w-4" />,
          title: "Core Features",
          description: "Code Generator, Bug Fixer, Code Explainer, and Optimizer tools",
          type: "new"
        },
        {
          icon: <Plus className="h-4 w-4" />,
          title: "User Authentication",
          description: "Secure user registration and credit-based system",
          type: "new"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new': return 'bg-green-100 text-green-800 border-green-200';
      case 'improvement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fix': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-primary';
      case 'bugfix': return 'bg-red-600';
      case 'launch': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="Changelog"
        description="Stay updated with the latest features, improvements, and bug fixes in Coding Killer"
        canonical="/changelog"
      />
      
      <Navbar2 />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Changelog</h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest features, improvements, and bug fixes
            </p>
          </div>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">{update.version}</CardTitle>
                      <Badge className={getVersionBadgeColor(update.type)}>
                        {update.type === 'feature' && 'New Features'}
                        {update.type === 'bugfix' && 'Bug Fixes'}
                        {update.type === 'launch' && 'Launch'}
                      </Badge>
                    </div>
                    <span className="text-gray-500">{update.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {update.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="text-primary mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <Badge variant="outline" className={getTypeColor(item.type)}>
                              {item.type === 'new' && 'New'}
                              {item.type === 'improvement' && 'Improved'}
                              {item.type === 'fix' && 'Fixed'}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Want to be notified about new features and updates? Follow our development progress.
              </p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="mailto:21ashikur1234@gmail.com" 
                  className="text-primary hover:underline font-medium"
                >
                  Subscribe to Updates
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Changelog;

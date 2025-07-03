
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar1 } from '@/components/ui/navbar-1';
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
  Sparkles,
  Check
} from 'lucide-react';
import FloatingCTA from '@/components/FloatingCTA';
import CookieConsent from '@/components/CookieConsent';
import SuccessShowcase from '@/components/SuccessShowcase';
import RealtimeCounter from '@/components/RealtimeCounter';
import SocialMediaCTA from '@/components/SocialMediaCTA';
import AIDemo from '@/components/AIDemo';
import FAQ from '@/components/FAQ';
import CodeSlideDemo from '@/components/CodeSlideDemo';

const Index = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "AI Code Generator",
      description: "Generate code from natural language descriptions in any programming language"
    },
    {
      icon: <Bug className="h-8 w-8" />,
      title: "AI Bug Fixer",
      description: "Automatically detect and fix bugs in your code with AI-powered solutions"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Code Explainer",
      description: "Get detailed explanations of complex code snippets and algorithms"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Code Refactor",
      description: "Improve code quality and maintainability with intelligent refactoring"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Code Optimizer",
      description: "Optimize your code for better performance and efficiency"
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "Unit Test Generator",
      description: "Generate comprehensive unit tests for your functions and methods"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "API Generator",
      description: "Create REST API endpoints with proper routing and validation"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Config Generator",
      description: "Generate configuration files for popular frameworks and tools"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Deployment Scripts",
      description: "Create deployment scripts for various platforms and environments"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Documentation Generator",
      description: "Generate comprehensive documentation for your codebase"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Lint Fixer",
      description: "Automatically fix linting errors and improve code style"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Checker",
      description: "Scan your code for security vulnerabilities and get fixes"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Choose Your Plan",
      description: "Select a subscription plan that fits your coding needs"
    },
    {
      step: "2",
      title: "Use AI Tools",
      description: "Access our comprehensive suite of AI-powered coding tools"
    },
    {
      step: "3",
      title: "Code Smarter",
      description: "Write better code faster with AI assistance and automation"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$5",
      bdtPrice: "৳625",
      period: "/month",
      description: "Perfect for individual developers",
      credits: 200,
      popular: false,
      features: [
        "200 AI credits per month",
        "All AI tools access",
        "Email support",
        "Basic usage analytics"
      ]
    },
    {
      name: "Pro",
      price: "$10",
      bdtPrice: "৳1,250",
      period: "/month",
      description: "Ideal for professional developers",
      credits: 500,
      popular: true,
      features: [
        "500 AI credits per month",
        "All AI tools access",
        "Priority processing",
        "Priority email support",
        "Advanced analytics"
      ]
    },
    {
      name: "Enterprise",
      price: "$20",
      bdtPrice: "৳2,500",
      period: "/month",
      description: "For teams and organizations",
      credits: 1500,
      popular: false,
      features: [
        "1,500 AI credits per month",
        "All AI tools access",
        "Highest priority processing",
        "24/7 priority support",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-roboto">
      <Navbar1 />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">AI Powered</span><br />
                <span className="text-gray-900">Coding Assistant</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Revolutionize your development workflow with AI-powered code generation, 
                debugging, optimization, and more. Code smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                    Start Coding with AI
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="h-96 w-full">
                <CodeSlideDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Counter */}
      <RealtimeCounter />

      {/* Success Showcase */}
      <SuccessShowcase />

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Powerful AI Tools</h2>
            <p className="text-xl text-gray-600">Everything you need to supercharge your development workflow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-slide-up border-primary/10">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo */}
      <AIDemo />

      {/* Compare Plans Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.bdtPrice} BDT</p>
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6 text-center">
                    <div className="text-2xl font-bold text-primary">{plan.credits}</div>
                    <div className="text-sm text-gray-600">AI credits per month</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/payment" state={{ plan: plan.name, price: plan.price }}>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">How It Works</h2>
            <p className="text-xl text-gray-600">Get started with AI-powered coding in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <SocialMediaCTA />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-hero-gradient text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Code Smarter?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already using AI to write better code faster
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CK</span>
                </div>
                <span className="text-xl font-bold">Coding Killer</span>
              </div>
              <p className="text-gray-400">
                AI-powered coding assistant for developers
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/tools" className="hover:text-white">Tools</Link></li>
                <li><Link to="/changelog" className="hover:text-white">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><a href="mailto:21ashikur1234@gmail.com" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Coding Killer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Components */}
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
};

export default Index;

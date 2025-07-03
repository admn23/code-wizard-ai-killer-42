
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar1 } from '@/components/ui/navbar-1';
import SEO from '@/components/SEO';
import TypingAnimation from '@/components/TypingAnimation';
import CodeSlider from '@/components/CodeSlider';
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
  Check,
  Play,
  ChevronRight,
  Star,
  Users,
  MessageCircle,
  Github
} from 'lucide-react';
import FloatingCTA from '@/components/FloatingCTA';
import CookieConsent from '@/components/CookieConsent';
import SuccessShowcase from '@/components/SuccessShowcase';
import RealtimeCounter from '@/components/RealtimeCounter';

const Index = () => {
  const typingTexts = [
    "Generate Code with AI",
    "Fix Bugs Instantly", 
    "Optimize Performance",
    "Create Documentation",
    "Build APIs Faster"
  ];

  const sampleCode = `// AI Generated React Component
import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {user.joinDate}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;`;

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

  const aiDemoExamples = [
    {
      title: "React Component Generator",
      description: "Generate a complete React component with props and state management",
      example: "Create a user profile card with hover effects",
      result: "✅ Generated functional React component with TypeScript support"
    },
    {
      title: "Bug Detection & Fix",
      description: "Automatically identify and fix common programming errors",
      example: "Fix memory leak in useEffect hook",
      result: "✅ Identified missing dependency array and cleanup function"
    },
    {
      title: "API Endpoint Creation",
      description: "Build RESTful API endpoints with proper validation",
      example: "Create user authentication API with JWT",
      result: "✅ Generated secure API with bcrypt hashing and middleware"
    },
    {
      title: "Database Query Optimization",
      description: "Optimize slow database queries for better performance",
      example: "Optimize complex JOIN query for user analytics",
      result: "✅ Improved query performance by 85% with proper indexing"
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

  const faqs = [
    {
      question: "How does the AI code generation work?",
      answer: "Our AI uses advanced machine learning models trained on millions of code repositories to understand your requirements and generate high-quality, production-ready code in any programming language."
    },
    {
      question: "What programming languages are supported?",
      answer: "We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, TypeScript, PHP, Ruby, and many more. The AI can also work with frameworks and libraries."
    },
    {
      question: "How accurate is the bug detection?",
      answer: "Our AI bug detection has a 95% accuracy rate for common programming errors, memory leaks, security vulnerabilities, and performance issues. It continuously learns from new patterns."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Yes! All generated code is yours to use in any project, including commercial applications. We don't claim any ownership over the code you generate."
    },
    {
      question: "What if I run out of credits?",
      answer: "You can upgrade your plan anytime or purchase additional credits. We also offer custom enterprise plans for high-volume usage."
    },
    {
      question: "Is my code data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never store your code permanently. All processing is done securely and your intellectual property remains yours."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="Home"
        description="AI-powered coding assistant that helps developers write better code faster with intelligent code generation, bug fixing, optimization, and more."
        keywords="AI coding assistant, code generator, bug fixer, code optimization, programming tools"
        canonical="/"
      />
      
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
              
              <div className="text-xl md:text-2xl mb-6 min-h-[2rem]">
                <TypingAnimation texts={typingTexts} />
              </div>
              
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
                <CodeSlider 
                  code={sampleCode}
                  language="javascript"
                  title="AI Generated Component"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Counter */}
      <RealtimeCounter />

      {/* Powerful AI Tools Section - Moved before Success Stories */}
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

      {/* Success Showcase - Moved after Powerful AI Tools */}
      <SuccessShowcase />

      {/* See AI in Action Section - Modern Grid Layout */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">See AI in Action</h2>
            <p className="text-xl text-gray-600">Watch how our AI transforms your development workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiDemoExamples.map((demo, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {demo.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {demo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Example:</strong> {demo.example}
                    </p>
                    <p className="text-sm text-green-600">
                      {demo.result}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Try This Tool
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tools">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore All Tools
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compare Plans Section */}
      <section className="py-20 px-4 bg-white">
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

      {/* Frequently Asked Questions - Updated Layout */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our AI coding assistant</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Community Section - Replaced Join Our Community */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">Join Our Developer Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with thousands of developers, share your projects, get help, and stay updated with the latest AI coding trends.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">50,000+</h3>
              <p className="text-gray-600">Active Developers</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7</h3>
              <p className="text-gray-600">Community Support</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Github className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Open Source</h3>
              <p className="text-gray-600">Collaborative Projects</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Join Discord Community
            </Button>
            <Button variant="outline" size="lg">
              Follow on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
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
                <img 
                  src="/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png" 
                  alt="Coding Killer Logo" 
                  className="w-8 h-8"
                />
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

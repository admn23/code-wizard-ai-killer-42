
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import TypingAnimation from "@/components/TypingAnimation";
import { 
  Code, 
  Bug, 
  FileText, 
  Wrench, 
  Zap, 
  TestTube,
  ArrowRight,
  Star,
  Users,
  CheckCircle,
  Globe,
  Shield,
  Rocket,
  Clock,
  TrendingUp,
  Award,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import RealtimeCounter from "@/components/RealtimeCounter";

const Index = () => {
  const tools = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "AI Code Generator",
      description: "Generate clean, efficient code from natural language descriptions",
      category: "Generation"
    },
    {
      icon: <Bug className="h-8 w-8" />,
      title: "AI Bug Fixer",
      description: "Automatically detect and fix bugs in your existing code",
      category: "Debugging"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "AI Code Explainer",
      description: "Get detailed explanations of complex code snippets",
      category: "Analysis"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "AI Code Refactor",
      description: "Improve code quality and maintainability",
      category: "Optimization"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Code Optimizer",
      description: "Optimize your code for better performance",
      category: "Performance"
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "AI Test Generator",
      description: "Generate comprehensive unit tests automatically",
      category: "Testing"
    }
  ];

  const aiExamples = [
    {
      title: "React Component Generation",
      description: "Create responsive React components with TypeScript",
      input: "Create a responsive navbar with dark mode toggle",
      output: "Complete NavBar component with hooks and styling",
      language: "tsx"
    },
    {
      title: "API Integration",
      description: "Generate API calls with error handling",
      input: "Create a function to fetch user data from REST API",
      output: "Async function with try-catch and TypeScript types",
      language: "typescript"
    },
    {
      title: "Database Operations",
      description: "SQL queries and database schema generation",
      input: "Create a user table with authentication fields",
      output: "Complete SQL schema with indexes and constraints",
      language: "sql"
    },
    {
      title: "Algorithm Implementation",
      description: "Complex algorithms made simple",
      input: "Implement binary search with edge cases",
      output: "Optimized binary search with TypeScript",
      language: "typescript"
    }
  ];

  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      company: "TechCorp",
      image: "/placeholder.svg",
      quote: "Coding Killer reduced my development time by 60%. The AI suggestions are incredibly accurate.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Senior Engineer",
      company: "StartupXYZ",
      image: "/placeholder.svg", 
      quote: "The bug fixing feature saved me hours of debugging. It's like having a senior developer mentor.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Frontend Developer",
      company: "WebStudio",
      image: "/placeholder.svg",
      quote: "Perfect for learning new frameworks. The code explanations are detailed and easy to understand.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How accurate is the AI-generated code?",
      answer: "Our AI achieves 95%+ accuracy for common programming tasks. All generated code follows best practices and is production-ready."
    },
    {
      question: "What programming languages are supported?", 
      answer: "We support 20+ languages including JavaScript, Python, TypeScript, Java, C++, Go, Rust, and more."
    },
    {
      question: "Is my code data secure?",
      answer: "Yes, we use enterprise-grade encryption. Your code is processed securely and never stored permanently."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Absolutely! All generated code comes with commercial usage rights. No attribution required."
    },
    {
      question: "How does the credit system work?",
      answer: "Each AI operation costs 1-2 credits. Free users get 5 credits, Pro users get 500 credits monthly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Code Smarter with{" "}
              <span className="gradient-text">AI-Powered Tools</span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-muted-foreground mb-6 min-h-[2em]">
              <TypingAnimation 
                text="Generate, Debug, Optimize, and Explain code instantly with advanced AI"
                speed={80}
                className="font-medium"
              />
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your development workflow with our comprehensive suite of AI coding tools. 
              From code generation to bug fixing, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/signup">
                  Start Coding Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/tools">
                  Explore Tools
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>50,000+ Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Enterprise Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RealtimeCounter />

      {/* Powerful AI Tools Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful <span className="gradient-text">AI Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to supercharge your development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/tools">
                View All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* See AI in Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See AI in <span className="gradient-text">Action</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real examples of how our AI transforms your development process
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiExamples.map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <Badge variant="outline">{example.language}</Badge>
                  </div>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">INPUT:</h4>
                    <div className="bg-secondary/50 p-3 rounded-lg text-sm">
                      "{example.input}"
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">OUTPUT:</h4>
                    <div className="bg-primary/10 p-3 rounded-lg text-sm border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-primary font-medium">{example.output}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from developers who transformed their workflow with Coding Killer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base mb-4 italic">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-10 h-10 rounded-full bg-primary/10"
                    />
                    <div>
                      <div className="font-semibold">{story.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {story.role} at {story.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Coding Killer
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Community Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-green-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join the <span className="gradient-text">Developer Revolution</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a growing community of developers who are transforming how code is written, 
              debugged, and optimized with AI-powered tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">Get help whenever you need it from our expert team</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Continuous Updates</h3>
                <p className="text-muted-foreground">New features and improvements released every week</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Industry Leading</h3>
                <p className="text-muted-foreground">Trusted by developers at top companies worldwide</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/signup">
                  Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">Coding Killer</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Supercharge your development with AI-powered coding tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/tools/code-generator" className="hover:text-primary">Code Generator</Link></li>
                <li><Link to="/tools/bug-fixer" className="hover:text-primary">Bug Fixer</Link></li>
                <li><Link to="/tools/code-explainer" className="hover:text-primary">Code Explainer</Link></li>
                <li><Link to="/tools/code-refactor" className="hover:text-primary">Code Refactor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About</Link></li>
                <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
                <li><Link to="/changelog" className="hover:text-primary">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="hover:text-primary">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Coding Killer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

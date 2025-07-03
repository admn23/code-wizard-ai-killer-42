
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
  Check,
  Play,
  Star,
  Users,
  Award,
  ChevronDown
} from 'lucide-react';
import TypingAnimation from '@/components/TypingAnimation';
import CodeSlider from '@/components/CodeSlider';
import SEO from '@/components/SEO';
import { useState } from 'react';

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

  const aiExamples = [
    {
      title: "React Component Generator",
      description: "Generate modern React components with TypeScript",
      input: "Create a user profile card component with avatar, name, email, and social links",
      output: `function UserProfileCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        {user.socialLinks.map(link => (
          <a key={link.platform} href={link.url}>
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
}`,
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Bug Detection & Fix",
      description: "Automatically detect and fix common programming errors",
      input: "Fix the infinite loop in this React useEffect",
      output: `// Before (Infinite loop)
useEffect(() => {
  setCount(count + 1);
});

// After (Fixed)
useEffect(() => {
  setCount(prevCount => prevCount + 1);
}, []); // Added dependency array`,
      icon: <Bug className="h-6 w-6" />
    },
    {
      title: "API Endpoint Creation",
      description: "Generate REST API endpoints with validation",
      input: "Create a POST endpoint for user registration with validation",
      output: `app.post('/api/users/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});`,
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const [activeExample, setActiveExample] = useState(0);

  const faqData = [
    {
      question: "What is Coding Killer?",
      answer: "Coding Killer is an AI-powered coding assistant that helps developers write better code faster. It offers various tools like code generation, bug fixing, optimization, and more."
    },
    {
      question: "How does the credit system work?",
      answer: "Each AI tool usage consumes credits. Different tools may consume different amounts of credits based on their complexity. Credits are refilled monthly based on your subscription plan."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all new users get 5 free credits to try our AI tools before subscribing to a paid plan."
    },
    {
      question: "What programming languages are supported?",
      answer: "Our AI tools support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, PHP, and many more."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="AI Powered Coding Assistant - Generate, Fix & Optimize Code"
        description="Revolutionary AI coding assistant that generates code instantly, fixes bugs automatically, and optimizes performance. Write better code faster with 12+ AI-powered tools."
        keywords="AI code generator, automated bug fixing, code optimization, AI programming assistant, coding tools"
        canonical="https://codingkiller.com"
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
              
              {/* Typing Animation */}
              <div className="text-2xl md:text-3xl mb-6 h-12 flex items-center">
                <TypingAnimation 
                  texts={[
                    "Generate Code Instantly",
                    "Fix Bugs Automatically", 
                    "Optimize Performance",
                    "Create Documentation",
                    "Build APIs Faster"
                  ]}
                  speed={100}
                  deleteSpeed={50}
                  delayBetweenTexts={2000}
                />
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
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 text-sm font-mono">AI Code Generator</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-blue-400">// Input: Create a login function</div>
                  <div className="text-white">
                    <span className="text-purple-400">function</span>{" "}
                    <span className="text-yellow-300">login</span>
                    <span className="text-white">(email, password) {"{"}</span>
                  </div>
                  <div className="text-white ml-4">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">user</span> = 
                    <span className="text-purple-400"> await</span>{" "}
                    <span className="text-yellow-300">authenticate</span>(email, password);
                  </div>
                  <div className="text-white ml-4">
                    <span className="text-purple-400">return</span> user;
                  </div>
                  <div className="text-white">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful AI Tools */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Powerful AI Tools</h2>
            <p className="text-xl text-gray-600">Everything you need to supercharge your development workflow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-slide-up border-primary/10 hover-scale">
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

      {/* Success Stories */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how developers are transforming their workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Sarah Chen</h3>
                    <p className="text-sm text-gray-600">Frontend Developer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">"Coding Killer reduced my development time by 60%. The AI code generator is incredibly accurate and saves me hours of repetitive coding."</p>
                <div className="flex mt-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Mike Rodriguez</h3>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">"The bug fixer tool is a game-changer. It not only finds bugs but explains why they occur and how to prevent them in the future."</p>
                <div className="flex mt-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Emily Johnson</h3>
                    <p className="text-sm text-gray-600">DevOps Engineer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">"The deployment script generator helped me automate our entire CI/CD pipeline. What used to take days now takes minutes."</p>
                <div className="flex mt-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* See AI in Action */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">See AI in Action</h2>
            <p className="text-xl text-gray-600">Watch our AI tools solve real coding challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiExamples.map((example, index) => (
              <Card key={index} className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeExample === index 
                  ? 'border-primary bg-primary/5 shadow-md transform scale-105' 
                  : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
              }`}
              onClick={() => setActiveExample(index)}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${
                      activeExample === index ? 'bg-primary text-white' : 'bg-gray-100 text-primary'
                    }`}>
                      {example.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription className="text-sm">{example.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm text-gray-600">Input:</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border italic">
                      "{example.input}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-600">AI Generated Output:</h4>
                    <CodeSlider 
                      code={example.output}
                      language="javascript"
                      maxHeight={200}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <Card key={index} className={`relative hover-scale ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-gray-200'}`}>
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
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our AI coding tools</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-700 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
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

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-green-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest updates on new AI tools and features
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Code Smarter?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already using AI to write better code faster
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100">
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
                  className="h-8 w-8"
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
    </div>
  );
};

export default Index;

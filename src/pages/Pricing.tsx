
import { Navbar1 } from '@/components/ui/navbar-1';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$5",
      bdtPrice: "৳625",
      period: "/month",
      description: "Perfect for individual developers getting started",
      credits: 200,
      popular: false,
      features: [
        "200 AI credits per month",
        "All AI tools access",
        "Email support",
        "Basic usage analytics",
        "Code generation & optimization",
        "Bug fixing & debugging",
        "Documentation generation"
      ]
    },
    {
      name: "Pro",
      price: "$10",
      bdtPrice: "৳1,250",
      period: "/month",
      description: "Ideal for professional developers and small teams",
      credits: 500,
      popular: true,
      features: [
        "500 AI credits per month",
        "All AI tools access",
        "Priority processing",
        "Priority email support",
        "Advanced analytics",
        "Export code history",
        "Enhanced AI models",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "$20",
      bdtPrice: "৳2,500",
      period: "/month",
      description: "For teams and organizations with heavy usage",
      credits: 1500,
      popular: false,
      features: [
        "1,500 AI credits per month",
        "All AI tools access",
        "Highest priority processing",
        "24/7 priority support",
        "Team collaboration features",
        "Usage reporting & analytics",
        "API access",
        "Dedicated account manager",
        "Custom AI model training",
        "White-label options"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-roboto">
      <Navbar1 />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your development needs. All plans include access to our complete suite of AI-powered coding tools.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-gray-200'}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
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

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                question: "How do credits work?",
                answer: "Each AI task (code generation, bug fixing, etc.) consumes 1-2 credits. Credits reset monthly with your subscription."
              },
              {
                question: "Can I change plans anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept payments via bKash. Simply send money to our number and submit the transaction ID."
              },
              {
                question: "Is there a free trial?",
                answer: "New users get 10 free credits to try our AI tools before purchasing a subscription."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

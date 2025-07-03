
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureComparison = () => {
  const plans = [
    {
      name: "Free",
      price: "৳0",
      period: "forever",
      credits: 5,
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      popular: false
    },
    {
      name: "Starter",
      price: "৳5",
      period: "one-time",
      credits: 50,
      color: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: false
    },
    {
      name: "Pro",
      price: "৳10",
      period: "monthly",
      credits: 500,
      color: "border-primary ring-2 ring-primary/20",
      buttonColor: "bg-primary hover:bg-primary/90",
      popular: true
    },
    {
      name: "Enterprise",
      price: "৳20",
      period: "monthly",
      credits: 2000,
      color: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      popular: false
    }
  ];

  const features = [
    { name: "AI Code Generator", free: true, starter: true, pro: true, enterprise: true },
    { name: "Bug Fixer", free: true, starter: true, pro: true, enterprise: true },
    { name: "Code Explainer", free: true, starter: true, pro: true, enterprise: true },
    { name: "Code Optimizer", free: false, starter: true, pro: true, enterprise: true },
    { name: "Unit Test Generator", free: false, starter: true, pro: true, enterprise: true },
    { name: "API Generator", free: false, starter: false, pro: true, enterprise: true },
    { name: "Documentation Generator", free: false, starter: false, pro: true, enterprise: true },
    { name: "Security Checker", free: false, starter: false, pro: true, enterprise: true },
    { name: "Priority Support", free: false, starter: false, pro: true, enterprise: true },
    { name: "Custom Integrations", free: false, starter: false, pro: false, enterprise: true },
    { name: "Team Collaboration", free: false, starter: false, pro: false, enterprise: true },
    { name: "Advanced Analytics", free: false, starter: false, pro: false, enterprise: true }
  ];

  const getFeatureValue = (feature: any, plan: string) => {
    const value = feature[plan.toLowerCase()];
    return value ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-300" />;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Compare Plans</h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your coding needs
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.color} relative ${plan.popular ? 'transform scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.credits} credits {plan.period === 'monthly' ? 'per month' : ''}</p>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/pricing">
                  <Button className={`w-full ${plan.buttonColor}`}>
                    {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h3>
          
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 mb-4 pb-4 border-b">
              <div className="font-semibold text-gray-800">Features</div>
              {plans.map((plan, index) => (
                <div key={index} className="text-center font-semibold text-gray-800">
                  {plan.name}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 py-3 border-b border-gray-200 hover:bg-white/50 transition-colors">
                <div className="text-gray-700 font-medium">{feature.name}</div>
                <div className="text-center">{getFeatureValue(feature, 'free')}</div>
                <div className="text-center">{getFeatureValue(feature, 'starter')}</div>
                <div className="text-center">{getFeatureValue(feature, 'pro')}</div>
                <div className="text-center">{getFeatureValue(feature, 'enterprise')}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Need a custom plan? Contact us for enterprise solutions.
          </p>
          <a href="mailto:21ashikur1234@gmail.com" className="text-primary hover:underline font-medium">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;

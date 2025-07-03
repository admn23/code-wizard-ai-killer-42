
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI code generation work?",
      answer: "Our AI uses advanced language models trained on millions of code examples to understand your requirements and generate high-quality code in any programming language."
    },
    {
      question: "What programming languages are supported?",
      answer: "We support all major programming languages including Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, PHP, Ruby, and many more."
    },
    {
      question: "How many credits do I get per month?",
      answer: "Credits vary by plan: Starter (200 credits), Pro (500 credits), and Enterprise (1,500 credits). Each AI task typically consumes 1-2 credits."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period."
    },
    {
      question: "Is my code data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and never store your code permanently. All data is processed securely and deleted after generation."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 7-day money-back guarantee for all paid subscriptions if you're not satisfied with our service."
    },
    {
      question: "How accurate is the AI-generated code?",
      answer: "Our AI generates highly accurate, production-ready code with over 95% accuracy. However, we always recommend reviewing and testing generated code."
    },
    {
      question: "Can I integrate Coding Killer with my IDE?",
      answer: "We're working on IDE extensions. Currently, you can copy-paste code from our web platform. API access is available for Enterprise users."
    },
    {
      question: "What makes Coding Killer different from other AI coding tools?",
      answer: "We focus specifically on the Bangladeshi developer community with local payment methods, Bengali support, and pricing tailored for our market."
    },
    {
      question: "Do you provide technical support?",
      answer: "Yes! All plans include email support. Pro and Enterprise users get priority support with faster response times."
    },
    {
      question: "Can I use Coding Killer for commercial projects?",
      answer: "Yes, all generated code can be used in commercial projects without any licensing restrictions or attribution requirements."
    },
    {
      question: "How do I get started with Coding Killer?",
      answer: "Simply sign up for an account, choose your plan, and start using our AI tools immediately. New users get 10 free credits to try our platform."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold gradient-text">Frequently Asked Questions</h2>
          </div>
          <p className="text-xl text-gray-600">
            Everything you need to know about Coding Killer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="mailto:21ashikur1234@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


import { Navbar2 } from '@/components/ui/navbar-2';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Mail, Shield } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="Refund Policy"
        description="Clear and transparent refund policy for Coding Killer services"
        canonical="/refund-policy"
      />
      
      <Navbar2 />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Refund Policy</h1>
            <p className="text-xl text-gray-600">
              Clear and transparent refund policy for Coding Killer services
            </p>
          </div>

          <div className="space-y-8">
            {/* Refund Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Refund Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">We offer refunds only under the following conditions:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>You made a payment but no credits were used from your account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>You mistakenly purchased a wrong plan and contacted us within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Technical issues on our end prevented you from using the service after payment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Non-Refundable Situations */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Non-Refundable Situations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">No refund will be granted in the following cases:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Credits have already been consumed or used for AI tasks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>More than 24 hours have passed since payment for wrong plan purchases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Dissatisfaction with AI-generated results (quality is subjective)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How to Request a Refund */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  How to Request a Refund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">To request a refund, please follow these steps:</p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Send an email to: 21ashikur1234@gmail.com</h3>
                      <p className="text-sm text-gray-600">Include your account details and reason for refund</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Provide Payment Information</h3>
                      <p className="text-sm text-gray-600">Include your bKash transaction ID and payment date</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Wait for Review</h3>
                      <p className="text-sm text-gray-600">We will review your request within 2-3 business days</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Receive Confirmation</h3>
                      <p className="text-sm text-gray-600">If approved, refund will be processed within 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Time */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Refund Processing Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Review Period</h4>
                    <p className="text-sm text-gray-600">2-3 business days for request evaluation</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Processing Time</h4>
                    <p className="text-sm text-gray-600">5-7 business days for approved refunds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-bold mb-2">Questions About Refunds?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our refund policy, please don't hesitate to contact us.
                </p>
                <a 
                  href="mailto:21ashikur1234@gmail.com" 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Mail className="h-4 w-4" />
                  21ashikur1234@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

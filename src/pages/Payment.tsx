
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar2 } from '@/components/ui/navbar-2';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, Copy, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const Payment = () => {
  const location = useLocation();
  const planData = location.state || { plan: 'Pro', price: '$10' };
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bkashNumber = "01898864211";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error('Please enter transaction ID');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Payment submitted successfully! We will verify and activate your plan within 24 hours.');
    setIsSubmitting(false);
  };

  const planDetails = {
    Pro: {
      price: '$10',
      bdtPrice: '৳1,250',
      credits: 500,
      features: [
        '500 AI credits per month',
        'Access to all AI coding tools',
        'Priority processing',
        'Email support'
      ]
    },
    Enterprise: {
      price: '$20',
      bdtPrice: '৳2,500',
      credits: 1500,
      features: [
        '1,500 AI credits per month',
        'Access to all AI coding tools',
        'Highest priority processing',
        '24/7 priority support',
        'API access'
      ]
    }
  };

  const currentPlan = planDetails[planData.plan as keyof typeof planDetails] || planDetails.Pro;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="Complete Payment"
        description="Subscribe to Pro Plan and start coding with AI assistance"
        canonical="/payment"
      />
      
      <Navbar2 />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Subscribe to {planData.plan} Plan and start coding with AI assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Instructions
                </CardTitle>
                <CardDescription>
                  Follow these simple steps to complete your payment via bKash
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Send Money via bKash</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Send {currentPlan.bdtPrice} to {bkashNumber}
                      </p>
                      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                        <code className="text-sm font-mono">{bkashNumber}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bkashNumber)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Note the Transaction ID</h3>
                      <p className="text-sm text-gray-600">
                        Save the transaction ID from your bKash confirmation message
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Submit Transaction ID</h3>
                      <p className="text-sm text-gray-600">
                        Enter the transaction ID in the form below
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Wait for Verification</h3>
                      <p className="text-sm text-gray-600">
                        We will verify and activate your plan within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{planData.plan} Plan</h3>
                        <p className="text-sm text-gray-600">Monthly subscription</p>
                      </div>
                      <Badge className="bg-primary">
                        {currentPlan.price}/month
                      </Badge>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{currentPlan.price}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Amount in BDT</span>
                        <span>{currentPlan.bdtPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>{currentPlan.bdtPrice}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">What you'll get:</h4>
                      <ul className="space-y-1">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Transaction ID */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit Transaction ID</CardTitle>
                  <CardDescription>
                    Enter your bKash transaction ID to complete the payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="transactionId">bKash Transaction ID</Label>
                      <Input
                        id="transactionId"
                        placeholder="e.g., 8A1B9C2D3E"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Important:</strong> Your plan will be activated within 24 hours after payment verification.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

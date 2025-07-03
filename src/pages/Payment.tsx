
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan = 'Pro', price = '$10' } = location.state || {};
  
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const bkashNumber = '01898864211';
  const bdtPrice = price === '$5' ? '৳625' : price === '$10' ? '৳1,250' : '৳2,500';

  const copyNumber = () => {
    navigator.clipboard.writeText(bkashNumber);
    toast.success('bKash number copied to clipboard!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction ID');
      return;
    }

    setSubmitting(true);
    
    // Simulate payment submission
    setTimeout(() => {
      toast.success('Payment submitted successfully! We will verify and activate your plan within 24 hours.');
      navigate('/dashboard');
      setSubmitting(false);
    }, 2000);
  };

  const steps = [
    {
      number: '1',
      title: 'Send Money via bKash',
      description: `Send ${bdtPrice} to ${bkashNumber}`,
      action: (
        <div className="flex items-center gap-2">
          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
            {bkashNumber}
          </code>
          <Button onClick={copyNumber} size="sm" variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    {
      number: '2',
      title: 'Note the Transaction ID',
      description: 'Save the transaction ID from your bKash confirmation message'
    },
    {
      number: '3',
      title: 'Submit Transaction ID',
      description: 'Enter the transaction ID in the form below'
    },
    {
      number: '4',
      title: 'Wait for Verification',
      description: 'We will verify and activate your plan within 24 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Complete Your Payment</h1>
            <p className="text-xl text-gray-600">
              Subscribe to {plan} Plan and start coding with AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Instructions
                </CardTitle>
                <CardDescription>
                  Follow these simple steps to complete your payment via bKash
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      {step.action && step.action}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Summary & Form */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{plan} Plan</h3>
                      <p className="text-sm text-gray-600">Monthly subscription</p>
                    </div>
                    <Badge className="bg-primary">{price}/month</Badge>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount in BDT</span>
                      <span>{bdtPrice}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">{bdtPrice}</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">What you'll get:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{plan === 'Starter' ? '200' : plan === 'Pro' ? '500' : '1500'} AI credits per month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Access to all AI coding tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Priority processing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Email support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit Transaction ID</CardTitle>
                  <CardDescription>
                    Enter your bKash transaction ID to complete the payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">bKash Transaction ID</Label>
                      <Input
                        id="transactionId"
                        type="text"
                        placeholder="e.g., 8A1B9C2D3E"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                      />
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Important:</strong> Your plan will be activated within 24 hours after payment verification. 
                        You will receive an email confirmation once your subscription is active.
                      </AlertDescription>
                    </Alert>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Payment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Help Section */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 gradient-text">Need Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Payment Issues?</h3>
                  <p className="text-sm text-gray-600">
                    If you're having trouble with bKash payment, contact us at{' '}
                    <a href="mailto:21ashikur1234@gmail.com" className="text-primary hover:underline">
                      21ashikur1234@gmail.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Wrong Transaction ID?</h3>
                  <p className="text-sm text-gray-600">
                    Double-check your bKash confirmation SMS for the correct transaction ID format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;

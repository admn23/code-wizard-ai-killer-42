
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <Cookie className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p>
                We use cookies to enhance your experience and improve our services. 
                By continuing to use our website, you agree to our use of cookies.{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

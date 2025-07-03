
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500); // Show after 500px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-3 min-w-[200px] relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
        
        <Sparkles className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">Start coding with AI!</p>
          <p className="text-xs opacity-90">Get 5 free credits</p>
        </div>
        
        <Link to="/signup">
          <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Try Free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FloatingCTA;


import { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

const RealtimeCounter = () => {
  const [count, setCount] = useState(132050);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add random increment between 1-5 every 3-8 seconds
      const increment = Math.floor(Math.random() * 5) + 1;
      setCount(prev => prev + increment);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Code className="h-8 w-8 text-primary animate-pulse" />
          <h3 className="text-2xl font-bold text-gray-800">Live Generation Counter</h3>
        </div>
        
        <div className="text-5xl font-bold gradient-text mb-2">
          {count.toLocaleString()}
        </div>
        
        <p className="text-gray-600 text-lg">
          lines of code generated today
        </p>
        
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live updates</span>
        </div>
      </div>
    </div>
  );
};

export default RealtimeCounter;

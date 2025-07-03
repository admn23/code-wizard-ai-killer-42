
import { useState, useEffect } from 'react';

const CodeSlideDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const codeExamples = [
    {
      language: "Python",
      code: `# AI-Generated Python Function
def fibonacci_generator(n):
    """Generate Fibonacci sequence up to n terms."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

def analyze_data(data):
    """Analyze and process large datasets efficiently."""
    import pandas as pd
    import numpy as np
    
    df = pd.DataFrame(data)
    return {
        'mean': np.mean(df.values),
        'std': np.std(df.values),
        'correlation': df.corr().to_dict()
    }

class APIHandler:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
    
    async def fetch_data(self, endpoint):
        response = await self.session.get(f"{self.base_url}/{endpoint}")
        return response.json()`
    },
    {
      language: "JavaScript",
      code: `// AI-Generated React Component
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SmartDashboard = ({ data, onUpdate }) => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);
  
  const processData = useCallback(async (rawData) => {
    setLoading(true);
    try {
      const processed = await analyzeMetrics(rawData);
      setMetrics(processed);
    } catch (error) {
      console.error('Data processing failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      processData(data);
    }
  }, [data, processData]);

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MetricsGrid metrics={metrics} onUpdate={onUpdate} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};`
    },
    {
      language: "TypeScript",
      code: `// AI-Generated TypeScript Interface & Service
interface UserProfile {
  id: string;
  email: string;
  preferences: UserPreferences;
  subscription: SubscriptionTier;
  createdAt: Date;
  lastActive: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
}

class UserService {
  private readonly apiClient: ApiClient;
  private readonly cache: Map<string, UserProfile> = new Map();

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    // Check cache first
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    try {
      const response = await this.apiClient.get<UserProfile>(\`/users/\${userId}\`);
      this.cache.set(userId, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  }

  async updatePreferences(userId: string, preferences: Partial<UserPreferences>): Promise<boolean> {
    try {
      await this.apiClient.patch(\`/users/\${userId}/preferences\`, preferences);
      // Invalidate cache
      this.cache.delete(userId);
      return true;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      return false;
    }
  }
}`
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % codeExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [codeExamples.length]);

  return (
    <div className="relative h-full overflow-hidden bg-slate-900 rounded-lg">
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      <div className="pt-12 px-6 pb-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">{codeExamples[currentIndex].language}</span>
          <div className="flex space-x-1">
            {codeExamples.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative h-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {codeExamples.map((example, index) => (
              <div key={index} className="min-w-full">
                <pre className="text-sm text-gray-100 leading-relaxed overflow-y-auto h-full">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSlideDemo;

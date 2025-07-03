import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCreditManager } from "@/hooks/useCreditManager";
import { Navbar2 } from "@/components/ui/navbar-2";
import SEO from "@/components/SEO";
import CodeSlider from "@/components/CodeSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Zap, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const CodeOptimizer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();

  const [inputCode, setInputCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [optimizationTips, setOptimizationTips] = useState<string[]>([]);
  const [performanceGains, setPerformanceGains] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleOptimize = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to optimize");
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      const mockOptimizedCode = `// Optimized Code
${inputCode}

// Performance optimizations applied:
// 1. Algorithm complexity reduced
// 2. Memory usage optimized
// 3. Unnecessary operations removed
// 4. Efficient data structures used`;

      const mockTips = [
        "Use array methods like map() and filter() instead of traditional loops for better performance",
        "Implement memoization for expensive function calls",
        "Use object destructuring to reduce property access",
        "Optimize database queries with proper indexing",
        "Implement lazy loading for large datasets",
        "Use web workers for CPU-intensive tasks",
      ];

      const mockPerformanceGains =
        "Estimated 40-60% performance improvement with 25% memory reduction";

      setOptimizedCode(mockOptimizedCode);
      setOptimizationTips(mockTips);
      setPerformanceGains(mockPerformanceGains);

      // Deduct credits and log activity
      await deductCredits(
        "AI Code Optimizer",
        requiredCredits,
        `Language: ${language}, Input: ${inputCode.substring(0, 100)}...`,
        mockOptimizedCode.substring(0, 200),
      );

      toast.success("Code optimized successfully!");
    } catch (error) {
      console.error("Error optimizing code:", error);
      toast.error("Failed to optimize code");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateOptimization = () => {
    if (optimizedCode) {
      handleOptimize();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">
              AI Code Optimizer
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Transform slow, performance-heavy code into lightning-fast optimized
            versions
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">1 Credit per optimization</Badge>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Credits remaining:</span>
              <Badge className="bg-primary">{currentCredits}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input Code</CardTitle>
              <CardDescription>
                Paste your performance-heavy or slow code below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Programming Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Enter your code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />

              <Button
                onClick={handleOptimize}
                disabled={isLoading || !inputCode.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Optimizing Code...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Optimize Code (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to optimize code.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Optimized Code</CardTitle>
                  <CardDescription>
                    Performance-enhanced version of your code
                  </CardDescription>
                </div>
                {optimizedCode && (
                  <Button
                    onClick={regenerateOptimization}
                    disabled={isLoading}
                    size="sm"
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {optimizedCode ? (
                <CodeSlider code={optimizedCode} language={language} />
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Optimized code will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        {(optimizationTips.length > 0 || performanceGains) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Performance Gains */}
            {performanceGains && (
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <TrendingUp className="h-5 w-5" />
                    Performance Gains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 font-medium">
                    {performanceGains}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Optimization Tips */}
            {optimizationTips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Speed Improvement Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {optimizationTips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-primary font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Optimization Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">⚡ Speed Optimization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Algorithm complexity reduction</li>
                  <li>• Loop optimization</li>
                  <li>• Caching strategies</li>
                  <li>• Parallel processing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💾 Memory Optimization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Memory leak prevention</li>
                  <li>• Efficient data structures</li>
                  <li>• Garbage collection optimization</li>
                  <li>• Resource cleanup</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Code profiling techniques</li>
                  <li>• Performance monitoring</li>
                  <li>• Benchmarking methods</li>
                  <li>• Continuous optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeOptimizer;

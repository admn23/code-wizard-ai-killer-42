
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCreditManager } from '@/hooks/useCreditManager';
import Header from '@/components/Header';
import CodeSlider from '@/components/CodeSlider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wrench, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const CodeRefactor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();
  
  const [inputCode, setInputCode] = useState('');
  const [refactorLevel, setRefactorLevel] = useState('basic');
  const [language, setLanguage] = useState('javascript');
  const [refactoredCode, setRefactoredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleRefactor = async () => {
    if (!inputCode.trim()) {
      toast.error('Please enter some code to refactor');
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      const mockRefactoredCode = `// Refactored Code (${refactorLevel} level)
${inputCode}

// Refactoring improvements applied:
// 1. Improved variable naming
// 2. Enhanced code structure
// 3. Better error handling
// 4. Optimized performance
${refactorLevel === 'advanced' ? '// 5. Advanced design patterns applied\n// 6. Memory optimization\n// 7. Code documentation added' : ''}`;

      setRefactoredCode(mockRefactoredCode);

      // Deduct credits and log activity
      await deductCredits(
        'AI Code Refactor',
        requiredCredits,
        `Language: ${language}, Level: ${refactorLevel}, Input: ${inputCode.substring(0, 100)}...`,
        mockRefactoredCode.substring(0, 200)
      );

      toast.success('Code refactored successfully!');
    } catch (error) {
      console.error('Error refactoring code:', error);
      toast.error('Failed to refactor code');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateRefactor = () => {
    if (refactoredCode) {
      handleRefactor();
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
            <Wrench className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Code Refactor</h1>
          </div>
          <p className="text-xl text-gray-600">
            Transform messy code into clean, readable, industry-standard code
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">1 Credit per refactor</Badge>
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
                Paste your messy or unoptimized code below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Programming Language</label>
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
                <div>
                  <label className="text-sm font-medium mb-2 block">Refactor Level</label>
                  <Select value={refactorLevel} onValueChange={setRefactorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Refactoring</SelectItem>
                      <SelectItem value="advanced">Advanced Refactoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Textarea
                placeholder="Enter your code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              
              <Button 
                onClick={handleRefactor}
                disabled={isLoading || !inputCode.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Refactoring Code...
                  </>
                ) : (
                  <>
                    <Wrench className="h-4 w-4 mr-2" />
                    Refactor Code (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to refactor code.
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
                  <CardTitle>Refactored Code</CardTitle>
                  <CardDescription>
                    Clean, optimized version of your code
                  </CardDescription>
                </div>
                {refactoredCode && (
                  <Button
                    onClick={regenerateRefactor}
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
              {refactoredCode ? (
                <CodeSlider 
                  code={refactoredCode}
                  language={language}
                />
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Refactored code will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Refactoring Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🔧 Basic Refactoring</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Improved variable and function naming</li>
                  <li>• Code structure optimization</li>
                  <li>• Basic error handling</li>
                  <li>• Code formatting and style</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚡ Advanced Refactoring</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Design pattern implementation</li>
                  <li>• Performance optimizations</li>
                  <li>• Memory usage improvements</li>
                  <li>• Comprehensive documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeRefactor;

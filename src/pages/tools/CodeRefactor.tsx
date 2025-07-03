
import { useState } from 'react';
import { Navbar2 } from '@/components/ui/navbar-2';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wrench, AlertCircle } from 'lucide-react';
import { useCreditManager } from '@/hooks/useCreditManager';
import { useAuth } from '@/contexts/AuthContext';
import CodeSlider from '@/components/CodeSlider';

const CodeRefactor = () => {
  const [inputCode, setInputCode] = useState('');
  const [refactoredCode, setRefactoredCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [refactorLevel, setRefactorLevel] = useState('basic');
  const [isRefactoring, setIsRefactoring] = useState(false);
  const { user } = useAuth();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();

  const handleRefactor = async () => {
    if (!user) {
      return;
    }

    if (!inputCode.trim()) {
      return;
    }

    const creditsNeeded = 1;
    if (!checkCredits(creditsNeeded)) {
      return;
    }

    setIsRefactoring(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRefactoredCode = `// Refactored ${language} code
${inputCode}

// Added improvements:
// - Better variable naming
// - Improved structure
// - Enhanced readability`;

      setRefactoredCode(mockRefactoredCode);
      
      // Deduct credits
      await deductCredits('Code Refactor', creditsNeeded, inputCode, mockRefactoredCode);
      
    } catch (error) {
      console.error('Error refactoring code:', error);
    } finally {
      setIsRefactoring(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="AI Code Refactor"
        description="Transform messy code into clean, readable, industry-standard code with AI assistance"
        canonical="/tools/code-refactor"
      />
      
      <Navbar2 />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wrench className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">AI Code Refactor</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Transform messy code into clean, readable, industry-standard code
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="secondary">1 Credit per refactor</Badge>
              <Badge variant="outline">Credits remaining: {currentCredits}</Badge>
            </div>
          </div>

          {currentCredits === 0 && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Insufficient credits. You need 1 credit to refactor code.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Code</CardTitle>
                <CardDescription>Paste your messy or unoptimized code below</CardDescription>
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
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
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
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Textarea
                  placeholder="Enter your code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[300px] font-mono"
                />

                <Button 
                  onClick={handleRefactor}
                  disabled={!inputCode.trim() || isRefactoring || currentCredits === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Wrench className="h-4 w-4 mr-2" />
                  {isRefactoring ? 'Refactoring Code (1 Credit)' : 'Refactor Code (1 Credit)'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refactored Code</CardTitle>
                <CardDescription>Clean, optimized version of your code</CardDescription>
              </CardHeader>
              <CardContent>
                {refactoredCode ? (
                  <CodeSlider 
                    code={refactoredCode}
                    language={language}
                    title="Refactored Code"
                    maxHeight={400}
                  />
                ) : (
                  <div className="min-h-[300px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Refactored code will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRefactor;

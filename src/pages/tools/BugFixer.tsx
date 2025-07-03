
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Bug, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const BugFixer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [buggyCode, setBuggyCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fixedCode, setFixedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleFixBug = async () => {
    if (!buggyCode.trim()) {
      toast.error('Please enter the buggy code');
      return;
    }

    setLoading(true);
    
    // Simulate AI bug fixing (in real app, this would call OpenAI API)
    setTimeout(() => {
      const sampleFix = `// Fixed version of your code
function validateEmail(email) {
  // Fixed: Added null/undefined check
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Fixed: Improved regex pattern for better email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

// Added error handling wrapper
function safeValidateEmail(email) {
  try {
    return validateEmail(email);
  } catch (error) {
    console.error('Email validation error:', error);
    return false;
  }
}`;

      const sampleExplanation = `## Issues Found and Fixed:

1. **Null/Undefined Check**: Added validation to check if email exists and is a string
2. **Improved Regex**: Updated the email regex pattern to be more comprehensive
3. **String Trimming**: Added trim() to handle whitespace
4. **Error Handling**: Wrapped the function in a try-catch block for safety

## Key Changes:
- Added type checking for the input parameter
- Improved regex pattern for better email validation
- Added error handling to prevent crashes
- Made the function more robust and production-ready`;

      setFixedCode(sampleFix);
      setExplanation(sampleExplanation);
      setLoading(false);
      toast.success('Bug fix generated successfully!');
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fixedCode);
    toast.success('Fixed code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bug className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Bug Fixer</h1>
          </div>
          <p className="text-xl text-gray-600">
            Find and fix bugs in your code automatically. Paste your buggy code and get an improved version with explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Bug Analysis
              </CardTitle>
              <CardDescription>
                Paste your problematic code and any error messages you're receiving
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="buggyCode" className="block text-sm font-medium mb-2">
                  Buggy Code
                </label>
                <Textarea
                  id="buggyCode"
                  placeholder="Paste your code that has bugs or isn't working as expected..."
                  value={buggyCode}
                  onChange={(e) => setBuggyCode(e.target.value)}
                  rows={8}
                  className="resize-none font-mono text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="errorMessage" className="block text-sm font-medium mb-2">
                  Error Message (Optional)
                </label>
                <Textarea
                  id="errorMessage"
                  placeholder="Paste any error messages or describe the unexpected behavior..."
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1 Credit</Badge>
                  <span className="text-sm text-gray-600">per bug fix</span>
                </div>
                <Button 
                  onClick={handleFixBug}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? (
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    'Fix Bugs'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Fixed Code */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fixed Code</CardTitle>
                  {fixedCode && (
                    <Button 
                      onClick={copyToClipboard}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {fixedCode ? (
                  <div className="code-block">
                    <pre className="whitespace-pre-wrap">
                      <code>{fixedCode}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bug className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>Fixed code will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Explanation */}
            {explanation && (
              <Card>
                <CardHeader>
                  <CardTitle>Fix Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm">{explanation}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 gradient-text">🐛 Bug Fixing Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Include Error Messages</h3>
                <p className="text-sm text-gray-600">
                  Copy the exact error message for more accurate bug fixes
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Provide Context</h3>
                <p className="text-sm text-gray-600">
                  Include relevant code around the buggy section for better analysis
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Describe Expected Behavior</h3>
                <p className="text-sm text-gray-600">
                  Explain what the code should do vs what it's actually doing
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Test the Fix</h3>
                <p className="text-sm text-gray-600">
                  Always test the fixed code in your environment before deploying
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BugFixer;

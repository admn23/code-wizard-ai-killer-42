
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, FileText, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const CodeExplainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to explain');
      return;
    }

    setLoading(true);
    
    // Simulate AI code explanation (in real app, this would call OpenAI API)
    setTimeout(() => {
      const sampleExplanation = `## Code Explanation

### Overview
This code snippet demonstrates a typical React functional component with state management using the useState hook.

### Line-by-Line Breakdown

**Line 1:** \`import { useState } from 'react';\`
- Imports the useState hook from React for state management

**Line 3:** \`const [count, setCount] = useState(0);\`
- Declares a state variable 'count' with initial value 0
- 'setCount' is the setter function to update the state
- Uses array destructuring to get both values from useState

**Line 5:** \`const increment = () => {\`
- Defines an arrow function to handle increment logic
- This function will be called when the button is clicked

**Line 6:** \`setCount(count + 1);\`
- Updates the count state by adding 1 to current value
- This will trigger a re-render of the component

### Key Concepts

🔍 **React Hooks**: useState is a hook that lets you add state to functional components

⚡ **State Updates**: When setState is called, React re-renders the component with new state

🎯 **Event Handling**: The increment function handles button click events

### Best Practices Demonstrated

✅ **Functional Components**: Uses modern React functional component syntax
✅ **Hook Usage**: Properly implements useState hook
✅ **Event Handlers**: Clean separation of event handling logic

### Potential Improvements

💡 Consider using useCallback for the increment function if passed to child components
💡 Add TypeScript for better type safety
💡 Consider using a custom hook if this pattern is repeated`;

      setExplanation(sampleExplanation);
      setLoading(false);
      toast.success('Code explanation generated successfully!');
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
    toast.success('Explanation copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Code Explainer</h1>
          </div>
          <p className="text-xl text-gray-600">
            Understand complex code with detailed AI-powered explanations. Perfect for learning and code reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Code Analysis
              </CardTitle>
              <CardDescription>
                Paste any code snippet you want to understand better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium mb-2">
                  Code to Explain
                </label>
                <Textarea
                  id="code"
                  placeholder="Paste your code here... (any programming language)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={12}
                  className="resize-none font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1 Credit</Badge>
                  <span className="text-sm text-gray-600">per explanation</span>
                </div>
                <Button 
                  onClick={handleExplain}
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
                    'Explain Code'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Explanation</CardTitle>
                {explanation && (
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
              {explanation ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                    {explanation}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed explanation will appear here</p>
                  <p className="text-sm">Paste your code and click "Explain Code" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 gradient-text">📚 Code Explanation Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Include Complete Context</h3>
                <p className="text-sm text-gray-600">
                  Provide enough surrounding code for better context understanding
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Any Language Supported</h3>
                <p className="text-sm text-gray-600">
                  Works with JavaScript, Python, Java, C++, and many other languages
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Complex Algorithms</h3>
                <p className="text-sm text-gray-600">
                  Perfect for understanding complex algorithms and design patterns
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Learning Resource</h3>
                <p className="text-sm text-gray-600">
                  Great for learning new frameworks, libraries, or coding concepts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeExplainer;

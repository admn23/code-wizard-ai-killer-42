import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar2 } from "@/components/ui/navbar-2";
import SEO from "@/components/SEO";
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
import { Copy, Code, Zap } from "lucide-react";
import { toast } from "sonner";

const CodeGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setLoading(true);

    // Simulate AI code generation (in real app, this would call OpenAI API)
    setTimeout(() => {
      const sampleCode = {
        javascript: `// ${prompt}
function example() {
  // Generated JavaScript code based on your prompt
  console.log('Hello, World!');
  return true;
}

export default example;`,
        python: `# ${prompt}
def example():
    """Generated Python code based on your prompt"""
    print("Hello, World!")
    return True

if __name__ == "__main__":
    example()`,
        typescript: `// ${prompt}
interface ExampleInterface {
  name: string;
  value: number;
}

function example(data: ExampleInterface): boolean {
  // Generated TypeScript code based on your prompt
  console.log(\`Hello, \${data.name}!\`);
  return true;
}

export default example;`,
      };

      setGeneratedCode(
        sampleCode[language as keyof typeof sampleCode] ||
          sampleCode.javascript,
      );
      setLoading(false);
      toast.success("Code generated successfully!");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">
              AI Code Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate code from natural language descriptions. Describe what you
            want to build and let AI create it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Code Generation
              </CardTitle>
              <CardDescription>
                Describe what you want to build and select your preferred
                programming language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium mb-2"
                >
                  Describe what you want to build
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Example: Create a function that validates email addresses using regex, handles edge cases, and returns boolean"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium mb-2"
                >
                  Programming Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1 Credit</Badge>
                  <span className="text-sm text-gray-600">per generation</span>
                </div>
                <Button
                  onClick={handleGenerate}
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
                    "Generate Code"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Code</CardTitle>
                {generatedCode && (
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
              {generatedCode ? (
                <div className="code-block">
                  <pre className="whitespace-pre-wrap">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Generated code will appear here</p>
                  <p className="text-sm">
                    Enter a description and click "Generate Code" to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 gradient-text">
              💡 Tips for Better Code Generation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Be Specific</h3>
                <p className="text-sm text-gray-600">
                  Include details about input/output, edge cases, and specific
                  requirements
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Mention Patterns</h3>
                <p className="text-sm text-gray-600">
                  Specify if you want to use particular design patterns or
                  coding styles
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Include Context</h3>
                <p className="text-sm text-gray-600">
                  Mention the framework, library, or environment you're working
                  with
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Error Handling</h3>
                <p className="text-sm text-gray-600">
                  Ask for error handling and validation if needed for production
                  code
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeGenerator;

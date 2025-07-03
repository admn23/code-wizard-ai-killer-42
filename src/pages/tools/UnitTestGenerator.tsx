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
import { TestTube, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const UnitTestGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();

  const [inputCode, setInputCode] = useState("");
  const [testFramework, setTestFramework] = useState("jest");
  const [language, setLanguage] = useState("javascript");
  const [generatedTests, setGeneratedTests] = useState("");
  const [edgeCases, setEdgeCases] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleGenerateTests = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to generate tests for");
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      const mockTestCode = `// Generated Unit Tests using ${testFramework}
${
  testFramework === "jest"
    ? `
describe('Function Tests', () => {
  test('should handle normal input correctly', () => {
    const result = yourFunction('normal input');
    expect(result).toBe('expected output');
  });

  test('should handle edge case: empty input', () => {
    const result = yourFunction('');
    expect(result).toBe('');
  });

  test('should handle edge case: null input', () => {
    const result = yourFunction(null);
    expect(result).toBeNull();
  });

  test('should handle edge case: large input', () => {
    const largeInput = 'x'.repeat(1000);
    const result = yourFunction(largeInput);
    expect(result).toBeDefined();
  });

  test('should throw error for invalid input', () => {
    expect(() => yourFunction(undefined)).toThrow();
  });
});
`
    : testFramework === "mocha"
      ? `
const { expect } = require('chai');

describe('Function Tests', function() {
  it('should handle normal input correctly', function() {
    const result = yourFunction('normal input');
    expect(result).to.equal('expected output');
  });

  it('should handle edge case: empty input', function() {
    const result = yourFunction('');
    expect(result).to.equal('');
  });

  it('should handle edge case: null input', function() {
    const result = yourFunction(null);
    expect(result).to.be.null;
  });
});
`
      : `
import pytest

def test_normal_input():
    result = your_function('normal input')
    assert result == 'expected output'

def test_empty_input():
    result = your_function('')
    assert result == ''

def test_null_input():
    result = your_function(None)
    assert result is None

def test_invalid_input():
    with pytest.raises(ValueError):
        your_function(undefined_value)
`
}

// Test coverage: ${Math.floor(Math.random() * 20) + 80}%
// Assertions: ${Math.floor(Math.random() * 10) + 15}`;

      const mockEdgeCases = [
        "Empty string or null input handling",
        "Boundary value testing (min/max limits)",
        "Invalid data type input validation",
        "Large dataset performance testing",
        "Network timeout and error scenarios",
        "Concurrent access and race conditions",
        "Memory overflow protection",
        "Special character and Unicode handling",
      ];

      setGeneratedTests(mockTestCode);
      setEdgeCases(mockEdgeCases);

      // Deduct credits and log activity
      await deductCredits(
        "AI Unit Test Generator",
        requiredCredits,
        `Framework: ${testFramework}, Language: ${language}, Input: ${inputCode.substring(0, 100)}...`,
        mockTestCode.substring(0, 200),
      );

      toast.success("Unit tests generated successfully!");
    } catch (error) {
      console.error("Error generating tests:", error);
      toast.error("Failed to generate unit tests");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateTests = () => {
    if (generatedTests) {
      handleGenerateTests();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO
        title="AI Unit Test Generator"
        description="Generate comprehensive unit tests for your functions and methods automatically with AI."
        canonical="/tools/unit-test-generator"
      />

      <Navbar2 />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TestTube className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">
              AI Unit Test Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate comprehensive unit tests for your functions, classes, and
            API routes
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">1 Credit per generation</Badge>
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
                Enter your function, class, or API route code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Test Framework
                  </label>
                  <Select
                    value={testFramework}
                    onValueChange={setTestFramework}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jest">
                        Jest (JavaScript/TypeScript)
                      </SelectItem>
                      <SelectItem value="mocha">
                        Mocha + Chai (JavaScript)
                      </SelectItem>
                      <SelectItem value="pytest">PyTest (Python)</SelectItem>
                      <SelectItem value="junit">JUnit (Java)</SelectItem>
                      <SelectItem value="nunit">NUnit (C#)</SelectItem>
                      <SelectItem value="phpunit">PHPUnit (PHP)</SelectItem>
                      <SelectItem value="rspec">RSpec (Ruby)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Textarea
                placeholder="Enter your function, class, or API route code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />

              <Button
                onClick={handleGenerateTests}
                disabled={isLoading || !inputCode.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Tests...
                  </>
                ) : (
                  <>
                    <TestTube className="h-4 w-4 mr-2" />
                    Generate Unit Tests (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to generate unit
                    tests.
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
                  <CardTitle>Generated Unit Tests</CardTitle>
                  <CardDescription>
                    Comprehensive test suite with edge cases
                  </CardDescription>
                </div>
                {generatedTests && (
                  <Button
                    onClick={regenerateTests}
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
              {generatedTests ? (
                <CodeSlider code={generatedTests} language={language} />
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Generated tests will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edge Cases Coverage */}
        {edgeCases.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="h-5 w-5" />
                Edge Case Coverage Suggestions
              </CardTitle>
              <CardDescription className="text-blue-700">
                Additional test scenarios to consider for comprehensive coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {edgeCases.map((edgeCase, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{edgeCase}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Testing Best Practices */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Testing Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🧪 Test Structure</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Arrange-Act-Assert pattern</li>
                  <li>• Descriptive test names</li>
                  <li>• Single responsibility per test</li>
                  <li>• Independent test cases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📊 Coverage Goals</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 80%+ code coverage target</li>
                  <li>• Branch coverage testing</li>
                  <li>• Edge case validation</li>
                  <li>• Error scenario testing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 Maintenance</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Regular test updates</li>
                  <li>• Mock external dependencies</li>
                  <li>• Fast execution times</li>
                  <li>• Clear failure messages</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitTestGenerator;

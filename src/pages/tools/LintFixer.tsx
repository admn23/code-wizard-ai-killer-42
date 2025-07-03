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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle,
  RefreshCw,
  AlertCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const LintFixer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();

  const [inputCode, setInputCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [linter, setLinter] = useState("eslint");
  const [showComparison, setShowComparison] = useState(true);
  const [fixedCode, setFixedCode] = useState("");
  const [lintIssues, setLintIssues] = useState<string[]>([]);
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleFixLint = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to fix lint issues");
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      const mockIssues = [
        "Missing semicolon at line 5",
        'Unused variable "temp" at line 12',
        "Inconsistent indentation at line 8",
        "Missing space before function parentheses at line 15",
        "Trailing comma in object literal at line 20",
        "Double quotes should be single quotes at line 3",
        "Missing newline at end of file",
        "Camelcase naming convention violated at line 18",
      ];

      const mockFixedCode = `// Fixed Code - All lint issues resolved
${
  language === "javascript"
    ? `
// ESLint fixes applied
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
};

function processUser(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    processed: true,
    timestamp: Date.now(),
  };
}

const result = processUser(userData);
console.log(result);

export default processUser;
`
    : language === "python"
      ? `
# Flake8/Black fixes applied
import os
from typing import Dict, Optional


def process_user(user_data: Dict[str, str]) -> Optional[Dict]:
    """Process user data and return formatted result."""
    if not user_data:
        return None

    return {
        **user_data,
        'processed': True,
        'timestamp': os.time.time()
    }


if __name__ == '__main__':
    user = {
        'name': 'John Doe',
        'email': 'john@example.com',
        'age': 30
    }
    result = process_user(user)
    print(result)
`
      : `
// TypeScript fixes applied
interface UserData {
  name: string;
  email: string;
  age: number;
}

interface ProcessedUser extends UserData {
  processed: boolean;
  timestamp: number;
}

const processUser = (user: UserData): ProcessedUser | null => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    processed: true,
    timestamp: Date.now(),
  };
};

export { processUser, type UserData, type ProcessedUser };
`
}

// Summary: Fixed ${Math.floor(Math.random() * 8) + 5} lint issues
// Linter: ${linter}
// Rules applied: ${linter === "eslint" ? "ESLint recommended" : linter === "flake8" ? "PEP8 compliance" : "TSLint standard"}`;

      const mockFixedIssues = [
        "Added missing semicolons",
        "Removed unused variables",
        "Fixed indentation (2 spaces)",
        "Added proper spacing around operators",
        "Removed trailing commas",
        "Converted double quotes to single quotes",
        "Added newline at end of file",
        "Fixed variable naming to camelCase",
      ];

      setFixedCode(mockFixedCode);
      setLintIssues(mockIssues.slice(0, Math.floor(Math.random() * 5) + 3));
      setFixedIssues(
        mockFixedIssues.slice(0, Math.floor(Math.random() * 5) + 3),
      );

      await deductCredits(
        "AI Lint Fixer",
        requiredCredits,
        `Language: ${language}, Linter: ${linter}, Input: ${inputCode.substring(0, 100)}...`,
        `Fixed ${mockFixedIssues.length} lint issues`,
      );

      toast.success("Lint issues fixed successfully!");
    } catch (error) {
      console.error("Error fixing lint issues:", error);
      toast.error("Failed to fix lint issues");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateFix = () => {
    if (fixedCode) {
      handleFixLint();
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
            <CheckCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Lint Fixer</h1>
          </div>
          <p className="text-xl text-gray-600">
            Automatically fix linting errors and improve code style consistency
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">1 Credit per fix</Badge>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Credits remaining:</span>
              <Badge className="bg-primary">{currentCredits}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Input Code</CardTitle>
              <CardDescription>
                Paste your code with lint issues that need fixing
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
                    Linter Type
                  </label>
                  <Select value={linter} onValueChange={setLinter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eslint">
                        ESLint (JavaScript/TypeScript)
                      </SelectItem>
                      <SelectItem value="prettier">
                        Prettier (Formatting)
                      </SelectItem>
                      <SelectItem value="flake8">Flake8 (Python)</SelectItem>
                      <SelectItem value="black">Black (Python)</SelectItem>
                      <SelectItem value="checkstyle">
                        Checkstyle (Java)
                      </SelectItem>
                      <SelectItem value="phpcs">
                        PHP_CodeSniffer (PHP)
                      </SelectItem>
                      <SelectItem value="rubocop">RuboCop (Ruby)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="comparison"
                  checked={showComparison}
                  onCheckedChange={setShowComparison}
                />
                <label htmlFor="comparison" className="text-sm font-medium">
                  Show before/after comparison
                </label>
              </div>

              <Textarea
                placeholder="Paste your code with lint issues here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />

              <Button
                onClick={handleFixLint}
                disabled={isLoading || !inputCode.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Fixing Lint Issues...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Fix Lint Issues (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to fix lint issues.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fixed Code</CardTitle>
                  <CardDescription>
                    Clean code with all lint issues resolved
                  </CardDescription>
                </div>
                {fixedCode && (
                  <Button
                    onClick={regenerateFix}
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
              {fixedCode ? (
                showComparison ? (
                  <Tabs defaultValue="fixed" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
                      <TabsTrigger value="original">Original</TabsTrigger>
                      <TabsTrigger value="issues">Issues</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fixed" className="mt-4">
                      <CodeSlider code={fixedCode} language={language} />
                    </TabsContent>
                    <TabsContent value="original" className="mt-4">
                      <CodeSlider code={inputCode} language={language} />
                    </TabsContent>
                    <TabsContent value="issues" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            Issues Found ({lintIssues.length})
                          </h4>
                          <ul className="space-y-1">
                            {lintIssues.map((issue, index) => (
                              <li
                                key={index}
                                className="text-sm text-red-700 bg-red-50 p-2 rounded"
                              >
                                • {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Fixes Applied ({fixedIssues.length})
                          </h4>
                          <ul className="space-y-1">
                            {fixedIssues.map((fix, index) => (
                              <li
                                key={index}
                                className="text-sm text-green-700 bg-green-50 p-2 rounded"
                              >
                                ✓ {fix}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <CodeSlider code={fixedCode} language={language} />
                )
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Fixed code will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Linting Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🔧 Common Fixes</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Missing semicolons and commas</li>
                  <li>• Inconsistent indentation</li>
                  <li>• Unused variables and imports</li>
                  <li>• Spacing and formatting issues</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📏 Style Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Consistent naming conventions</li>
                  <li>• Proper quote usage</li>
                  <li>• Line length limits</li>
                  <li>• Comment formatting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚙️ Tool Setup</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• IDE integration for real-time fixes</li>
                  <li>• Pre-commit hooks</li>
                  <li>• CI/CD pipeline integration</li>
                  <li>• Team configuration sharing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LintFixer;

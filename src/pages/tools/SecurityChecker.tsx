
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, RefreshCw, AlertCircle, AlertTriangle, CheckCircle, Bug } from 'lucide-react';
import { toast } from 'sonner';

interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  location: string;
  recommendation: string;
}

const SecurityChecker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();
  
  const [inputCode, setInputCode] = useState('');
  const [codeType, setCodeType] = useState('frontend');
  const [language, setLanguage] = useState('javascript');
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([]);
  const [fixedCode, setFixedCode] = useState('');
  const [securityScore, setSecurityScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSecurityCheck = async () => {
    if (!inputCode.trim()) {
      toast.error('Please enter some code to check for security issues');
      return;
    }

    const requiredCredits = 2;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI security analysis service
      const mockIssues: SecurityIssue[] = [
        {
          severity: 'critical',
          type: 'SQL Injection',
          description: 'Direct user input used in SQL query without sanitization',
          location: 'Line 15: query = "SELECT * FROM users WHERE id = " + userId',
          recommendation: 'Use parameterized queries or prepared statements'
        },
        {
          severity: 'high',
          type: 'XSS Vulnerability',
          description: 'User input rendered without proper escaping',
          location: 'Line 23: innerHTML = userComment',
          recommendation: 'Use textContent or proper HTML escaping'
        },
        {
          severity: 'high',
          type: 'Hardcoded Secrets',
          description: 'API key or password hardcoded in source code',
          location: 'Line 8: const apiKey = "sk-1234567890abcdef"',
          recommendation: 'Use environment variables for sensitive data'
        },
        {
          severity: 'medium',
          type: 'Insecure Authentication',
          description: 'Password stored without proper hashing',
          location: 'Line 31: user.password = plainPassword',
          recommendation: 'Use bcrypt or similar for password hashing'
        },
        {
          severity: 'medium',
          type: 'Missing Input Validation',
          description: 'User input not validated before processing',
          location: 'Line 19: processFile(req.body.filename)',
          recommendation: 'Validate and sanitize all user inputs'
        },
        {
          severity: 'low',
          type: 'Information Disclosure',
          description: 'Detailed error messages exposed to client',
          location: 'Line 45: res.send(error.stack)',
          recommendation: 'Use generic error messages in production'
        }
      ];

      const randomIssues = mockIssues.slice(0, Math.floor(Math.random() * 4) + 2);
      
      const mockFixedCode = `// Security-Fixed Code
${language === 'javascript' ? `
// Fixed: SQL Injection Prevention
const query = 'SELECT * FROM users WHERE id = ?';
const results = await db.execute(query, [userId]);

// Fixed: XSS Prevention
const safeComment = DOMPurify.sanitize(userComment);
element.textContent = safeComment;

// Fixed: Environment Variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API key not configured');
}

// Fixed: Password Hashing
const bcrypt = require('bcrypt');
const saltRounds = 12;
user.passwordHash = await bcrypt.hash(plainPassword, saltRounds);

// Fixed: Input Validation
const Joi = require('joi');
const schema = Joi.object({
  filename: Joi.string().alphanum().max(255).required()
});
const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).json({ error: 'Invalid input' });
}

// Fixed: Error Handling
app.use((error, req, res, next) => {
  console.error(error); // Log for debugging
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});
` : `
# Security-Fixed Python Code
import hashlib
import secrets
import html
from sqlalchemy import text

# Fixed: SQL Injection Prevention  
def get_user(user_id):
    query = text("SELECT * FROM users WHERE id = :user_id")
    return db.execute(query, {"user_id": user_id})

# Fixed: XSS Prevention
def render_comment(comment):
    return html.escape(comment)

# Fixed: Environment Variables
import os
API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError('API key not configured')

# Fixed: Password Hashing
def hash_password(password):
    salt = secrets.token_hex(16)
    return hashlib.pbkdf2_hmac('sha256', 
                              password.encode('utf-8'), 
                              salt.encode('utf-8'), 
                              100000)

# Fixed: Input Validation
import re
def validate_filename(filename):
    if not re.match(r'^[a-zA-Z0-9._-]+$', filename):
        raise ValueError('Invalid filename')
    return filename
`}

// Security Score: ${85 + Math.floor(Math.random() * 10)}/100
// Issues Fixed: ${randomIssues.length}
// Recommendations Applied: All critical and high severity issues addressed`;

      setSecurityIssues(randomIssues);
      setFixedCode(mockFixedCode);
      setSecurityScore(85 + Math.floor(Math.random() * 10));

      await deductCredits(
        'AI Security Vulnerability Checker',
        requiredCredits,
        `Type: ${codeType}, Language: ${language}, Input: ${inputCode.substring(0, 100)}...`,
        `Found ${randomIssues.length} security issues, provided fixes`
      );

      toast.success('Security analysis completed!');
    } catch (error) {
      console.error('Error checking security:', error);
      toast.error('Failed to perform security analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateAnalysis = () => {
    if (securityIssues.length > 0) {
      handleSecurityCheck();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100 border-red-200';
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Bug className="h-4 w-4 text-yellow-500" />;
      case 'low': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
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
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Security Vulnerability Checker</h1>
          </div>
          <p className="text-xl text-gray-600">
            Scan your code for security vulnerabilities and get automated fixes
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">2 Credits per scan</Badge>
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
                Enter your source code to scan for security vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Code Type</label>
                  <Select value={codeType} onValueChange={setCodeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Code</SelectItem>
                      <SelectItem value="backend">Backend/API Code</SelectItem>
                      <SelectItem value="database">Database Queries</SelectItem>
                      <SelectItem value="auth">Authentication Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Textarea
                placeholder="Paste your code here for security analysis..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[350px] font-mono text-sm"
              />
              
              <Button 
                onClick={handleSecurityCheck}
                disabled={isLoading || !inputCode.trim() || !checkCredits(2)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning for Vulnerabilities...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Scan for Security Issues (2 Credits)
                  </>
                )}
              </Button>

              {!checkCredits(2) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 2 credits for security analysis.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Analysis Results</CardTitle>
                  <CardDescription>
                    Vulnerability report and fixes
                  </CardDescription>
                </div>
                {securityIssues.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className={`${securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      Score: {securityScore}/100
                    </Badge>
                    <Button
                      onClick={regenerateAnalysis}
                      disabled={isLoading}
                      size="sm"
                      variant="outline"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Rescan
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {securityIssues.length > 0 ? (
                <Tabs defaultValue="issues" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="issues">Issues Found</TabsTrigger>
                    <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="issues" className="mt-4">
                    <div className="space-y-4">
                      {securityIssues.map((issue, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(issue.severity)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{issue.type}</h4>
                                <Badge variant="outline" className={`text-xs ${issue.severity === 'critical' ? 'border-red-400' : issue.severity === 'high' ? 'border-red-300' : issue.severity === 'medium' ? 'border-yellow-400' : 'border-blue-400'}`}>
                                  {issue.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm mb-2">{issue.description}</p>
                              <p className="text-xs font-mono bg-black/10 p-1 rounded mb-2">{issue.location}</p>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm"><strong>Fix:</strong> {issue.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="fixed" className="mt-4">
                    <CodeSlider 
                      code={fixedCode}
                      language={language}
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Security analysis results will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Common Security Vulnerabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-red-800">🚨 Critical Issues</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SQL Injection attacks</li>
                  <li>• Remote code execution</li>
                  <li>• Authentication bypass</li>
                  <li>• Data exposure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-red-700">⚠️ High Priority</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cross-site scripting (XSS)</li>
                  <li>• Hardcoded secrets</li>
                  <li>• Insecure authentication</li>
                  <li>• CSRF vulnerabilities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-yellow-600">🔍 Medium Risk</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Missing input validation</li>
                  <li>• Weak encryption</li>
                  <li>• Information disclosure</li>
                  <li>• Session management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">💡 Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Regular security audits</li>
                  <li>• Environment variables</li>
                  <li>• Input sanitization</li>
                  <li>• Secure headers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityChecker;

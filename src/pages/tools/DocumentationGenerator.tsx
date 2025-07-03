
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
import { BookOpen, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

const DocumentationGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();
  
  const [inputCode, setInputCode] = useState('');
  const [docType, setDocType] = useState('jsdoc');
  const [language, setLanguage] = useState('javascript');
  const [projectName, setProjectName] = useState('');
  const [generatedDocs, setGeneratedDocs] = useState({
    jsdoc: '',
    readme: '',
    api: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleGenerateDocs = async () => {
    if (!inputCode.trim()) {
      toast.error('Please enter some code to generate documentation for');
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      const mockJSDoc = `/**
 * ${projectName || 'Function'} - Advanced utility function
 * @description This function performs complex operations with multiple parameters
 * @param {string} input - The input parameter for processing
 * @param {Object} options - Configuration options
 * @param {boolean} options.validate - Whether to validate input
 * @param {number} options.timeout - Timeout in milliseconds
 * @returns {Promise<Object>} Returns a promise that resolves to the result object
 * @throws {Error} Throws an error if input is invalid
 * @example
 * // Basic usage
 * const result = await yourFunction('input', { validate: true });
 * console.log(result);
 * 
 * @example
 * // With custom options
 * const result = await yourFunction('input', { 
 *   validate: false, 
 *   timeout: 5000 
 * });
 * 
 * @since 1.0.0
 * @author Development Team
 */`;

      const mockReadme = `# ${projectName || 'Project Name'}

## Description
This project provides a comprehensive solution for [describe your project functionality].

## Installation
\`\`\`bash
npm install ${projectName?.toLowerCase() || 'your-project'}
\`\`\`

## Quick Start
\`\`\`javascript
const { yourFunction } = require('${projectName?.toLowerCase() || 'your-project'}');

// Basic usage
const result = await yourFunction('input');
console.log(result);
\`\`\`

## API Reference

### Functions

#### yourFunction(input, options)
- **input** (string): The input parameter
- **options** (Object): Configuration options
  - **validate** (boolean): Enable input validation
  - **timeout** (number): Operation timeout in ms

**Returns:** Promise<Object>

## Examples

### Basic Example
\`\`\`javascript
const result = await yourFunction('hello world');
\`\`\`

### Advanced Example
\`\`\`javascript
const result = await yourFunction('input', {
  validate: true,
  timeout: 3000
});
\`\`\`

## Configuration

Create a \`.config.json\` file in your project root:

\`\`\`json
{
  "defaultTimeout": 5000,
  "enableValidation": true
}
\`\`\`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License - see LICENSE file for details

## Changelog
- v1.0.0: Initial release
- v1.1.0: Added validation options
- v1.2.0: Performance improvements`;

      const mockApiDocs = `# API Documentation

## Base URL
\`https://api.example.com/v1\`

## Authentication
All API requests require authentication using Bearer tokens:

\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

## Endpoints

### GET /users
Retrieve a list of users

**Parameters:**
- \`limit\` (optional): Number of users to return (default: 10)
- \`offset\` (optional): Number of users to skip (default: 0)

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 100,
  "page": 1
}
\`\`\`

### POST /users
Create a new user

**Request Body:**
\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

## Error Handling

All endpoints return appropriate HTTP status codes:

- \`200\` - Success
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Internal Server Error

**Error Response Format:**
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {}
  }
}
\`\`\`

## Rate Limiting
API requests are limited to 1000 requests per hour per API key.`;

      setGeneratedDocs({
        jsdoc: mockJSDoc,
        readme: mockReadme,
        api: mockApiDocs
      });

      // Deduct credits and log activity
      await deductCredits(
        'AI Documentation Generator',
        requiredCredits,
        `Type: ${docType}, Language: ${language}, Project: ${projectName}, Input: ${inputCode.substring(0, 100)}...`,
        `Generated ${docType} documentation`
      );

      toast.success('Documentation generated successfully!');
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast.error('Failed to generate documentation');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateDocs = () => {
    if (generatedDocs.jsdoc || generatedDocs.readme || generatedDocs.api) {
      handleGenerateDocs();
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
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Documentation Generator</h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate comprehensive documentation for your functions, APIs, and projects
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
              <CardTitle>Input Details</CardTitle>
              <CardDescription>
                Enter your code or project details for documentation generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Documentation Type</label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jsdoc">JSDoc Comments</SelectItem>
                      <SelectItem value="pydoc">Python Docstrings</SelectItem>
                      <SelectItem value="readme">README.md</SelectItem>
                      <SelectItem value="api">API Documentation</SelectItem>
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

              <div>
                <label className="text-sm font-medium mb-2 block">Project Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter project name..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Code/Function/API Details</label>
                <Textarea
                  placeholder="Enter your code, function, or project description here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[250px] font-mono text-sm"
                />
              </div>
              
              <Button 
                onClick={handleGenerateDocs}
                disabled={isLoading || !inputCode.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Documentation...
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Generate Documentation (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to generate documentation.
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
                  <CardTitle>Generated Documentation</CardTitle>
                  <CardDescription>
                    Professional documentation ready to use
                  </CardDescription>
                </div>
                {(generatedDocs.jsdoc || generatedDocs.readme || generatedDocs.api) && (
                  <Button
                    onClick={regenerateDocs}
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
              {(generatedDocs.jsdoc || generatedDocs.readme || generatedDocs.api) ? (
                <Tabs defaultValue="jsdoc" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="jsdoc">JSDoc/Docstring</TabsTrigger>
                    <TabsTrigger value="readme">README</TabsTrigger>
                    <TabsTrigger value="api">API Docs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="jsdoc" className="mt-4">
                    <CodeSlider 
                      code={generatedDocs.jsdoc}
                      language={language}
                    />
                  </TabsContent>
                  <TabsContent value="readme" className="mt-4">
                    <CodeSlider 
                      code={generatedDocs.readme}
                      language="markdown"
                    />
                  </TabsContent>
                  <TabsContent value="api" className="mt-4">
                    <CodeSlider 
                      code={generatedDocs.api}
                      language="markdown"
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Generated documentation will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Documentation Tips */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Documentation Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📝 JSDoc/Docstrings</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Parameter descriptions</li>
                  <li>• Return value documentation</li>
                  <li>• Usage examples</li>
                  <li>• Error handling notes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📖 README Files</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Clear project description</li>
                  <li>• Installation instructions</li>
                  <li>• Usage examples</li>
                  <li>• Contributing guidelines</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔌 API Documentation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Endpoint descriptions</li>
                  <li>• Request/response examples</li>
                  <li>• Authentication details</li>
                  <li>• Error code explanations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✨ Quality Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep documentation updated</li>
                  <li>• Include practical examples</li>
                  <li>• Use clear, simple language</li>
                  <li>• Regular review and updates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationGenerator;

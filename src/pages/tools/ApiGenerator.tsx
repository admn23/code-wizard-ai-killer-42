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
import { Switch } from "@/components/ui/switch";
import { Globe, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ApiGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();

  const [apiDescription, setApiDescription] = useState("");
  const [framework, setFramework] = useState("express");
  const [includeErrorHandling, setIncludeErrorHandling] = useState(true);
  const [includeValidation, setIncludeValidation] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleGenerateAPI = async () => {
    if (!apiDescription.trim()) {
      toast.error("Please describe the API requirements");
      return;
    }

    const requiredCredits = 2;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual AI service
      let mockCode = "";

      if (framework === "express") {
        mockCode = `const express = require('express');
${includeValidation ? "const { body, validationResult } = require('express-validator');" : ""}
const app = express();

app.use(express.json());

${
  includeErrorHandling
    ? `
// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
};
`
    : ""
}

// GET endpoint
app.get('/api/users', async (req, res) => {
  try {
    // Implementation based on: ${apiDescription}
    const users = await getUsersFromDatabase();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    ${includeErrorHandling ? "next(error);" : "res.status(500).json({ error: error.message });"}
  }
});

// POST endpoint
app.post('/api/users',
  ${
    includeValidation
      ? `[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],`
      : ""
  }
  async (req, res) => {
    try {
      ${
        includeValidation
          ? `
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }
      `
          : ""
      }

      const newUser = await createUser(req.body);
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      ${includeErrorHandling ? "next(error);" : "res.status(500).json({ error: error.message });"}
    }
  }
);

// PUT endpoint
app.put('/api/users/:id',
  ${
    includeValidation
      ? `[
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
  ],`
      : ""
  }
  async (req, res) => {
    try {
      ${
        includeValidation
          ? `
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }
      `
          : ""
      }

      const updatedUser = await updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({ success: true, data: updatedUser });
    } catch (error) {
      ${includeErrorHandling ? "next(error);" : "res.status(500).json({ error: error.message });"}
    }
  }
);

// DELETE endpoint
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    ${includeErrorHandling ? "next(error);" : "res.status(500).json({ error: error.message });"}
  }
});

${includeErrorHandling ? "app.use(errorHandler);" : ""}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`;
      } else if (framework === "flask") {
        mockCode = `from flask import Flask, request, jsonify
${includeValidation ? "from marshmallow import Schema, fields, ValidationError" : ""}
${includeErrorHandling ? "from werkzeug.exceptions import BadRequest, NotFound, InternalServerError" : ""}

app = Flask(__name__)

${
  includeValidation
    ? `
class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)

user_schema = UserSchema()
`
    : ""
}

${
  includeErrorHandling
    ? `
@app.errorhandler(Exception)
def handle_error(error):
    return jsonify({
        'success': False,
        'error': str(error)
    }), 500

@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify({
        'success': False,
        'errors': error.messages
    }), 400
`
    : ""
}

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        # Implementation based on: ${apiDescription}
        users = get_users_from_database()
        return jsonify({
            'success': True,
            'data': users,
            'count': len(users)
        })
    except Exception as e:
        ${includeErrorHandling ? "raise InternalServerError(str(e))" : 'return jsonify({"error": str(e)}), 500'}

@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        ${
          includeValidation
            ? `
        json_data = request.get_json()
        user_data = user_schema.load(json_data)
        `
            : "user_data = request.get_json()"
        }

        new_user = create_user_in_database(user_data)
        return jsonify({
            'success': True,
            'data': new_user
        }), 201
    except ValidationError as e:
        ${includeErrorHandling ? "raise BadRequest(str(e))" : 'return jsonify({"error": str(e)}), 400'}
    except Exception as e:
        ${includeErrorHandling ? "raise InternalServerError(str(e))" : 'return jsonify({"error": str(e)}), 500'}

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        ${
          includeValidation
            ? `
        json_data = request.get_json()
        user_data = user_schema.load(json_data, partial=True)
        `
            : "user_data = request.get_json()"
        }

        updated_user = update_user_in_database(user_id, user_data)
        if not updated_user:
            ${includeErrorHandling ? 'raise NotFound("User not found")' : 'return jsonify({"error": "User not found"}), 404'}

        return jsonify({
            'success': True,
            'data': updated_user
        })
    except ValidationError as e:
        ${includeErrorHandling ? "raise BadRequest(str(e))" : 'return jsonify({"error": str(e)}), 400'}
    except Exception as e:
        ${includeErrorHandling ? "raise InternalServerError(str(e))" : 'return jsonify({"error": str(e)}), 500'}

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        deleted = delete_user_from_database(user_id)
        if not deleted:
            ${includeErrorHandling ? 'raise NotFound("User not found")' : 'return jsonify({"error": "User not found"}), 404'}

        return jsonify({
            'success': True,
            'message': 'User deleted successfully'
        })
    except Exception as e:
        ${includeErrorHandling ? "raise InternalServerError(str(e))" : 'return jsonify({"error": str(e)}), 500'}

if __name__ == '__main__':
    app.run(debug=True)`;
      }

      setGeneratedCode(mockCode);

      // Deduct credits and log activity
      await deductCredits(
        "AI API Generator",
        requiredCredits,
        `Framework: ${framework}, ErrorHandling: ${includeErrorHandling}, Validation: ${includeValidation}, Description: ${apiDescription.substring(0, 100)}...`,
        mockCode.substring(0, 200),
      );

      toast.success("API code generated successfully!");
    } catch (error) {
      console.error("Error generating API:", error);
      toast.error("Failed to generate API code");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateAPI = () => {
    if (generatedCode) {
      handleGenerateAPI();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO
        title="AI API Generator"
        description="Generate REST API endpoints with proper routing, validation, and authentication using AI."
        canonical="/tools/api-generator"
      />

      <Navbar2 />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">
              AI API Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate complete REST API endpoints with proper routing and
            validation
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">2 Credits per generation</Badge>
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
              <CardTitle>API Requirements</CardTitle>
              <CardDescription>
                Describe your API requirements and select framework options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Framework
                </label>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="express">Node.js Express</SelectItem>
                    <SelectItem value="flask">Python Flask</SelectItem>
                    <SelectItem value="fastapi">Python FastAPI</SelectItem>
                    <SelectItem value="spring">Java Spring Boot</SelectItem>
                    <SelectItem value="rails">Ruby on Rails</SelectItem>
                    <SelectItem value="aspnet">ASP.NET Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">
                      Include Error Handling
                    </label>
                    <p className="text-xs text-gray-500">
                      Add comprehensive error handling middleware
                    </p>
                  </div>
                  <Switch
                    checked={includeErrorHandling}
                    onCheckedChange={setIncludeErrorHandling}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">
                      Include Input Validation
                    </label>
                    <p className="text-xs text-gray-500">
                      Add request validation and sanitization
                    </p>
                  </div>
                  <Switch
                    checked={includeValidation}
                    onCheckedChange={setIncludeValidation}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  API Description
                </label>
                <Textarea
                  placeholder="Describe your API requirements (e.g., 'Create a user management API with CRUD operations, authentication, and role-based access control')"
                  value={apiDescription}
                  onChange={(e) => setApiDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <Button
                onClick={handleGenerateAPI}
                disabled={
                  isLoading || !apiDescription.trim() || !checkCredits(2)
                }
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating API...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Generate API Code (2 Credits)
                  </>
                )}
              </Button>

              {!checkCredits(2) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 2 credits to generate API
                    code.
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
                  <CardTitle>Generated API Code</CardTitle>
                  <CardDescription>
                    Complete REST API with endpoints and middleware
                  </CardDescription>
                </div>
                {generatedCode && (
                  <Button
                    onClick={regenerateAPI}
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
              {generatedCode ? (
                <CodeSlider
                  code={generatedCode}
                  language={
                    framework === "express"
                      ? "javascript"
                      : framework === "flask" || framework === "fastapi"
                        ? "python"
                        : "javascript"
                  }
                />
              ) : (
                <div className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Generated API code will appear here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Development Tips */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              API Development Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🔐 Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Input validation</li>
                  <li>• Authentication & authorization</li>
                  <li>• Rate limiting</li>
                  <li>• CORS configuration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📝 Documentation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• OpenAPI/Swagger docs</li>
                  <li>• Request/response examples</li>
                  <li>• Error code definitions</li>
                  <li>• Authentication guide</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚡ Performance</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Database optimization</li>
                  <li>• Caching strategies</li>
                  <li>• Pagination implementation</li>
                  <li>• Response compression</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔧 Maintenance</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Comprehensive logging</li>
                  <li>• Health check endpoints</li>
                  <li>• Version control</li>
                  <li>• Monitoring setup</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiGenerator;


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
import { Rocket, RefreshCw, AlertCircle, FileText, Cloud } from 'lucide-react';
import { toast } from 'sonner';

const DeploymentScriptGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();
  
  const [projectType, setProjectType] = useState('react');
  const [deploymentTarget, setDeploymentTarget] = useState('vercel');
  const [projectDescription, setProjectDescription] = useState('');
  const [generatedScripts, setGeneratedScripts] = useState<{[key: string]: string}>({});
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleGenerateScripts = async () => {
    if (!projectDescription.trim()) {
      toast.error('Please describe your project for deployment');
      return;
    }

    const requiredCredits = 2;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      const mockScripts: {[key: string]: string} = {};
      let mockInstructions = '';

      if (deploymentTarget === 'vercel') {
        mockScripts.vercel = `{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_VERSION": "18"
  }
}`;

        mockInstructions = `# Vercel Deployment Instructions

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository with your project

## Deployment Steps

1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy from your project directory**
   \`\`\`bash
   vercel --prod
   \`\`\`

## Alternative: GitHub Integration
1. Push your code to GitHub
2. Go to Vercel dashboard
3. Import your GitHub repository
4. Configure build settings:
   - Build Command: \`npm run build\`
   - Output Directory: \`dist\`
   - Install Command: \`npm install\`

## Environment Variables
Set these in Vercel dashboard under Project Settings:
- NODE_ENV=production
- Add any API keys or secrets your app needs

## Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as shown`;

      } else if (deploymentTarget === 'netlify') {
        mockScripts.netlify = `[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`;

        mockInstructions = `# Netlify Deployment Instructions

## Prerequisites
- Netlify account (https://netlify.com)
- Git repository with your project

## Method 1: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Netlify dashboard
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: \`npm run build\`
   - Publish directory: \`dist\`

## Method 2: CLI Deployment
1. **Install Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Login to Netlify**
   \`\`\`bash
   netlify login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   netlify deploy --prod --dir=dist
   \`\`\`

## Environment Variables
Set in Netlify dashboard under Site Settings > Environment Variables`;

      } else if (deploymentTarget === 'docker') {
        mockScripts.docker = `# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install a simple server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]

# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.coverage
.nyc_output
.cache`;

        mockScripts.compose = `version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

networks:
  app-network:
    driver: bridge`;

        mockInstructions = `# Docker Deployment Instructions

## Prerequisites
- Docker installed on your system
- Docker Compose (optional, for multi-service setup)

## Build and Run
1. **Build the Docker image**
   \`\`\`bash
   docker build -t my-app .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 my-app
   \`\`\`

## Using Docker Compose
1. **Start services**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. **View logs**
   \`\`\`bash
   docker-compose logs -f
   \`\`\`

3. **Stop services**
   \`\`\`bash
   docker-compose down
   \`\`\`

## Production Deployment
- Use a reverse proxy (nginx)
- Set up SSL certificates
- Configure environment variables
- Set up monitoring and logging`;

      } else if (deploymentTarget === 'aws') {
        mockScripts.lambda = `# serverless.yml
service: my-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  stage: prod

plugins:
  - serverless-finch

custom:
  client:
    bucketName: my-app-static-\${self:provider.stage}
    distributionFolder: dist

functions:
  app:
    handler: lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true

resources:
  Resources:
    StaticSiteBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: \${self:custom.client.bucketName}
        WebsiteConfiguration:
          IndexDocument: index.html
          ErrorDocument: index.html`;

        mockScripts.lambda_handler = `// lambda.js
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server'); // Your Express app

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};`;

        mockInstructions = `# AWS Lambda Deployment Instructions

## Prerequisites
- AWS account with appropriate permissions
- AWS CLI configured
- Serverless Framework installed

## Setup
1. **Install Serverless Framework**
   \`\`\`bash
   npm install -g serverless
   \`\`\`

2. **Install plugins**
   \`\`\`bash
   npm install serverless-finch
   \`\`\`

3. **Deploy**
   \`\`\`bash
   serverless deploy
   \`\`\`

## Alternative: S3 + CloudFront
For static sites, use S3 bucket with CloudFront distribution:
1. Create S3 bucket
2. Enable static website hosting
3. Upload built files
4. Create CloudFront distribution
5. Configure custom domain (optional)`;
      }

      setGeneratedScripts(mockScripts);
      setInstructions(mockInstructions);

      await deductCredits(
        'AI Deployment Script Generator',
        requiredCredits,
        `Project: ${projectType}, Target: ${deploymentTarget}, Description: ${projectDescription.substring(0, 100)}...`,
        `Generated deployment scripts for ${deploymentTarget}`
      );

      toast.success('Deployment scripts generated successfully!');
    } catch (error) {
      console.error('Error generating deployment scripts:', error);
      toast.error('Failed to generate deployment scripts');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateScripts = () => {
    if (Object.keys(generatedScripts).length > 0) {
      handleGenerateScripts();
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
            <Rocket className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Deployment Script Generator</h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate deployment scripts and configurations for various platforms
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
          <Card>
            <CardHeader>
              <CardTitle>Deployment Configuration</CardTitle>
              <CardDescription>
                Configure your project details and deployment target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React SPA</SelectItem>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="static">Static Site</SelectItem>
                      <SelectItem value="node">Node.js API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Deployment Target</label>
                  <Select value={deploymentTarget} onValueChange={setDeploymentTarget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vercel">Vercel</SelectItem>
                      <SelectItem value="netlify">Netlify</SelectItem>
                      <SelectItem value="docker">Docker</SelectItem>
                      <SelectItem value="aws">AWS Lambda</SelectItem>
                      <SelectItem value="heroku">Heroku</SelectItem>
                      <SelectItem value="digitalocean">DigitalOcean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Project Description</label>
                <Textarea
                  placeholder="Describe your project, its dependencies, build process, and any special requirements for deployment..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              
              <Button 
                onClick={handleGenerateScripts}
                disabled={isLoading || !projectDescription.trim() || !checkCredits(2)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Scripts...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Generate Deployment Scripts (2 Credits)
                  </>
                )}
              </Button>

              {!checkCredits(2) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 2 credits to generate deployment scripts.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Deployment Assets</CardTitle>
                  <CardDescription>
                    Scripts and instructions for deployment
                  </CardDescription>
                </div>
                {Object.keys(generatedScripts).length > 0 && (
                  <Button
                    onClick={regenerateScripts}
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
              {Object.keys(generatedScripts).length > 0 ? (
                <Tabs defaultValue="scripts" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="scripts">Scripts & Config</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="scripts" className="mt-4">
                    <div className="space-y-4">
                      {Object.entries(generatedScripts).map(([fileName, code]) => (
                        <div key={fileName}>
                          <h4 className="font-medium mb-2 capitalize">{fileName.replace('_', '.')} File</h4>
                          <CodeSlider 
                            code={code}
                            language={fileName.includes('docker') ? 'dockerfile' : 'yaml'}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="instructions" className="mt-4">
                    <CodeSlider 
                      code={instructions}
                      language="markdown"
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Deployment scripts will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Deployment Platform Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🚀 Easy Deployment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Vercel:</strong> Best for React/Next.js</li>
                  <li>• <strong>Netlify:</strong> Great for static sites</li>
                  <li>• <strong>Heroku:</strong> Simple for full-stack apps</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚙️ Advanced Control</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Docker:</strong> Containerized deployment</li>
                  <li>• <strong>AWS:</strong> Scalable cloud infrastructure</li>
                  <li>• <strong>DigitalOcean:</strong> VPS with flexibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💡 Best Practices</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Environment variable management</li>
                  <li>• CI/CD pipeline setup</li>
                  <li>• SSL certificate configuration</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeploymentScriptGenerator;

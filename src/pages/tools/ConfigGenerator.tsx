
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
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

const ConfigGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCredits, deductCredits, currentCredits } = useCreditManager();
  
  const [projectType, setProjectType] = useState('react');
  const [framework, setFramework] = useState('vite');
  const [requirements, setRequirements] = useState('');
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>(['main']);
  const [generatedConfigs, setGeneratedConfigs] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const configOptions = {
    react: [
      { id: 'main', label: 'Main Config (vite.config.js/package.json)', required: true },
      { id: 'tailwind', label: 'Tailwind Config' },
      { id: 'eslint', label: 'ESLint Config' },
      { id: 'prettier', label: 'Prettier Config' },
      { id: 'typescript', label: 'TypeScript Config' }
    ],
    nextjs: [
      { id: 'main', label: 'Next.js Config (next.config.js)', required: true },
      { id: 'tailwind', label: 'Tailwind Config' },
      { id: 'eslint', label: 'ESLint Config' },
      { id: 'typescript', label: 'TypeScript Config' }
    ],
    node: [
      { id: 'main', label: 'Package.json & Server Config', required: true },
      { id: 'eslint', label: 'ESLint Config' },
      { id: 'prettier', label: 'Prettier Config' },
      { id: 'docker', label: 'Dockerfile' }
    ]
  };

  const handleConfigChange = (configId: string, checked: boolean) => {
    if (configId === 'main') return; // Main config is always required
    
    setSelectedConfigs(prev => 
      checked 
        ? [...prev, configId]
        : prev.filter(id => id !== configId)
    );
  };

  const handleGenerateConfigs = async () => {
    if (!requirements.trim()) {
      toast.error('Please describe your project requirements');
      return;
    }

    const requiredCredits = 1;
    if (!checkCredits(requiredCredits)) {
      return;
    }

    setIsLoading(true);

    try {
      const mockConfigs: {[key: string]: string} = {};

      if (selectedConfigs.includes('main')) {
        if (projectType === 'react') {
          mockConfigs.main = `// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

// package.json
{
  "name": "${requirements.toLowerCase().replace(/\s+/g, '-') || 'my-react-app'}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}`;
        }
      }

      if (selectedConfigs.includes('tailwind')) {
        mockConfigs.tailwind = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF4FF',
          500: '#3B82F6',
          600: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
      }

      if (selectedConfigs.includes('eslint')) {
        mockConfigs.eslint = `// .eslintrc.js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': 'warn',
  },
}

// .eslintignore
dist
node_modules
*.env
.env.*`;
      }

      if (selectedConfigs.includes('prettier')) {
        mockConfigs.prettier = `// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}

// .prettierignore
dist
node_modules
*.env
.env.*
package-lock.json`;
      }

      if (selectedConfigs.includes('typescript')) {
        mockConfigs.typescript = `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`;
      }

      setGeneratedConfigs(mockConfigs);

      await deductCredits(
        'AI Config Generator',
        requiredCredits,
        `Project: ${projectType}, Framework: ${framework}, Configs: ${selectedConfigs.join(', ')}, Requirements: ${requirements.substring(0, 100)}...`,
        `Generated ${Object.keys(mockConfigs).length} config files`
      );

      toast.success('Configuration files generated successfully!');
    } catch (error) {
      console.error('Error generating configs:', error);
      toast.error('Failed to generate configuration files');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateConfigs = () => {
    if (Object.keys(generatedConfigs).length > 0) {
      handleGenerateConfigs();
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
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">AI Config Generator</h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate configuration files for popular frameworks and tools
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
          <Card>
            <CardHeader>
              <CardTitle>Project Configuration</CardTitle>
              <CardDescription>
                Select your project type and configuration requirements
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
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="node">Node.js</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Framework/Tool</label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vite">Vite</SelectItem>
                      <SelectItem value="webpack">Webpack</SelectItem>
                      <SelectItem value="parcel">Parcel</SelectItem>
                      <SelectItem value="rollup">Rollup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Configuration Files</label>
                <div className="space-y-2">
                  {configOptions[projectType as keyof typeof configOptions]?.map((config) => (
                    <div key={config.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={config.id}
                        checked={selectedConfigs.includes(config.id)}
                        onCheckedChange={(checked) => handleConfigChange(config.id, checked as boolean)}
                        disabled={config.required}
                      />
                      <label htmlFor={config.id} className="text-sm">
                        {config.label}
                        {config.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Project Requirements</label>
                <Textarea
                  placeholder="Describe your project requirements, features, and any specific configurations needed..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              
              <Button 
                onClick={handleGenerateConfigs}
                disabled={isLoading || !requirements.trim() || !checkCredits(1)}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Configs...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Generate Configuration Files (1 Credit)
                  </>
                )}
              </Button>

              {!checkCredits(1) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Insufficient credits. You need 1 credit to generate config files.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Configuration Files</CardTitle>
                  <CardDescription>
                    Ready-to-use configuration files for your project
                  </CardDescription>
                </div>
                {Object.keys(generatedConfigs).length > 0 && (
                  <Button
                    onClick={regenerateConfigs}
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
              {Object.keys(generatedConfigs).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(generatedConfigs).map(([configType, code]) => (
                    <div key={configType}>
                      <h4 className="font-medium mb-2 capitalize">{configType} Configuration</h4>
                      <CodeSlider 
                        code={code}
                        language="javascript"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Configuration files will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Configuration Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">⚙️ Essential Configs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Build tool configuration</li>
                  <li>• Package.json setup</li>
                  <li>• Environment variables</li>
                  <li>• Path aliases and imports</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎨 Code Quality</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ESLint for code linting</li>
                  <li>• Prettier for formatting</li>
                  <li>• TypeScript configuration</li>
                  <li>• Git hooks and husky</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🚀 Deployment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CI/CD pipeline configs</li>
                  <li>• Docker containerization</li>
                  <li>• Environment-specific settings</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigGenerator;

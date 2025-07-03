
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface CodeSliderProps {
  code: string;
  language?: string;
}

const CodeSlider = ({ code, language = 'javascript' }: CodeSliderProps) => {
  const [copied, setCopied] = useState(false);
  
  const lines = code.split('\n');
  const [currentLine, setCurrentLine] = useState(0);
  const visibleLines = 10;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const nextLines = () => {
    if (currentLine + visibleLines < lines.length) {
      setCurrentLine(prev => prev + visibleLines);
    }
  };

  const prevLines = () => {
    if (currentLine > 0) {
      setCurrentLine(prev => Math.max(0, prev - visibleLines));
    }
  };

  const visibleCode = lines.slice(currentLine, currentLine + visibleLines).join('\n');

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {language} ({lines.length} lines)
          </span>
          <span className="text-xs text-muted-foreground">
            Lines {currentLine + 1}-{Math.min(currentLine + visibleLines, lines.length)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevLines}
            disabled={currentLine === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextLines}
            disabled={currentLine + visibleLines >= lines.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="code-slider">
        <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
          <code className="language-javascript">{visibleCode}</code>
        </pre>
      </div>
    </Card>
  );
};

export default CodeSlider;

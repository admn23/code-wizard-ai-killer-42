
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface CodeSliderProps {
  code: string;
  language?: string;
  maxHeight?: number;
}

const CodeSlider: React.FC<CodeSliderProps> = ({ 
  code, 
  language = 'javascript',
  maxHeight = 400 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const codeLines = code.split('\n');
  const shouldShowSlider = codeLines.length > 15;

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-300 font-mono">{language}</span>
        <Button
          onClick={copyToClipboard}
          size="sm"
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
      
      <div 
        className={`overflow-y-auto transition-all duration-300 ${
          shouldShowSlider && !isExpanded ? `max-h-[${maxHeight}px]` : 'max-h-none'
        }`}
        style={{ maxHeight: shouldShowSlider && !isExpanded ? `${maxHeight}px` : 'none' }}
      >
        <pre className="p-4 text-sm text-gray-100 font-mono whitespace-pre-wrap">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      
      {shouldShowSlider && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-2 flex justify-center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="sm"
            variant="secondary"
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodeSlider;

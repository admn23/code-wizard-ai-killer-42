
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ChevronUp, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

interface CodeSliderProps {
  code: string;
  language?: string;
  maxHeight?: number;
  title?: string;
}

const CodeSlider: React.FC<CodeSliderProps> = ({ 
  code, 
  language = 'javascript',
  maxHeight = 300,
  title = 'Generated Code'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const codeLines = code.split('\n');
  const shouldShowSlider = codeLines.length > 15 || code.length > 800;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && codeRef.current) {
      setTimeout(() => {
        codeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : ''
    }`}>
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-300 font-mono">{title}</span>
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            size="sm"
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-700 h-7 w-7 p-0"
          >
            {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
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
      </div>
      
      <div 
        ref={codeRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isFullscreen ? 'h-[calc(100vh-8rem)]' : shouldShowSlider && !isExpanded ? `max-h-[${maxHeight}px]` : 'max-h-none'
        }`}
        style={{ 
          maxHeight: isFullscreen ? 'calc(100vh - 8rem)' : 
                     shouldShowSlider && !isExpanded ? `${maxHeight}px` : 'none' 
        }}
      >
        <div className="overflow-auto h-full">
          <pre className="p-4 text-sm text-gray-100 font-mono whitespace-pre-wrap leading-relaxed">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
      
      {shouldShowSlider && !isFullscreen && (
        <div className={`${
          isExpanded ? 'relative' : 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent'
        } flex justify-center p-3`}>
          <Button
            onClick={toggleExpanded}
            size="sm"
            variant="secondary"
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 shadow-lg"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More ({codeLines.length} lines)
              </>
            )}
          </Button>
        </div>
      )}
      
      {isFullscreen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50" 
             onClick={() => setIsFullscreen(false)} />
      )}
    </div>
  );
};

export default CodeSlider;

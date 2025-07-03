import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface EnhancedCodeSliderProps {
  code: string;
  language?: string;
  title?: string;
  maxHeight?: number;
}

const EnhancedCodeSlider: React.FC<EnhancedCodeSliderProps> = ({
  code,
  language = "javascript",
  title = "Generated Code",
  maxHeight = 400,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  const codeLines = code.split("\n");
  const lineHeight = 24; // Approximate line height in pixels
  const totalHeight = codeLines.length * lineHeight;
  const shouldShowSlider = totalHeight > maxHeight;

  // Smooth scroll animation on hover
  useEffect(() => {
    if (!shouldShowSlider || !isHovered || !codeRef.current) return;

    let animationFrame: number;
    let startTime: number;
    const duration = Math.max(3000, codeLines.length * 100); // Minimum 3s, scales with lines

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easedProgress = easeInOutQuad(progress);

      const maxScroll = totalHeight - maxHeight;
      const newScrollPosition = easedProgress * maxScroll;

      setScrollPosition(newScrollPosition);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // After reaching the end, scroll back to top
        setTimeout(() => {
          if (isHovered) {
            setScrollPosition(0);
            startTime = 0;
            animationFrame = requestAnimationFrame(animate);
          }
        }, 1000);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered, shouldShowSlider, totalHeight, maxHeight, codeLines.length]);

  // Reset scroll position when not hovering
  useEffect(() => {
    if (!isHovered) {
      setScrollPosition(0);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (shouldShowSlider) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 shadow-2xl" : ""
      } ${isHovered ? "shadow-2xl scale-[1.02]" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
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
          {shouldShowSlider && (
            <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
              Hover to scroll • {codeLines.length} lines
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            size="sm"
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-700 h-7 w-7 p-0"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
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

      {/* Code Content */}
      <div
        ref={codeRef}
        className="relative"
        style={{
          height: isFullscreen ? "calc(100vh - 8rem)" : `${maxHeight}px`,
          overflow: "hidden",
        }}
      >
        <div
          className="transition-transform duration-200 ease-linear"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
            height: `${totalHeight}px`,
          }}
        >
          <pre className="p-4 text-sm text-gray-100 font-mono whitespace-pre-wrap leading-relaxed h-full">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>

        {/* Scroll indicators */}
        {shouldShowSlider && !isFullscreen && (
          <>
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />

            {/* Scroll progress indicator */}
            {isHovered && (
              <div className="absolute right-2 top-2 bottom-2 w-1 bg-gray-700 rounded-full">
                <div
                  className="bg-blue-500 rounded-full transition-all duration-200 ease-linear"
                  style={{
                    height: `${Math.min(100, (scrollPosition / (totalHeight - maxHeight)) * 100)}%`,
                    width: "100%",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}

      {/* Hover instruction */}
      {shouldShowSlider && !isHovered && !isFullscreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-gray-300 px-3 py-1 rounded-full text-xs animate-pulse">
          Hover to auto-scroll through code
        </div>
      )}
    </div>
  );
};

export default EnhancedCodeSlider;

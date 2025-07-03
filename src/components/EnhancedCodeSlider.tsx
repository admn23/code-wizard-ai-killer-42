import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface EnhancedCodeSliderProps {
  code: string;
  language?: string;
  title?: string;
  maxHeight?: number;
  enableAutoScroll?: boolean;
}

const EnhancedCodeSlider: React.FC<EnhancedCodeSliderProps> = ({
  code,
  language = "javascript",
  title = "Generated Code",
  maxHeight = 400,
  enableAutoScroll = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const manualScrollTimeout = useRef<NodeJS.Timeout>();

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard!");
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          if (successful) {
            toast.success("Code copied to clipboard!");
          } else {
            throw new Error("Copy command failed");
          }
        } catch (err) {
          toast.error("Failed to copy code");
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy code");
    }
  };

  const codeLines = code.split("\n");
  const lineHeight = 24; // Approximate line height in pixels
  const totalHeight = codeLines.length * lineHeight;
  const shouldShowSlider = totalHeight > maxHeight;

  // Smooth scroll animation on hover
  useEffect(() => {
    if (
      !enableAutoScroll ||
      !shouldShowSlider ||
      !isHovered ||
      !codeRef.current ||
      isManualScrolling
    ) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        setIsAutoScrolling(false);
      }
      return;
    }

    setIsAutoScrolling(true);
    let startTime: number;
    const duration = Math.max(4000, codeLines.length * 120); // Slightly slower for better readability

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easedProgress = easeInOutQuad(progress);

      const maxScroll = totalHeight - maxHeight;
      const newScrollPosition = easedProgress * maxScroll;

      if (!isManualScrolling) {
        setScrollPosition(newScrollPosition);
      }

      if (progress < 1 && isHovered && !isManualScrolling) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (progress >= 1 && !isManualScrolling) {
        // After reaching the end, scroll back to top
        setTimeout(() => {
          if (isHovered && !isManualScrolling) {
            setScrollPosition(0);
            startTime = 0;
            animationRef.current = requestAnimationFrame(animate);
          }
        }, 1500);
      } else {
        setIsAutoScrolling(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        setIsAutoScrolling(false);
      }
    };
  }, [
    isHovered,
    shouldShowSlider,
    totalHeight,
    maxHeight,
    codeLines.length,
    isManualScrolling,
  ]);

  // Reset scroll position when not hovering
  useEffect(() => {
    if (!isHovered && !isManualScrolling) {
      setScrollPosition(0);
    }
  }, [isHovered, isManualScrolling]);

  // Handle manual scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isManualScrolling) {
      setIsManualScrolling(true);
      setIsAutoScrolling(false);
    }

    const scrollTop = e.currentTarget.scrollTop;
    setScrollPosition(scrollTop);

    // Reset manual scrolling flag after a delay
    clearTimeout(manualScrollTimeout.current);
    manualScrollTimeout.current = setTimeout(() => {
      if (isHovered) {
        setIsManualScrolling(false);
      }
    }, 2000);
  };

  // Stop auto scroll on manual interaction
  const handleManualInteraction = () => {
    setIsManualScrolling(true);
    setIsAutoScrolling(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

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
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                {enableAutoScroll
                  ? isAutoScrolling
                    ? "Auto-scrolling"
                    : isManualScrolling
                      ? "Manual scroll"
                      : "Hover to auto-scroll"
                  : "Scroll to view"}{" "}
                • {codeLines.length} lines
              </span>
              {isManualScrolling && (
                <button
                  onClick={() => {
                    setIsManualScrolling(false);
                    setScrollPosition(0);
                  }}
                  className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded hover:bg-yellow-900/50 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
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
          overflow: isManualScrolling || !shouldShowSlider ? "auto" : "hidden",
        }}
        onScroll={handleScroll}
        onWheel={handleManualInteraction}
        onMouseDown={handleManualInteraction}
        onTouchStart={handleManualInteraction}
      >
        <div
          ref={scrollRef}
          className={`${isManualScrolling ? "" : "transition-transform duration-200 ease-linear"}`}
          style={{
            transform: isManualScrolling
              ? "none"
              : `translateY(-${scrollPosition}px)`,
            height: shouldShowSlider ? `${totalHeight}px` : "auto",
            minHeight: "100%",
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
      {enableAutoScroll &&
        shouldShowSlider &&
        !isHovered &&
        !isFullscreen &&
        !isManualScrolling && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-gray-300 px-3 py-1 rounded-full text-xs animate-pulse">
            Hover for auto-scroll • Scroll manually to control
          </div>
        )}
    </div>
  );
};

export default EnhancedCodeSlider;

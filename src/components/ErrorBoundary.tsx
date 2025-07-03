import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("🚨 ERROR BOUNDARY - Error caught:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "🚨 ERROR BOUNDARY - Component stack trace:",
      errorInfo.componentStack,
    );
    console.error("🚨 ERROR BOUNDARY - Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                Something went wrong!
              </h2>
              <p className="text-gray-600 mb-4">
                An error occurred while loading this page. Please refresh the
                page or contact support if the problem persists.
              </p>
              <details className="text-sm text-gray-500">
                <summary className="cursor-pointer font-medium">
                  Error Details
                </summary>
                <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {this.state.error?.message}
                  {this.state.error?.stack}
                </pre>
              </details>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

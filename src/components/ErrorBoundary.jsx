import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    let readableMessage = "Something unexpected happened while loading this screen.";
    try {
      const parsed = JSON.parse(error?.message || "{}");
      if (parsed?.error) {
        if (parsed.error.toLowerCase().includes("insufficient permissions")) {
          readableMessage =
            "Access restricted or permissions check failed for this action. Please sign in with your verified account and try again.";
        } else {
          readableMessage = parsed.error;
        }
      }
    } catch {
      if (error?.message) {
        readableMessage = error.message;
      }
    }

    return { hasError: true, message: readableMessage };
  }

  componentDidCatch(error, info) {
    console.error("Application ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center bg-protein-surface px-4 py-12">
          <div className="w-full max-w-lg rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <AlertTriangle size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-protein-dark">
              Unable to complete that request
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {this.state.message}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 rounded-full bg-protein-green px-5 py-2.5 text-sm font-bold text-white transition hover:bg-protein-hover"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              <a
                href="/protein-club"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <Home size={16} />
                Protein Club Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

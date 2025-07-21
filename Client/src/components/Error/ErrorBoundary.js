// ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render any fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>;
          <pre>{this.state.error?.toString()}</pre>
        </div>
    )}

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
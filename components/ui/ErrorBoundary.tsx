// Error Boundary Component gemäß Masterplan

'use client';

import React, { Component, ReactNode } from 'react';
import { Card, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // TODO: Log to error tracking service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-red-600">Ein Fehler ist aufgetreten</CardTitle>
            </CardHeader>
            <div className="p-6 space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                {this.state.error?.message || 'Ein unerwarteter Fehler ist aufgetreten'}
              </p>
              <Button variant="primary" onClick={this.handleReset} className="w-full">
                Seite neu laden
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}


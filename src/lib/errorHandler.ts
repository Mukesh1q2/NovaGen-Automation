// errorHandler.ts - Centralized error handling and logging utility

// Error logging levels
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

// Custom error types
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 400, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

// Log function
export function log(level: LogLevel, message: string, meta?: Record<string, any>) {
  // In a production environment, you might want to send logs to a service
  // For now, we'll just log to console with timestamp
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    meta
  }
  
  switch (level) {
    case LogLevel.ERROR:
      console.error(JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.WARN:
      console.warn(JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.INFO:
      console.info(JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.DEBUG:
      console.debug(JSON.stringify(logEntry, null, 2))
      break
  }
}

// Error handler for API routes
export function handleApiError(error: unknown): { error: string; details?: Record<string, any> } {
  log(LogLevel.ERROR, 'API Error', { error })
  
  if (error instanceof AppError) {
    return {
      error: error.message,
      details: error.details
    }
  }
  
  if (error instanceof Error) {
    return {
      error: error.message || 'An unexpected error occurred'
    }
  }
  
  return {
    error: 'An unexpected error occurred'
  }
}

// Error handler for UI components
export function handleComponentError(error: unknown, componentName: string) {
  log(LogLevel.ERROR, `Component Error in ${componentName}`, { error })
  
  if (error instanceof Error) {
    return `An error occurred in ${componentName}: ${error.message}`
  }
  
  return `An unexpected error occurred in ${componentName}`
}

// Global error handler
export function handleGlobalError(error: ErrorEvent | PromiseRejectionEvent) {
  if (error instanceof ErrorEvent) {
    log(LogLevel.ERROR, 'Global Error', {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno
    })
  } else if (error instanceof PromiseRejectionEvent) {
    log(LogLevel.ERROR, 'Unhandled Promise Rejection', {
      reason: error.reason
    })
  }
}

// Initialize global error handlers
if (typeof window !== 'undefined') {
  window.addEventListener('error', handleGlobalError)
  window.addEventListener('unhandledrejection', handleGlobalError)
}
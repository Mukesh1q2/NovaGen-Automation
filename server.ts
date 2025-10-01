// server.ts - Next.js Standalone + Socket.IO
import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const currentPort = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOST || 'localhost';

// Determine CORS origin based on environment
// Use CORS_ORIGIN from environment variable, fallback to default values
const corsOrigin = process.env.CORS_ORIGIN || (dev 
  ? "http://localhost:3000" 
  : process.env.NEXT_PUBLIC_SITE_URL || "https://novagenautomation.com");

console.log(`Starting server in ${dev ? 'development' : 'production'} mode`);
console.log(`CORS origin set to: ${corsOrigin}`);

// Custom server with Socket.IO integration
async function createCustomServer() {
  let nextApp;
  let server;
  
  try {
    // Create Next.js app
    console.log('Initializing Next.js application...');
    nextApp = next({ 
      dev,
      dir: process.cwd(),
      // In production, use the current directory where .next is located
      conf: dev ? undefined : { distDir: './.next' }
    });

    await nextApp.prepare();
    console.log('Next.js application prepared successfully');
    
    const handle = nextApp.getRequestHandler();

    // Create HTTP server that will handle both Next.js and Socket.IO
    server = createServer((req, res) => {
      try {
        // Skip socket.io requests from Next.js handler
        if (req.url?.startsWith('/api/socketio')) {
          return;
        }
        handle(req, res);
      } catch (err) {
        console.error('Request handling error:', err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }
    });

    // Setup Socket.IO
    console.log('Setting up Socket.IO server...');
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    setupSocket(io);

    // Start the server
    server.listen(currentPort, hostname, () => {
      console.log(`> Ready on http://${hostname}:${currentPort}`);
      console.log(`> Socket.IO server running at ws://${hostname}:${currentPort}/api/socketio`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (err) {
    console.error('Server startup error:', err);
    
    // Try to close server if it was created
    if (server) {
      server.close(() => {
        console.log('Server closed due to error');
      });
    }
    
    process.exit(1);
  }
}

// Start the server
createCustomServer().catch((err) => {
  console.error('Unhandled error in server startup:', err);
  process.exit(1);
});

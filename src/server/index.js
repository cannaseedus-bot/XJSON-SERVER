#!/usr/bin/env node

/**
 * XJSON SERVER - ΩOS KERNEL INTEGRATION
 * K'UHUL ASX Framework - Trinity OS Runtime
 */

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public'), {
  setHeaders: (res, filepath) => {
    // Service Worker must be served with correct MIME type
    if (filepath.endsWith('omega-kernel-sw.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Service-Worker-Allowed', '/');
    }
  }
}));

// ΩOS Kernel API Endpoints
app.get('/api/omega/status', (req, res) => {
  res.json({
    kernel: 'ΩOS-TRINITY',
    version: '2.1',
    server: 'XJSON-SERVER',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/omega/process/spawn', (req, res) => {
  const { pid, code, context } = req.body;

  // Simulate kernel process spawn
  res.json({
    success: true,
    pid: pid || `proc_${Date.now()}`,
    status: 'spawned',
    message: 'Process spawned in ΩOS kernel'
  });
});

app.get('/api/omega/vfs/list/:path(*)', (req, res) => {
  const vfsPath = req.params.path || '/';

  // Simulate VFS listing
  res.json({
    path: vfsPath,
    files: [
      { name: 'kernel.js', type: 'file', size: 12450 },
      { name: 'primeos_cognitive_traces.jsonl.txt', type: 'file', size: 54321 },
      { name: 'apps/', type: 'directory' }
    ]
  });
});

app.get('/api/omega/primeos/agents', (req, res) => {
  res.json({
    agents: {
      Mx2LM: { role: 'core_runtime', status: 'active' },
      Qwen: { role: 'external_model', status: 'merge_candidate' },
      Cline: { role: 'task_agent', status: 'active' },
      Janus: { role: 'gateway_agent', status: 'active' }
    }
  });
});

app.post('/api/omega/primeos/command', (req, res) => {
  const { command, context } = req.body;

  res.json({
    command,
    executed: true,
    kernel_pid: `cognitive_${Date.now()}`,
    result: {
      patterns: [],
      thought_trace: 'Command processed by PrimeOS cognitive shell'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  ΩOS TRINITY KERNEL - XJSON SERVER                        ║');
  console.log('║  K\'UHUL ASX Framework v2.1                                ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 ΩOS Kernel API: http://localhost:${PORT}/api/omega/`);
  console.log(`🧠 PrimeOS Cognitive Shell: Active`);
  console.log(`📂 Virtual File System: Mounted`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⏹️  Shutting down ΩOS Kernel...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down ΩOS Kernel...');
  process.exit(0);
});

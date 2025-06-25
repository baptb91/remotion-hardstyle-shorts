#!/usr/bin/env node

// Script de démarrage pour Render.com
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du serveur Remotion Hardstyle...');

// Démarre le serveur avec tsx
const server = spawn('npx', ['tsx', 'src/server/api.ts'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

server.on('error', (err) => {
  console.error('❌ Erreur de démarrage:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`🔴 Serveur fermé avec le code ${code}`);
  process.exit(code);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('📴 Arrêt du serveur...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('📴 Arrêt du serveur...');
  server.kill('SIGINT');
});

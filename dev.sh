#!/bin/bash

# Development script for Nx Docker setup
set -e

echo "🚀 Starting development environment..."

# Install dependencies locally (needed for volume mounts)
echo "📦 Installing dependencies..."
pnpm install

# Build all projects to ensure TypeScript is in sync
echo "🔨 Building all projects..."
pnpm nx run-many --target=build --all

# Sync Nx configuration
echo "🔄 Syncing Nx configuration..."
pnpm nx sync

echo "🧹 Cleaning up any existing containers..."
docker compose -f docker-compose.dev.yml down --remove-orphans

echo "🐳 Starting development containers..."
docker compose -f docker-compose.dev.yml up --build --remove-orphans

echo "✅ Development environment started!"
echo ""
echo "🌐 Services available at:"
echo "   Frontend: http://localhost (with hot reloading)"
echo "   Backend API: http://localhost/api (with hot reloading)"
echo "   Grafana: http://localhost:3002"
echo "   Redis: localhost:6379"
echo ""
echo "🔥 Hot reloading enabled - changes to your code will auto-reload!"
echo "📊 View logs with: docker compose -f docker-compose.dev.yml logs -f"
echo "🛑 Stop services with: docker compose -f docker-compose.dev.yml down"


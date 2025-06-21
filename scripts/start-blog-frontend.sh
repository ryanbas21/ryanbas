#!/bin/sh
set -e
echo "🔄 Ensuring TypeScript is in sync..."
pnpm nx sync
echo "🔨 Building dependencies..."
pnpm nx run-many --target=build --projects=tag:type:lib --skip-nx-cache
echo "🚀 Starting frontend server..."
exec pnpm nx dev @ryanbas/blog-frontend --host=0.0.0.0 --port=3001

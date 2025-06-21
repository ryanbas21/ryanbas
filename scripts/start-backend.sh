#!/bin/sh
set -e
echo "🔄 Ensuring TypeScript is in sync..."
pnpm nx sync
echo "🔨 Building dependencies..."
pnpm nx run-many --target=build --projects=tag:type:lib --skip-nx-cache
echo "🚀 Starting backend server..."
exec pnpm nx serve @ryanbas/backend --host=0.0.0.0 --port=3000

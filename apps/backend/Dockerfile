#### BASE STAGE
#### Installs moon and pnpm.
FROM node:24-alpine AS base
WORKDIR /app
# Install pnpm and moon binary
RUN npm install -g pnpm @moonrepo/cli

#### SKELETON STAGE
#### Scaffolds repository skeleton structures.
FROM base AS skeleton
# Copy entire repository and scaffold
COPY . .
RUN moon docker scaffold backend

#### BUILD STAGE
#### Builds the project.
FROM base AS build
# Copy workspace skeleton
COPY --from=skeleton /app/.moon/docker/workspace .
# Copy essential workspace TypeScript config files
COPY --from=skeleton /app/tsconfig.base.json ./
COPY --from=skeleton /app/tsconfig.json ./
# Install toolchain and dependencies
RUN moon docker setup
# Copy source files
COPY --from=skeleton /app/.moon/docker/sources .
# Build the project
RUN moon run backend:build

# Prune workspace
# RUN moon docker prune

#### START STAGE
#### Runs the project.
FROM base AS start
# Copy built application
COPY --from=build /app /app
CMD moon run backend:serve.development

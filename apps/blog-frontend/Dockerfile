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
RUN moon docker scaffold blog-frontend

#### SERVE STAGE
#### Runs the project.
FROM base AS serve
# Copy workspace skeleton
COPY --from=skeleton /app/.moon/docker/workspace .

# Copy essential workspace TypeScript config files
COPY --from=skeleton /app/tsconfig.base.json ./
COPY --from=skeleton /app/tsconfig.json ./

RUN moon docker setup
COPY --from=skeleton /app/.moon/docker/sources .
CMD moon run blog-frontend:serve
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
RUN moon run blog-frontend:build

RUN moon docker prune
CMD moon run blog-frontend:start



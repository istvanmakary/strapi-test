# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim AS alpine

LABEL fly_launch_runtime="Node.js"


FROM alpine AS base
# Set production environment
ENV NODE_ENV="production"
ARG PNPM_VERSION=9.13.0
RUN npm install -g pnpm@$PNPM_VERSION
RUN npm install turbo --global

# Prune projects
FROM base AS pruner
ARG APP
WORKDIR /app
COPY ./apps/${APP} ./apps/${APP}
COPY package.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml  ./
RUN turbo prune --scope=${APP} --docker

# Throw-away build stage to reduce size of final image
FROM base AS build
ARG APP

WORKDIR /app
# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY ./apps/${APP}/.env.productio[n] ./.env
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/json/ .
COPY package.json turbo.json pnpm-lock.yaml pnpm-workspace.yaml  ./

# First install the dependencies (as they change less often)
RUN pnpm install --frozen-lockfile --prod=false

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

# Build application
RUN turbo build --filter=${APP}

RUN rm -rf ./**/*/src

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base
ARG APP

WORKDIR /app

# Copy built application
COPY --from=build /app /app


# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

ENV APP_START="start:${APP}"

CMD sh -c "pnpm run $APP_START"
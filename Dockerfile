# Install dependencies only when needed
FROM node:16-alpine AS deps
ENV CI=true

WORKDIR /app

# Install PM2 globally(diria que no importa que sea en global,simplemente instalarlo en el contenedor)
RUN npm install pm2 -g

COPY ./package*.json ./
RUN npm install 

# Rebuild the source code only when needed
# FROM node:16-alpine AS builder
# WORKDIR /app
COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# Production image, copy all the files and run next
# FROM node:16-alpine AS runner

# WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/pages ./pages

RUN npm run build


EXPOSE 3000
# La imagen de Node Alpine me proporciona el usuario sin privilegios llamado node.
USER node
# ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["npm", "start"]
# CMD ["node_modules/.bin/next", "start"]
CMD [ "pm2-runtime", "npm", "--", "start" ]

FROM node:20-alpine AS build
WORKDIR /app

# Copy only lock/package files first for better caching
COPY package*.json ./

# If you use npm:
RUN npm ci

# Copy the rest of the source
COPY . .

# Build (creates /app/dist)
RUN npm run build

# 2) Runtime stage (Nginx)

FROM nginx:alpine

# SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

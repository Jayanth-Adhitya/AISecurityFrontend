# Frontend Docker Deployment Guide

This guide explains how to deploy the luggage monitoring frontend using Docker.

## Files Created

- `Dockerfile` - Multi-stage build (Node.js build + nginx serve)
- `nginx.conf` - Nginx configuration for serving the SPA
- `.dockerignore` - Excludes unnecessary files from build
- `docker-compose.yml` - Docker Compose configuration

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
cd Frontend
docker-compose up -d --build
```

Frontend will be available at: `http://localhost:3000`

### Option 2: Docker Commands

```bash
cd Frontend

# Build the image
docker build -t luggage-monitoring-frontend .

# Run the container
docker run -d -p 3000:80 --name luggage-monitoring-frontend luggage-monitoring-frontend
```

## Environment Variables

The build uses `.env.production` file during build time. Make sure it contains:

```env
VITE_API_BASE_URL=https://api.mehh.ae:7000
```

**Important:** Environment variables are baked into the build at build time, not runtime. If you change `.env.production`, you must rebuild.

## Deployment to Coolify

### Step 1: Push to Git
Make sure all files are committed:
```bash
git add Frontend/Dockerfile Frontend/nginx.conf Frontend/.dockerignore Frontend/docker-compose.yml
git commit -m "Add Docker configuration for frontend"
git push
```

### Step 2: Create New Service in Coolify

1. Go to Coolify dashboard
2. Click **"Add New Service"** or **"Add Resource"**
3. Select **"Docker Compose"** or **"Dockerfile"**
4. Choose your GitHub repository
5. Set **Base Directory** to `Frontend` (important!)
6. Set **Dockerfile Location** to `Dockerfile`

### Step 3: Configure Domain

1. In service settings, add domain: `aisecurity.mehh.ae`
2. Enable SSL (Let's Encrypt)
3. Coolify will automatically provision certificate

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Frontend will be available at `https://aisecurity.mehh.ae`

## Port Configuration

- **Container Port:** 80 (nginx)
- **Host Port:** 3000 (configurable in docker-compose.yml)
- **Coolify Port:** Automatically detected from EXPOSE directive

## Nginx Features

✅ **SPA Routing** - All routes fallback to index.html
✅ **Gzip Compression** - Reduces transfer size
✅ **Static Asset Caching** - 1 year cache for images/fonts/css/js
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
✅ **Health Check** - Endpoint for monitoring

## Troubleshooting

### Build Fails
```bash
# Check if .env.production exists
ls -la Frontend/.env.production

# Rebuild without cache
docker-compose build --no-cache
```

### Container Exits Immediately
```bash
# Check logs
docker logs luggage_monitoring_frontend

# Check if port 3000 is already in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### 404 Errors on Refresh
This should be handled by nginx.conf's `try_files` directive. If you still get 404s, check that nginx.conf was copied correctly:

```bash
docker exec luggage_monitoring_frontend cat /etc/nginx/conf.d/default.conf
```

### API Connection Issues
Make sure `.env.production` has the correct backend URL:
```env
VITE_API_BASE_URL=https://api.mehh.ae:7000
```

Then rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

## Development vs Production

**Development:**
```bash
npm run dev
# Uses .env for local development
# Hot reload enabled
```

**Production (Docker):**
```bash
docker-compose up -d --build
# Uses .env.production
# Optimized build, served by nginx
# No hot reload
```

## Stopping/Removing

```bash
# Stop container
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove image
docker rmi luggage-monitoring-frontend
```

## Advanced: API Proxy Through Nginx

If you want nginx to proxy API requests (to avoid CORS), uncomment the proxy section in `nginx.conf`:

```nginx
location /api/ {
    proxy_pass https://api.mehh.ae:7000;
    # ... proxy settings
}
```

Then update frontend to use relative URLs:
```env
VITE_API_BASE_URL=/api
```

This way:
- Frontend: `https://aisecurity.mehh.ae`
- API calls: `https://aisecurity.mehh.ae/api/v1/upload` (proxied to backend)
- No CORS issues!

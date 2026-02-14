# 🚀 Hostinger Deployment Guide

Quick guide to deploy this Next.js 14 standalone app to Hostinger VPS.

## ✅ Prerequisites

1. Hostinger VPS with Node.js 18+ installed
2. SSH access to your VPS
3. Domain pointed to your VPS IP

## 📦 Step 1: Build Locally

On your computer:

```bash
# Install dependencies
npm install

# Build for production (creates standalone build)
npm run build
```

This creates:
- `.next/standalone/` - Your production server
- `.next/static/` - Static assets
- `public/` - Public files

## 📤 Step 2: Upload to Hostinger

### Option A: Using FTP/SFTP

1. Connect to Hostinger via FTP
2. Upload these folders to `/home/username/kinoxit/`:
   - `.next/` (entire folder)
   - `public/` (if you have static files)

### Option B: Using Git (Recommended)

```bash
# On Hostinger VPS via SSH
cd /home/username
git clone https://github.com/yourusername/kinoxit.git
cd kinoxit
npm install
npm run build
```

## 🏃 Step 3: Run on Hostinger

### Method 1: Direct Node.js

```bash
# SSH into Hostinger
cd /home/username/kinoxit/.next/standalone

# Run the server
PORT=3000 node server.js
```

### Method 2: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app
cd /home/username/kinoxit/.next/standalone
pm2 start server.js --name "kinoxit" -i max

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it shows

# Check status
pm2 status
pm2 logs kinoxit
```

## 🌐 Step 4: Setup Reverse Proxy (Nginx)

If using Apache or Nginx on Hostinger:

### Nginx Configuration

Create/edit `/etc/nginx/sites-available/kinoxit`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/kinoxit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache Configuration (.htaccess)

If using Apache, create `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## 🔒 Step 5: Setup SSL (HTTPS)

### Using Let's Encrypt (Free)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

## 🔄 Updating Your App

When you make changes:

```bash
# Build locally
npm run build

# Upload new files to Hostinger

# Restart PM2
pm2 restart kinoxit

# Or reload without downtime
pm2 reload kinoxit
```

## 🐛 Troubleshooting

### App not starting

```bash
# Check Node.js version
node -v  # Should be 18+

# Check if port is already in use
netstat -tulpn | grep 3000

# View PM2 logs
pm2 logs kinoxit --lines 100
```

### Permission issues

```bash
# Fix ownership
sudo chown -R username:username /home/username/kinoxit

# Fix permissions
chmod -R 755 /home/username/kinoxit
```

### Out of memory

```bash
# Check memory usage
free -h

# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=2048" pm2 start server.js --name kinoxit
```

## 📊 Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs in real-time
pm2 logs kinoxit --lines 50

# Check CPU and memory
pm2 status
```

## 🔐 Environment Variables on Hostinger

If you need env vars:

```bash
# Create .env file
cd /home/username/kinoxit
nano .env

# Add your variables
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# PM2 will automatically load .env file
pm2 restart kinoxit --update-env
```

## ✅ Checklist

- [ ] Node.js 18+ installed on Hostinger
- [ ] Project built with `npm run build`
- [ ] Files uploaded to `/home/username/kinoxit/`
- [ ] PM2 installed and configured
- [ ] App running: `pm2 status`
- [ ] Nginx/Apache reverse proxy configured
- [ ] Domain pointed to VPS IP
- [ ] SSL certificate installed
- [ ] PM2 startup script enabled

## 🎉 Done!

Your Next.js app should now be live at `https://yourdomain.com`

Visit your site and click the "Click me" button to verify it works!

---

**Need help?** Check Hostinger documentation or contact their support.

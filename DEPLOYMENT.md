# Railway Deployment Guide

## Quick Deploy Steps

1. **Push to GitHub** (if not already done)
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin master
   ```

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your AI School Platform repository
   - Railway will automatically detect the Node.js application

3. **Configure Environment Variables**
   - Set `NODE_ENV=production`
   - Railway will automatically assign a PORT

4. **Deploy Settings**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Root Directory: `./`

## Deployment Configuration

The project is already configured for Railway deployment:

- `railway.toml` - Railway configuration file
- `package.json` - Build and start scripts
- Express server serves both API and static files
- Same host setup (frontend and backend on one domain)

## Verification

After deployment:

1. Check that the app loads at your Railway URL
2. Test user signup flow
3. Navigate through subjects and lessons
4. Verify mind maps and oral teacher features work
5. Test responsive design on mobile

## Troubleshooting

If deployment fails:

1. Check Railway build logs
2. Verify all dependencies are in package.json
3. Ensure build command runs successfully
4. Check that PORT environment variable is used correctly

## Next Steps

After successful deployment, proceed to Phase 9 (Google Analytics integration).

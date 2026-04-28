# Google Analytics Integration

## Setup Instructions

1. **Create Google Analytics Account**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new account for your AI School Platform
   - Set up a property for your website
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Add Tracking ID to Environment**
   - Copy `.env.example` to `.env` in the frontend directory
   - Replace `your-google-analytics-tracking-id` with your actual GA4 Measurement ID
   
   ```bash
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env and add your GA Tracking ID
   ```

3. **Environment Variables**
   ```env
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

## Features

The Google Analytics integration includes:

- **Page View Tracking**: Automatic tracking of all page navigation
- **User Journey**: Track how users move through signup → dashboard → lessons
- **Engagement Metrics**: Monitor time spent on lessons and features
- **Performance Data**: Page load times and user experience metrics

## Privacy Considerations

- No personal user data is collected (names, grades stored locally)
- Only anonymous usage statistics are tracked
- Compliant with educational privacy requirements
- Users can opt-out using browser extensions

## Verification

After setup:

1. Deploy your application
2. Navigate through the app
3. Check Google Analytics Real-time reports (should show active users)
4. Verify page views are being tracked correctly

## Custom Events

The system can be extended with custom events for:
- Lesson completions
- Subject preferences
- Time spent on activities
- Error tracking

## Production Deployment

For Railway deployment:
1. Add GA Tracking ID as environment variable in Railway dashboard
2. Ensure the variable is named `VITE_GA_TRACKING_ID`
3. Redeploy to activate analytics

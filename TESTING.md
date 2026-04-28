# Testing Guide for AI School Platform

## Local Testing

### Prerequisites
- Node.js installed
- Git installed
- Modern web browser

### Setup and Run Tests

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend  
   npm run dev:frontend
   ```

3. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/health

## Manual Testing Checklist

### ✅ Phase 1 - Project Setup
- [ ] Frontend loads at localhost:3000
- [ ] Backend responds at localhost:5000/api/health
- [ ] No console errors on homepage
- [ ] Responsive design works on mobile/desktop

### ✅ Phase 2 - User Account System
- [ ] Signup form accepts name and grade
- [ ] User data saved to localStorage
- [ ] Auto-login works on page refresh
- [ ] Logout functionality works
- [ ] User info displays in navbar

### ✅ Phase 3 - Subject System
- [ ] Grades 1-3 show: ELA, Math, Art, Music
- [ ] Grades 4-8 show: ELA, Math, Science, Social Studies, Music
- [ ] Subject cards are clickable
- [ ] No EVS subject displayed
- [ ] Dynamic subject loading based on grade

### ✅ Phase 4 - Lesson System
- [ ] Lessons load for each subject
- [ ] Lesson navigation works correctly
- [ ] No redirect bugs when accessing lessons
- [ ] Back navigation returns to subject page
- [ ] Lesson content displays properly

### ✅ Phase 5 - Learning Features
- [ ] Mind maps display with structured content
- [ ] Oral teacher explanations are complete
- [ ] Tab switching works (Content/Mind Map/Teacher)
- [ ] Mind map has central topic and branches
- [ ] Oral teacher has intro/main/conclusion

### ✅ Phase 6 - Stability
- [ ] Error boundaries catch and display errors gracefully
- [ ] No console errors during normal usage
- [ ] Fast loading times
- [ ] Memory usage is reasonable
- [ ] Responsive design works on all screen sizes

### ✅ Phase 7-9 - Deployment & Analytics
- [ ] Git repository initialized
- [ ] All files committed successfully
- [ ] Railway configuration present
- [ ] Google Analytics integration ready
- [ ] Environment variables configured

## API Testing

### Test Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get subjects for grade 2
curl http://localhost:5000/api/subjects/2

# Get subjects for grade 5  
curl http://localhost:5000/api/subjects/5

# Get lessons for grade 2 Math
curl http://localhost:5000/api/lessons/2/Math

# Get specific lesson
curl http://localhost:5000/api/lesson/2/Math/1
```

## Browser Testing

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsive Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

## Performance Testing

### Load Time Targets
- Initial page load: < 3 seconds
- Navigation between pages: < 1 second
- Lesson content loading: < 2 seconds

### Memory Usage
- Should remain stable during extended use
- No memory leaks when navigating between pages

## Error Handling Tests

### Test Scenarios
- [ ] Invalid lesson ID shows appropriate error
- [ ] Network errors handled gracefully
- [ ] Missing localStorage handled
- [ ] Invalid grade selection handled
- [ ] Corrupted user data recovery

## Accessibility Testing

### WCAG 2.1 Compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] Focus indicators visible
- [ ] Alt text for images

## Security Testing

### Basic Security Checks
- [ ] No sensitive data in localStorage
- [ ] XSS prevention measures
- [ ] CSRF protection
- [ ] Input validation on forms
- [ ] Secure API endpoints

## Production Deployment Testing

### Railway Deployment
1. Push to GitHub
2. Connect Railway to repository
3. Verify deployment succeeds
4. Test all functionality on live URL
5. Check Google Analytics tracking

## Final Verification

Before going live, ensure:
- ✅ All phases completed successfully
- ✅ No critical bugs or errors
- ✅ User experience is smooth
- ✅ Performance is acceptable
- ✅ Security measures in place
- ✅ Analytics tracking configured

## Troubleshooting

### Common Issues
- **Port conflicts**: Change ports in vite.config.js or server.js
- **CORS errors**: Ensure backend CORS is configured
- **Build failures**: Check all dependencies are installed
- **API errors**: Verify backend is running and accessible

### Debug Mode
Add to frontend .env:
```env
VITE_DEBUG=true
```

This enables additional logging for troubleshooting.

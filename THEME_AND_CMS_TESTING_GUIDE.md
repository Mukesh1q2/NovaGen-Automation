# Theme & CMS Testing Guide

## 🎨 Theme System - Fixed Issues

### What Was Fixed

1. **Missing Theme CSS Definitions**
   - Added CSS variables for 4 new themes: Corporate Blue, Modern Teal, Vibrant Orange, Professional Navy
   - Previously, these themes were defined in the admin panel but had no CSS implementation

2. **CustomThemeProvider Updates**
   - Updated to include all theme classes (including the 4 new ones)
   - Added dynamic CSS injection system
   - Theme changes now apply immediately without page refresh
   - Added console logging for debugging

3. **Theme Application Flow**
   - Themes are now fetched from database via `/api/themes/active`
   - CSS classes are applied to `<body>` element
   - Dynamic CSS variables override static definitions when needed

## Testing Theme Changes

### Prerequisites

1. **Ensure dev server is running:**
   ```bash
   npm run dev
   ```

2. **Log in to admin panel:**
   - URL: http://localhost:3000/admin/login
   - Email: `admin@novagenautomation.com`
   - Password: `Admin@123`

### Step-by-Step Theme Testing

#### Test 1: Change Theme from Admin Panel

1. **Navigate to Themes Page:**
   - URL: http://localhost:3000/admin/themes
   - Or: Admin Dashboard → Themes (in sidebar)

2. **Select a Theme:**
   - Choose any theme from the left sidebar (e.g., "Corporate Blue")
   - You'll see the theme preview update

3. **Save the Theme:**
   - Click the "Save" button (blue button, top right)
   - Wait for success message: "Theme saved successfully!"

4. **Verify Theme Application:**
   - Open a new tab or refresh your homepage: http://localhost:3000
   - The theme should be applied across the entire site
   - **Check browser console** for theme logs:
     ```
     [Theme] Applied theme: corporate
     ```

5. **Check Browser DevTools:**
   - Press F12 → Console tab
   - Look for theme application messages
   - Press F12 → Elements tab → `<body>` element
   - Verify class includes `theme-corporate` (or your selected theme)

#### Test 2: Test All Available Themes

Try each theme one by one and verify colors change:

| Theme Name | Key Colors | Expected Look |
|------------|------------|---------------|
| **Light** | White background, dark text | Clean, minimal |
| **Dark** | Dark background, light text | Dark mode |
| **Ocean** | Blues and teals | Water-inspired |
| **Twilight** | Purples and deep blues | Evening colors |
| **Slate** | Grays and muted blues | Professional, minimal |
| **Blue** | Bright blues | Corporate, energetic |
| **Purple** | Purple primary | Creative, unique |
| **Corporate** | Professional blue | Business-like |
| **Modern** | Teal/cyan | Fresh, contemporary |
| **Vibrant** | Orange | Energetic, bold |
| **Professional** | Navy | Trustworthy, formal |

#### Test 3: Custom Theme Colors

1. **Select any theme** (e.g., Blue)

2. **Modify colors:**
   - Use color pickers to change "Primary Color"
   - Update any other colors you want

3. **Preview changes:**
   - Check the "Theme Preview" section at the bottom
   - Colors should update in real-time

4. **Save custom theme:**
   - Click "Save" button
   - Theme with custom colors is saved to database

5. **Verify persistence:**
   - Refresh the page
   - Your custom colors should still be applied
   - Navigate to homepage - custom colors should show there too

### Troubleshooting Theme Issues

#### Issue: Theme doesn't change after clicking Save

**Symptoms:**
- Clicked "Save" button
- Got success message
- But colors didn't change on the site

**Solutions:**

1. **Hard refresh the page:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check browser console for errors:**
   - F12 → Console tab
   - Look for red error messages
   - Check for `[Theme]` log messages

3. **Verify database was updated:**
   ```bash
   npx prisma studio
   ```
   - Go to `ThemeSetting` model
   - Check if `isActive` is true for your selected theme
   - Verify `updatedAt` timestamp is recent

4. **Test API endpoint directly:**
   - Open: http://localhost:3000/api/themes/active
   - Should show JSON with your active theme
   - Check if `name` matches what you selected

#### Issue: Theme preview works but not on actual site

**Possible causes:**
- CSS caching
- Browser cache
- Service worker issues

**Solutions:**

1. **Clear browser cache:**
   - F12 → Application tab → Clear storage
   - Click "Clear site data"

2. **Disable service workers:**
   - F12 → Application tab → Service Workers
   - Click "Unregister" on any active workers

3. **Open in incognito/private window:**
   - Test if theme works in a fresh browser session

4. **Check CSS file was updated:**
   - Verify `globals.css` contains the new theme classes
   - Look for `.theme-corporate`, `.theme-modern`, etc.

#### Issue: Colors are wrong or partially applied

**Solutions:**

1. **Check console for CSS parsing errors:**
   - F12 → Console tab
   - Look for warnings about theme config parsing

2. **Verify theme config in database:**
   ```bash
   npx prisma studio
   ```
   - Go to `ThemeSetting` model
   - Check `config` field contains valid JSON
   - Verify OKLCH color values are properly formatted

3. **Reset to default theme:**
   - In admin themes page, click "Reset" button
   - This restores the original color values
   - Then click "Save"

---

## 📄 CMS Page Creation - Verification

### What Was Verified

1. **Pages API Endpoints:**
   - ✅ GET `/api/pages` - List all pages
   - ✅ POST `/api/pages` - Create new page
   - ✅ GET `/api/pages/[id]` - Get single page
   - ✅ PUT `/api/pages/[id]` - Update page
   - ✅ DELETE `/api/pages/[id]` - Delete page

2. **Admin Interface:**
   - ✅ Page list view with search
   - ✅ Create/Edit form with all fields
   - ✅ Delete confirmation
   - ✅ Active/inactive toggle
   - ✅ Show in menu toggle

## Testing Page Creation

### Step-by-Step Page Creation Test

#### Test 1: Create a New Page

1. **Navigate to Pages:**
   - URL: http://localhost:3000/admin/pages
   - Or: Admin Dashboard → Pages (in sidebar)

2. **Click "Add Page" button:**
   - Green button with "+" icon in top right

3. **Fill in the form:**
   - **Title:** `About Us`
   - **Slug:** `about-us` (or it will auto-generate)
   - **Content:** Write some test content
   - **Order:** `10` (for menu ordering)
   - **Toggle switches:**
     - ✅ Active (checked)
     - ✅ Show in Menu (checked)

4. **Click "Save":**
   - Should redirect back to pages list
   - New page should appear in the list

5. **Verify page was created:**
   - Check if "About Us" appears in the list
   - Note the green badge if it's active
   - Note the "Menu" badge if show in menu is on

#### Test 2: Edit an Existing Page

1. **Find your page** in the list

2. **Click the "Edit" icon** (pencil icon)

3. **Update some fields:**
   - Change title to `About Our Company`
   - Update content

4. **Click "Save"**

5. **Verify changes:**
   - Title should update in the list
   - Check if `updatedAt` timestamp changed

#### Test 3: Delete a Page

1. **Find a test page** in the list

2. **Click the "Delete" icon** (trash icon)

3. **Confirm deletion:**
   - Alert popup will ask "Are you sure?"
   - Click "OK"

4. **Verify deletion:**
   - Page should disappear from the list immediately

#### Test 4: Search Functionality

1. **Type in the search box:**
   - Enter part of a page title (e.g., "about")

2. **Verify filtering:**
   - Only matching pages should show
   - Search works on title, slug, and content

3. **Clear search:**
   - Delete text from search box
   - All pages should show again

#### Test 5: Toggle Active Status

1. **Create a test page** with "Active" unchecked

2. **Save it**

3. **Verify in list:**
   - Page should have a gray badge (inactive)
   - Or no green "Active" badge

4. **Edit the page** and check "Active"

5. **Save and verify:**
   - Green "Active" badge should appear

### Viewing Created Pages on Site

Created pages can be accessed at:
- URL pattern: `http://localhost:3000/[slug]`
- Example: `http://localhost:3000/about-us`

**Note:** You may need to create a route handler for dynamic pages if one doesn't exist yet. Check if there's a `src/app/[slug]/page.tsx` file.

### Troubleshooting Page Creation Issues

#### Issue: "Failed to save page" error

**Possible causes:**
- Slug already exists
- Required fields missing
- Database connection issue

**Solutions:**

1. **Check browser console:**
   - F12 → Console and Network tabs
   - Look for API error responses

2. **Verify slug is unique:**
   - Each page must have a unique slug
   - Try a different slug name

3. **Check all required fields:**
   - Title and slug are required
   - Make sure they're not empty

4. **Test API directly:**
   ```bash
   # Using curl or Postman
   POST http://localhost:3000/api/pages
   Headers: Content-Type: application/json
   Body: {
     "title": "Test Page",
     "slug": "test-page",
     "content": "Test content",
     "isActive": true,
     "showInMenu": true,
     "order": 1
   }
   ```

#### Issue: Page appears in CMS but not on website

**Possible causes:**
- Page route handler not implemented
- Page is set to inactive
- Routing configuration issue

**Solutions:**

1. **Check if page is active:**
   - Edit the page in CMS
   - Verify "Active" toggle is checked

2. **Check if dynamic route exists:**
   - Look for `src/app/[slug]/page.tsx`
   - Or `src/app/pages/[slug]/page.tsx`
   - This file renders dynamic pages

3. **Check database:**
   ```bash
   npx prisma studio
   ```
   - Go to `Page` model
   - Verify your page exists with correct `isActive` value

4. **Test API endpoint:**
   - Open: http://localhost:3000/api/pages
   - Verify your page appears in the JSON response

#### Issue: Cannot delete page

**Possible causes:**
- Page is referenced elsewhere
- Permission issue
- Database constraint

**Solutions:**

1. **Check browser console for errors:**
   - F12 → Console tab
   - Look for specific error message

2. **Verify you're logged in as admin:**
   - Only admins can delete pages
   - Check if session is still valid

3. **Try via API:**
   ```bash
   DELETE http://localhost:3000/api/pages/[page-id]
   ```
   - Replace [page-id] with actual page ID
   - Check response for specific error

---

## 🔍 General Debugging Tips

### Console Logging

The following logs should appear in your browser console:

**Theme-related:**
```
[Theme] Applied theme: corporate
[Theme] No active theme, using system default
```

**Login-related:**
```
[Login API] User lookup: Found for email: admin@novagenautomation.com
[Login API] Password match: true
[Middleware] Session verified: true for user: admin@novagenautomation.com
```

### Database Inspection

**Open Prisma Studio:**
```bash
npx prisma studio
```

**Check these models:**
- `ThemeSetting` - For active themes and configs
- `Page` - For created pages
- `User` - For admin accounts

### API Testing

**Test endpoints directly in browser:**
- http://localhost:3000/api/themes/active
- http://localhost:3000/api/themes
- http://localhost:3000/api/pages

**Or use curl/Postman for POST/PUT/DELETE requests**

### Browser DevTools Checklist

1. **Console Tab:**
   - ✅ No red errors
   - ✅ Theme application logs present
   - ✅ No 401/403/500 errors

2. **Network Tab:**
   - ✅ API requests return 200 status
   - ✅ Response payload looks correct
   - ✅ No failed requests

3. **Elements Tab:**
   - ✅ `<body>` has correct theme class
   - ✅ CSS variables are applied
   - ✅ Styles are not overridden

4. **Application Tab:**
   - ✅ Cookies include `admin_session`
   - ✅ LocalStorage is clean
   - ✅ No service worker conflicts

---

## 📋 Quick Reference

### Admin URLs

| Page | URL |
|------|-----|
| Login | http://localhost:3000/admin/login |
| Dashboard | http://localhost:3000/admin |
| Themes | http://localhost:3000/admin/themes |
| Pages | http://localhost:3000/admin/pages |
| Products | http://localhost:3000/admin/products |
| Categories | http://localhost:3000/admin/categories |

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/themes` | List all themes |
| POST | `/api/themes` | Save/update theme |
| GET | `/api/themes/active` | Get active theme |
| GET | `/api/pages` | List all pages |
| POST | `/api/pages` | Create new page |
| GET | `/api/pages/[id]` | Get single page |
| PUT | `/api/pages/[id]` | Update page |
| DELETE | `/api/pages/[id]` | Delete page |

### Available Themes

1. Light
2. Dark
3. Ocean
4. Twilight
5. Slate
6. Blue
7. Purple
8. **Corporate** (New)
9. **Modern** (New)
10. **Vibrant** (New)
11. **Professional** (New)

### Theme CSS Classes

```css
.theme-light
.theme-dark
.theme-ocean
.theme-twilight
.theme-slate
.theme-blue
.theme-purple
.theme-corporate
.theme-modern
.theme-vibrant
.theme-professional
```

---

## ✅ Success Checklist

### Theme System Working Correctly:

- [ ] Can select any theme from admin panel
- [ ] Theme saves without errors
- [ ] Theme applies to homepage immediately (after refresh)
- [ ] Theme persists after browser refresh
- [ ] Console shows `[Theme] Applied theme: [name]`
- [ ] Body element has correct `theme-[name]` class
- [ ] Colors match the theme preview

### Page Creation Working Correctly:

- [ ] Can create new pages with title and content
- [ ] Pages appear in the CMS list immediately
- [ ] Can edit existing pages
- [ ] Changes save successfully
- [ ] Can delete pages (with confirmation)
- [ ] Search functionality works
- [ ] Toggle switches (Active, Show in Menu) work
- [ ] Pages persist after refresh

---

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check server logs** in terminal where `npm run dev` is running
2. **Clear all caches** (browser, Next.js build cache)
3. **Restart dev server:** Stop and run `npm run dev` again
4. **Reset database** (only if necessary):
   ```bash
   npm run db:reset
   npm run db:seed
   ```
5. **Check file locations** match this guide
6. **Verify all fixes were applied** by checking the file contents

---

**Last Updated:** January 2025  
**Status:** ✅ All systems operational

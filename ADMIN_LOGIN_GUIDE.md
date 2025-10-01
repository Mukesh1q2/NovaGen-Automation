# Admin Login Troubleshooting Guide

## Admin Credentials

After running the database seed script, the following admin account has been created:

**Email**: `admin@novagenautomation.com`  
**Password**: `Admin@123`

## Quick Fix Steps

If you're having trouble logging into the admin panel, follow these steps:

### 1. Verify Database is Seeded

Run the seed script to ensure the admin user exists:

```bash
npm run db:seed
```

Expected output: `Seeding complete`

### 2. Check Environment Variables

Ensure your `.env` file contains:

```env
AUTH_SECRET=a8f5b6e7d4c3a2b1f0e9d8c7b6a5f4d3c2b1a0e9f8d7c6b5a4d3c2b1a0e9f8d7
DATABASE_URL="file:./dev.db"
```

### 3. Restart Development Server

After seeding and confirming environment variables, restart the server:

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

### 4. Test Login Flow

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `admin@novagenautomation.com`
   - Password: `Admin@123`
3. Click "Sign in"

### 5. Check Console Logs

With the enhanced logging added, you should see detailed logs in the terminal:

**Login API logs:**
- `[Login API] User lookup: Found for email: admin@novagenautomation.com`
- `[Login API] Password match: true`
- `[Login API] Setting session cookie: admin_session with options: {...}`
- `[Login API] Login successful for user: admin@novagenautomation.com`

**Middleware logs (after successful login):**
- `[Middleware] Checking path: /admin`
- `[Middleware] Session token present: true`
- `[Middleware] Session verified: true for user: admin@novagenautomation.com`
- `[Middleware] Access granted to: /admin`

## Common Issues & Solutions

### Issue 1: "Invalid credentials" Error

**Possible causes:**
- User not seeded in database
- Wrong password
- Email case mismatch

**Solution:**
1. Re-run seed script: `npm run db:seed`
2. Verify exact credentials (case-sensitive)
3. Check console for: `[Login API] User lookup: Not found`

### Issue 2: Login succeeds but redirects back to login

**Possible causes:**
- Session cookie not being set
- AUTH_SECRET not configured
- Cookie settings incompatible with browser

**Solution:**
1. Check console for cookie setting logs
2. Verify AUTH_SECRET in `.env`
3. Check browser developer tools > Application/Storage > Cookies
4. Look for `admin_session` cookie on `localhost`

### Issue 3: Middleware redirects after successful login

**Possible causes:**
- Session token not being verified
- Token expiration issue
- Cookie path mismatch

**Solution:**
1. Check middleware logs for session verification
2. Look for: `[Middleware] Session verified: false`
3. Verify cookie settings in browser devtools

## Browser Testing Checklist

1. **Open Developer Tools** (F12)
2. **Check Network Tab** when clicking login:
   - POST request to `/api/auth/login`
   - Status should be 200
   - Response should be `{"success": true}`
3. **Check Application/Storage Tab**:
   - Cookies section
   - Look for `admin_session` cookie
   - Verify it has a value and proper path (`/`)
4. **Check Console Tab**:
   - Look for any JavaScript errors
   - Verify no CORS or fetch errors

## Session Cookie Details

The session cookie is configured as follows:

```typescript
{
  httpOnly: true,        // Cannot be accessed by JavaScript (security)
  sameSite: 'lax',       // CSRF protection
  secure: false,         // Set to true only in production (HTTPS)
  path: '/',             // Available to all paths
  maxAge: 86400          // 24 hours (in seconds)
}
```

**Note**: In development (`NODE_ENV !== 'production'`), `secure` is set to `false` to work with `http://localhost`.

## Manual Database Verification

To manually check if the admin user exists in the database:

```bash
# Open Prisma Studio
npx prisma studio
```

Then:
1. Navigate to the `User` model
2. Look for `admin@novagenautomation.com`
3. Verify the `role` is set to `admin`
4. Confirm `passwordHash` field has a value

## Password Reset (if needed)

If you need to reset the admin password, you can create a script or use Prisma Studio:

### Using Prisma Studio:
1. Run `npx prisma studio`
2. Go to User model
3. Find the admin user
4. Update the `passwordHash` field with a new bcrypt hash

### Generating new password hash:
```javascript
// In Node.js REPL or a script
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('YourNewPassword', 12);
console.log(hash);
```

## Creating Additional Admin Users

To create additional admin users, you can:

1. Add them to `prisma/seed.ts`
2. Or create an API endpoint for user management (recommended for production)

## Security Notes

### Development
- Default password is simple for development convenience
- Logging includes sensitive operations (login attempts, session verification)
- `secure` cookie flag is disabled for HTTP

### Production Recommendations
- Change default admin password immediately
- Remove detailed console logging
- Enable `secure: true` for cookies (requires HTTPS)
- Implement rate limiting (already included in login route)
- Add IP-based blocking for failed login attempts
- Consider adding 2FA/MFA

## Need More Help?

If you're still experiencing issues:

1. **Check server logs** in the terminal where `npm run dev` is running
2. **Check browser console** for client-side errors
3. **Verify network requests** in browser DevTools Network tab
4. **Test with curl** to isolate client vs server issues:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@novagenautomation.com","password":"Admin@123"}' \
  -v
```

This will show the full HTTP response including cookies being set.

## File Locations

- **Login API**: `src/app/api/auth/login/route.ts`
- **Login Page**: `src/app/admin/login/page.tsx`
- **Middleware**: `src/middleware.ts`
- **Auth Library**: `src/lib/auth.ts`
- **Database Service**: `src/lib/dbService.ts`
- **Seed Script**: `prisma/seed.ts`
- **Environment Variables**: `.env`

## Enhanced Logging

The following logging has been added to help troubleshoot:

### Login API (`src/app/api/auth/login/route.ts`)
- User lookup status
- Password verification result
- Cookie setting details
- Login success confirmation
- Error details

### Middleware (`src/middleware.ts`)
- Path being accessed
- Token presence check
- Session verification status
- Redirect reasons
- Access granted confirmation

These logs will appear in your terminal where the dev server is running.

---

**Last Updated**: January 2025

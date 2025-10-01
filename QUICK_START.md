# 🚀 Quick Start - Admin Login

## Admin Credentials

```
Email:    admin@novagenautomation.com
Password: Admin@123
```

## Quick Commands

```bash
# 1. Seed database (creates admin user)
npm run db:seed

# 2. Start development server
npm run dev

# 3. Test login API
node test-login.js

# 4. Open Prisma Studio (database viewer)
npx prisma studio
```

## URLs

- **Login Page**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin
- **Prisma Studio**: http://localhost:5555 (when running)

## Testing Steps

1. ✅ Run: `npm run db:seed`
2. ✅ Run: `npm run dev`
3. ✅ Open: http://localhost:3000/admin/login
4. ✅ Enter credentials above
5. ✅ Click "Sign in"
6. ✅ Should redirect to admin dashboard

## If Login Fails

```bash
# Run test script for detailed diagnosis
node test-login.js
```

Then check terminal logs for:
- `[Login API]` messages
- `[Middleware]` messages

## Files to Check

- 📄 `ADMIN_LOGIN_GUIDE.md` - Full troubleshooting guide
- 📄 `LOGIN_FIX_SUMMARY.md` - What was fixed/changed
- 📄 `test-login.js` - Quick test script

## Common Issues

### "Invalid credentials"
→ Run: `npm run db:seed`

### Login succeeds but redirects back
→ Check: Browser DevTools > Application > Cookies for `admin_session`

### Can't connect to server
→ Ensure: `npm run dev` is running

## Browser DevTools Check

**F12 → Application Tab → Cookies → localhost**

Look for:
- Cookie name: `admin_session`
- Value: Long JWT token
- Path: `/`
- Expires: ~24 hours from login

---

**Need More Help?** → See `ADMIN_LOGIN_GUIDE.md`

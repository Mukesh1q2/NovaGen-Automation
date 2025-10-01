/**
 * Quick Login Test Script
 * 
 * This script tests the admin login API endpoint to verify credentials work.
 * Run this while your dev server is running: node test-login.js
 */

const SERVER_URL = 'http://localhost:3000';
const LOGIN_ENDPOINT = '/api/auth/login';

async function testLogin() {
  console.log('🧪 Testing Admin Login...\n');
  
  const credentials = {
    email: 'admin@novagenautomation.com',
    password: 'Admin@123'
  };

  console.log('📧 Email:', credentials.email);
  console.log('🔒 Password:', credentials.password.replace(/./g, '*'));
  console.log('\n⏳ Sending request to:', SERVER_URL + LOGIN_ENDPOINT);
  console.log('─────────────────────────────────────────────────\n');

  try {
    const response = await fetch(SERVER_URL + LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log('📊 Response Status:', response.status, response.statusText);
    console.log('📋 Response Headers:');
    response.headers.forEach((value, key) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log('\n📦 Response Body:');
    console.log(JSON.stringify(data, null, 2));

    // Check for session cookie in Set-Cookie header
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      console.log('\n🍪 Session Cookie Set:');
      console.log('   ' + setCookie);
      
      // Parse cookie name
      if (setCookie.includes('admin_session=')) {
        console.log('\n✅ SUCCESS: Session cookie "admin_session" was set!');
      } else {
        console.log('\n⚠️  WARNING: Cookie set but not named "admin_session"');
      }
    } else {
      console.log('\n❌ ERROR: No session cookie set in response!');
    }

    console.log('\n─────────────────────────────────────────────────');

    if (response.ok) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
      console.log('You should now be able to access the admin panel.');
      console.log('\nNext steps:');
      console.log('1. Open browser to: http://localhost:3000/admin/login');
      console.log('2. Enter the same credentials');
      console.log('3. Check browser DevTools > Application > Cookies for "admin_session"');
    } else {
      console.log('\n❌ LOGIN FAILED!');
      console.log('Status:', response.status);
      console.log('Error:', data.error || 'Unknown error');
      console.log('\nTroubleshooting:');
      console.log('1. Ensure dev server is running: npm run dev');
      console.log('2. Run database seed: npm run db:seed');
      console.log('3. Check server logs for detailed error messages');
    }

  } catch (error) {
    console.log('\n❌ REQUEST FAILED!');
    console.log('Error:', error.message);
    console.log('\nPossible issues:');
    console.log('- Dev server not running (start with: npm run dev)');
    console.log('- Server running on different port');
    console.log('- Network connectivity issue');
  }

  console.log('\n');
}

// Run the test
testLogin();

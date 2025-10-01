import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page
    await page.goto('/admin/login');
  });

  test('should allow admin login with correct credentials', async ({ page }) => {
    // Fill in the login form
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    
    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Verify that we're redirected to the admin dashboard
    await expect(page).toHaveURL('/admin');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should reject login with incorrect credentials', async ({ page }) => {
    // Fill in the login form with incorrect credentials
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('wrongpassword');
    
    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Verify that we see an error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should allow navigation to different admin sections', async ({ page }) => {
    // First login
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Test navigation to Products page
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/admin/products');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    
    // Test navigation to Categories page
    await page.getByRole('link', { name: 'Categories' }).click();
    await expect(page).toHaveURL('/admin/categories');
    await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible();
    
    // Test navigation to Pages page
    await page.getByRole('link', { name: 'Pages' }).click();
    await expect(page).toHaveURL('/admin/pages');
    await expect(page.getByRole('heading', { name: 'Pages' })).toBeVisible();
    
    // Test navigation to Users page
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL('/admin/users');
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
    
    // Test navigation to Slider page
    await page.getByRole('link', { name: 'Slider' }).click();
    await expect(page).toHaveURL('/admin/slider');
    await expect(page.getByRole('heading', { name: 'Slider' })).toBeVisible();
    
    // Test navigation to Themes page
    await page.getByRole('link', { name: 'Themes' }).click();
    await expect(page).toHaveURL('/admin/themes');
    await expect(page.getByRole('heading', { name: 'Theme Management' })).toBeVisible();
  });

  test('should allow theme selection and customization', async ({ page }) => {
    // First login
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Navigate to Themes page
    await page.getByRole('link', { name: 'Themes' }).click();
    await expect(page).toHaveURL('/admin/themes');
    await expect(page.getByRole('heading', { name: 'Theme Management' })).toBeVisible();
    
    // Select a theme
    await page.getByText('Blue').click();
    
    // Modify a color
    const primaryColorInput = page.locator('input[type="color"]').first();
    await primaryColorInput.fill('#ff0000'); // Change to red
    
    // Save the theme
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify success message
    await expect(page.getByText('Theme saved successfully!')).toBeVisible();
  });

  test('should allow product creation', async ({ page }) => {
    // First login
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Navigate to Products page
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/admin/products');
    
    // Click Add Product button
    await page.getByRole('button', { name: 'Add Product' }).click();
    await expect(page).toHaveURL('/admin/products/add');
    
    // Fill in product details
    await page.getByLabel('Name').fill('Test Product');
    await page.getByLabel('Slug').fill('test-product');
    await page.getByLabel('Short Description').fill('This is a test product');
    await page.getByLabel('Description').fill('This is a detailed description of the test product');
    await page.getByLabel('Price').fill('99.99');
    await page.getByLabel('SKU').fill('TEST-001');
    
    // Select a category
    await page.getByLabel('Category').selectOption({ index: 1 });
    
    // Save the product
    await page.getByRole('button', { name: 'Save Product' }).click();
    
    // Verify we're back on the products page
    await expect(page).toHaveURL('/admin/products');
    await expect(page.getByText('Product created successfully')).toBeVisible();
  });

  test('should allow page creation', async ({ page }) => {
    // First login
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Navigate to Pages page
    await page.getByRole('link', { name: 'Pages' }).click();
    await expect(page).toHaveURL('/admin/pages');
    
    // Click Add Page button
    await page.getByRole('button', { name: 'Add Page' }).click();
    await expect(page).toHaveURL('/admin/pages/add');
    
    // Fill in page details
    await page.getByLabel('Title').fill('Test Page');
    await page.getByLabel('Slug').fill('test-page');
    await page.getByLabel('Content').fill('This is the content of the test page');
    
    // Save the page
    await page.getByRole('button', { name: 'Save Page' }).click();
    
    // Verify we're back on the pages page
    await expect(page).toHaveURL('/admin/pages');
    await expect(page.getByText('Page created successfully')).toBeVisible();
  });
});
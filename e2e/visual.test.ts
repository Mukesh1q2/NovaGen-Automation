import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage should look consistent', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot('homepage.png', { 
      maxDiffPixelRatio: 0.01 
    });
  });

  test('admin dashboard should look consistent', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot('admin-dashboard.png', { 
      maxDiffPixelRatio: 0.01 
    });
  });

  test('products page should look consistent', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Navigate to products page
    await page.getByRole('link', { name: 'Products', exact: true }).first().click();
    await expect(page).toHaveURL('/admin/products');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot('admin-products.png', { 
      maxDiffPixelRatio: 0.01 
    });
  });

  test('theme management page should look consistent', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('admin@novagenautomation.com');
    await page.getByLabel('Password').fill('Admin@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Navigate to themes page
    await page.getByRole('link', { name: 'Themes' }).click();
    await expect(page).toHaveURL('/admin/themes');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot('admin-themes.png', { 
      maxDiffPixelRatio: 0.01 
    });
  });
});
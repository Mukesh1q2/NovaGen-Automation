import { test, expect } from '@playwright/test';

test.describe('Frontend User Flows', () => {
  test('should display homepage with hero carousel', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/NovaGen Automation/);
    
    // Check that hero carousel is visible
    const heroCarousel = page.getByTestId('hero-carousel');
    await expect(heroCarousel).toBeVisible();
    
    // Check that there are slides in the carousel
    const slides = page.getByTestId('carousel-slide');
    const slideCount = await slides.count();
    expect(slideCount).toBeGreaterThan(0);
  });

  test('should navigate to products page and display products', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products link in navigation
    await page.getByRole('link', { name: 'Products main' }).click();
    await page.waitForURL('/products', { timeout: 10000 });
    await expect(page).toHaveURL('/products');
    
    // Check that products grid is visible
    const productsGrid = page.getByTestId('products-grid');
    await expect(productsGrid).toBeVisible();
    
    // Check that there are product cards
    const productCards = page.getByTestId('product-card');
    const productCardCount = await productCards.count();
    expect(productCardCount).toBeGreaterThan(0);
  });

  test('should allow searching for products', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products link in navigation
    await page.getByRole('link', { name: 'Products main' }).click();
    await page.waitForURL('/products', { timeout: 10000 });
    await expect(page).toHaveURL('/products');
    
    // Find the search input and type a search term
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('test');
    
    // Submit the search
    await searchInput.press('Enter');
    
    // Check that we're on the search results page
    await expect(page).toHaveURL(/search/);
    
    // Check that search results are displayed
    const searchResults = page.getByTestId('search-results');
    await expect(searchResults).toBeVisible();
  });

  test('should display product details page', async ({ page }) => {
    await page.goto('/products');
    
    // Click on the first product card
    const firstProductCard = page.getByTestId('product-card').first();
    await firstProductCard.click();
    
    // Check that we're on a product details page
    await expect(page).toHaveURL(/\/products\//);
    
    // Check that product details are displayed
    const productName = page.getByTestId('product-name');
    await expect(productName).toBeVisible();
    
    const productDescription = page.getByTestId('product-description');
    await expect(productDescription).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click on About link in navigation
    await page.getByRole('link', { name: 'About Us main' }).click();
    await page.waitForURL('/about', { timeout: 10000 });
    await expect(page).toHaveURL('/about');
    
    // Check that about page content is visible
    const aboutContent = page.getByRole('main');
    await expect(aboutContent).toBeVisible();
  });

  test('should navigate to contact page and submit form', async ({ page }) => {
    await page.goto('/');
    
    // Click on Contact link in navigation
    await page.getByRole('link', { name: 'Contact Us main' }).click();
    await page.waitForURL('/contact', { timeout: 10000 });
    await expect(page).toHaveURL('/contact');
    
    // Fill in contact form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Subject').fill('Test Subject');
    await page.getByLabel('Message').fill('This is a test message');
    
    // Submit the form
    await page.getByRole('button', { name: 'Send Message' }).click();
    
    // Check for success message
    const successMessage = page.getByText('Thank you for your message');
    await expect(successMessage).toBeVisible();
  });

  test('should display gallery page with images', async ({ page }) => {
    await page.goto('/');
    
    // Click on Gallery link in navigation
    await page.getByRole('link', { name: 'Gallery main' }).click();
    await page.waitForURL('/gallery', { timeout: 10000 });
    await expect(page).toHaveURL('/gallery');
    
    // Check that gallery grid is visible
    const galleryGrid = page.getByTestId('gallery-grid');
    await expect(galleryGrid).toBeVisible();
    
    // Check that there are gallery images
    const galleryImages = page.getByTestId('gallery-image');
    const galleryImageCount = await galleryImages.count();
    expect(galleryImageCount).toBeGreaterThan(0);
  });
});
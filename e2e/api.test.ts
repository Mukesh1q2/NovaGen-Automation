import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test('should return product categories', async ({ request }) => {
    const response = await request.get('/api/categories');
    expect(response.status()).toBe(200);
    
    const categories = await response.json();
    expect(Array.isArray(categories)).toBeTruthy();
    // Check that we have at least some categories
    expect(categories.length).toBeGreaterThan(0);
    
    // Check the structure of the first category
    if (categories.length > 0) {
      const category = categories[0];
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('slug');
    }
  });

  test('should return products', async ({ request }) => {
    const response = await request.get('/api/products');
    expect(response.status()).toBe(200);
    
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    
    // Check the structure of the first product
    if (products.length > 0) {
      const product = products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('slug');
      expect(product).toHaveProperty('categoryId');
      expect(product).toHaveProperty('category');
    }
  });

  test('should return pages', async ({ request }) => {
    const response = await request.get('/api/pages');
    expect(response.status()).toBe(200);
    
    const pages = await response.json();
    expect(Array.isArray(pages)).toBeTruthy();
    
    // Check the structure of the first page
    if (pages.length > 0) {
      const page = pages[0];
      expect(page).toHaveProperty('id');
      expect(page).toHaveProperty('title');
      expect(page).toHaveProperty('slug');
      expect(page).toHaveProperty('isActive');
    }
  });

  test('should return homepage slides', async ({ request }) => {
    const response = await request.get('/api/slides');
    expect(response.status()).toBe(200);
    
    const slides = await response.json();
    expect(Array.isArray(slides)).toBeTruthy();
    
    // Check the structure of the first slide
    if (slides.length > 0) {
      const slide = slides[0];
      expect(slide).toHaveProperty('id');
      expect(slide).toHaveProperty('title');
      expect(slide).toHaveProperty('desktopImage');
      expect(slide).toHaveProperty('mobileImage');
      expect(slide).toHaveProperty('isActive');
    }
  });

  test('should handle 404 for non-existent product', async ({ request }) => {
    const response = await request.get('/api/products/non-existent-id');
    expect(response.status()).toBe(404);
  });

  test('should handle 404 for non-existent category', async ({ request }) => {
    const response = await request.get('/api/categories/non-existent-slug');
    expect(response.status()).toBe(404);
  });
});
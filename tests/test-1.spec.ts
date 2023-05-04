import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("file://" + __dirname + "/../index.html");
});

test.describe('Navbar', () => {
  test('should allow me to add todo items', async ({ page }) => {
    await page.getByRole('link', { name: 'Favourite Games' }).click();
    await page.getByRole('link', { name: 'Match Pairs' }).click();
    await page.getByRole('link', { name: 'Quick Quiz' }).click();
    await page.getByRole('link', { name: 'Minesweeper' }).click();
    await page.getByRole('link', { name: 'Times' }).click();
  });
});
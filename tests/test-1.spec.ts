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


test('All tags has class "selectable"', async ({ page }) => {
  const spans = await page.$$('span.tag');
  for (const span of spans) {
      const cl = await span.getAttribute('class');
      if(cl != null && !cl.split(" ").includes("visually-hidden")) {
          expect(await span.getAttribute('class')).toContain('selectable');
    }
  };
});



test ('All images on index has alternative text', async ({ page }) => {
  const images = await page.$$('img');
  for (const image of images) {
    const alt = await image.getAttribute('alt');
    expect (alt).not.toBeNull();
    expect(await image.getAttribute('alt')).not.toBe('');
  }  
});

test('Has title', async ({ page }) => {
  await expect(page).toHaveTitle("PolyJam");
});

test('Index has header of level 1 with content "Home"', async ({ page }) => {
  const headers = await page.$$('h1');
  expect(headers.length).toBe(1);
  const header = headers[0];
  expect(await header.innerText()).toBe('Home');
});

test('Index has header of level 2 with correct content', async ({ page }) => {
  const headers = await page.$$('h2');
  expect(headers.length).toBe(1);
  const header = headers[0];
  expect(await header.innerText()).toBe('Here you can find all of the games of our website. Enjoy!');
});

test ('Each card has header of level 3', async ({ page }) => {
  const cards = await page.$$('div.card');
  for (const card of cards) {
    const headers = await card.$$('h3');
    expect(headers.length).toBe(1);
  }
});

test ('Index page has empty satus bar', async ({ page }) => {
  const statusBar = await page.$('p#statusBar');
  if(statusBar != null){
    expect(await statusBar.innerText()).toBe('');
  } else{
    expect(false).toBe(true);
  }
});


test('Search action show correct status with enter key', async ({ page }) => {
  const searchBar = await page.$('input#searchInput');
  if(searchBar != null){
    await searchBar.click();
    await searchBar.fill('someSearch');
    await searchBar.press('Enter');
    const statusBar = await page.$('p#statusBar');
    if(statusBar != null){
      expect(await statusBar.innerText()).toBe('Showing results for: someSearch');
    } else{
      expect(false).toBe(true);
    }
  } else{
    expect(false).toBe(true);
  }
});

test('Search action show correct status with click on search button', async ({ page }) => {
  const searchBar = await page.$('input#searchInput');
  const searchButton = await page.$('button#searchButton');
  if(searchBar != null && searchButton != null){
    await searchBar.click();
    await searchBar.fill('someSearch');
    await searchButton.click();
    const statusBar = await page.$('p#statusBar');
    if(statusBar != null){
      expect(await statusBar.innerText()).toBe('Showing results for: someSearch');
    } else{
      expect(false).toBe(true);
    }
  } else{
    expect(false).toBe(true);
  }
});

test('Click on tag shows correct status', async ({ page }) => {
  const card = await page.$('div.card');
  
});
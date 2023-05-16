import { test, expect, ElementHandle } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("file://" + __dirname + "/../index.html");
});

test('should allow me to add todo items', async ({ page }) => {
  await page.getByRole('link', { name: 'Favourite Games' }).click();
  await page.getByRole('link', { name: 'Match Pairs' }).click();
  await page.getByRole('link', { name: 'Quick Quiz' }).click();
  await page.getByRole('link', { name: 'Minesweeper' }).click();
  await page.getByRole('link', { name: 'Times' }).click();
});


// Filtering locators feature
test('navbar should have next links: Home, Favourite Games, Match Pairs, Quick Quiz, Minesweeper, Times', async ({ page }) => {
  await expect(page
    .getByRole('listitem')
    .filter({ has: page.getByRole('link') }))
    .toHaveText(['Home', 'Favourite Games', 'Match Pairs', 'Quick Quiz', 'Minesweeper', 'Times']);
});

// To be visible
test('search label is invisible', async ({ page }) => {
  const searchLabel = await page.getByLabel('searchInput');
  expect(await searchLabel.isVisible()).toBe(false);
});


test('All tags has class "selectable"', async ({ page }) => {
  const spans = await page.$$('span.tag');
  for (const span of spans) {
    const cl = await span.getAttribute('class');
    if (cl != null && !cl.split(" ").includes("visually-hidden")) {
      expect(await span.getAttribute('class')).toContain('selectable');
    }
  };
});

// To have attribute feature
test('All images on index has alternative text', async ({ page }) => {
  const images = await page.locator('img').all();
  for (const image of images) {
    const reg = RegExp('^(?!\\s*$).+')
    await expect(image).toHaveAttribute('alt', reg);
  }
});

// to have title feature
test('Has title', async ({ page }) => {
  await expect(page).toHaveTitle("Home | PolyJam");
});

// to have length feature
test('Index has header of level 1 with content "Home"', async ({ page }) => {
  const headers = await page.locator('h1').all();
  expect(headers).toHaveLength(1);
  await expect(headers[0]).toHaveText('Home');
});


test('Index has header of level 2 with correct content', async ({ page }) => {
  const headers = await page.locator('h2').all();
  expect(headers).toHaveLength(1);
  await expect(headers[0]).toHaveText('Here you can find all of the games of our website. Enjoy!');
});

test('Each card has header of level 3', async ({ page }) => {
  const cards = await page.locator('div.card').all();
  for (const card of cards) {
    const headers = await card.locator('h3').all();
    expect(headers).toHaveLength(1);
  }
});

test('Index page has empty satus bar', async ({ page }) => {
  const statusBar = await page.locator('p#statusBar');
  await expect(statusBar).toHaveText('');
});


test('Search action show correct status with enter key', async ({ page }) => {
  const searchBar = await page.getByPlaceholder("Search");
  expect(searchBar).not.toBeNull();
  await searchBar.click();
  await searchBar.fill('someSearch');
  await searchBar.press('Enter');
  const statusBar = await page.locator('p#statusBar');
  await expect(statusBar).toHaveText('Showing results for: someSearch');
});

test('Search action show correct status with click on search button', async ({ page }) => {
  const searchBar = await page.getByPlaceholder("Search");
  expect(searchBar).not.toBeNull();
  const searchButton = await page.locator('button#searchButton');
  expect(searchButton).not.toBeNull();
  await searchBar.click();
  await searchBar.fill('someSearch');
  await searchButton.click();
  const statusBar = await page.locator('p#statusBar');
  await expect(statusBar).toHaveText('Showing results for: someSearch');
});

// to have text feature and soft assertion
test('Click on tag shows correct status', async ({ page }) => {
  const tags = await (await page.locator('span.tag').all()).filter(async (tag) => {
    const cl = await tag.getAttribute('class');
    return !(cl != null ? cl.split(" ").includes("visually-hidden") : false);
  });
  expect(tags).not.toHaveLength(0);
  const tag = tags[Math.floor(Math.random() * tags.length)];
  await tag.click();
  const statusBar = await page.locator('p#statusBar');
  const tagText = await tag.innerText();
  await expect(statusBar).toHaveText(tagText + " games");
});

test('Click on tag shows only games that contais that tag', async ({ page }) => {
  const tags = await page.locator('span.tag').all();
  if (tags.length > 0) {
    let found = false;
    let tag;
    while (!found) {
      tag = tags[Math.floor(Math.random() * tags.length)];
      const cl = await tag.getAttribute('class');
      if (tag != null && !(cl.split(" ").includes("visually-hidden"))) {
        found = true;
      }
    }
    let tagText = await tag.innerText();
    await tag.click();
    const cards = await page.locator('div.card').all();
    for (const card of cards) {
      const style = await card.getAttribute('style');
      const allTags = await card.locator('span.tag').all();
      if (style != null && style.includes("display: none !important")) {
        for (const atag of allTags) {
          expect(await atag.innerText()).not.toBe(tagText);
        }
      } else {
        let found = false;
        for (const atag of allTags) {
          if (await atag.innerText() == tagText) {
            found = true;
          }
        }
        expect(found).toBe(true);
      }
    }
  }
});

test.describe('Favourite', () => {
  test('Adding a game to favourites', async ({ page }) => {
    const biStarIconList = await page.$$('span.bi-star');
    const games = await page.$$('h3.card-title');
    var cnt = 0;
    for (const biStarIcon of biStarIconList) {
      if (biStarIcon != null) {
        //Testing it the icon toggles correctly from bi-star to bi-star-fill
        const classAttribute = await biStarIcon.getAttribute('class');
        const isStarred = classAttribute?.includes('bi-star-fill') ?? false;
        await biStarIcon.click();

        const updatedClassAttribute = await biStarIcon.getAttribute('class');
        const isStarredAfterClick = updatedClassAttribute?.includes('bi-star-fill') ?? false;

        expect(isStarredAfterClick).toBe(!isStarred);

        //Testing if it updates value from false to true in localStorage
        const h3Text = await games[cnt].textContent();
        if (h3Text != null) {
          const isStarredInLocalStorage = await page.evaluate((key) => {
            return window.localStorage.getItem(key);
          }, h3Text);

          expect(isStarredInLocalStorage).toBe(isStarredAfterClick.toString());
        } else {
          expect(false).toBe(true);
        }
      } else {
        expect(false).toBe(true);
      }
      cnt++;
    }
  });

  test('Removing a game from favourites', async ({ page }) => {
    const biStarIconList = await page.$$('span.bi-star');
    //Toggling all icons from bi-star to bi-star-fill
    for (const biStarIcon of biStarIconList) {
      await biStarIcon.click();
    }
    const biStarFillIconList = await page.$$('span.bi-star-fill');
    const games = await page.$$('h3.card-title');
    var cnt = 0;
    for (const biStarFillIcon of biStarFillIconList) {
      if (biStarFillIcon != null) {
        //Testing it the icon toggles correctly from bi-star-fill to bi-star
        const classAttribute = await biStarFillIcon.getAttribute('class');
        const isStarred = classAttribute?.includes('bi-star-fill') ?? false;
        await biStarFillIcon.click();

        const updatedClassAttribute = await biStarFillIcon.getAttribute('class');
        const isStarredAfterClick = updatedClassAttribute?.includes('bi-star-fill') ?? false;

        expect(isStarredAfterClick).toBe(!isStarred);

        //Testing if it updates value from true to false in localStorage
        const h3Text = await games[cnt].textContent();
        if (h3Text != null) {
          const isNotStarredInLocalStorage = await page.evaluate((key) => {
            return window.localStorage.getItem(key);
          }, h3Text);

          expect(isNotStarredInLocalStorage).toBe(isStarredAfterClick.toString());
        } else {
          expect(false).toBe(true);
        }
      } else {
        expect(false).toBe(true);
      }
      cnt++;
    }
  });
});
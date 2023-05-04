import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("file://" + __dirname + "/../index.html");
});

test('clicking the empty favourite star icon toggles to a filled favourite star icon', async ({page}) => {
    const biStarIconList = await page.$$('i.bi-star');
    for (const biStarIcon of biStarIconList) {
        if (biStarIcon != null) {
            const classAttribute = await biStarIcon.getAttribute('class');
            const isStarred = classAttribute?.includes('bi-star-fill') ?? false;
            await biStarIcon.click();

            const updatedClassAttribute = await biStarIcon.getAttribute('class');
            const isStarredAfterClick = updatedClassAttribute?.includes('bi-star-fill') ?? false;
        expect(isStarredAfterClick).toBe(!isStarred);
        } else {
            expect(false).toBe(true);
        }
    }
});

test('clicking the filled favourite star icon toggles to aa empty favourite star icon', async ({page}) => {
    const biStarIconList = await page.$$('i.bi-star');
    for (const biStarIcon of biStarIconList) {
        await biStarIcon.click();
    }
    const biStarFillIconList = await page.$$('i.bi-star-fill');
    for (const biStarFillIcon of biStarFillIconList) {
        if (biStarFillIcon != null) {
            const classAttribute = await biStarFillIcon.getAttribute('class');
            const isNotStarred = !classAttribute?.includes('bi-star-fill') ?? false;
            await biStarFillIcon.click();

            const updatedClassAttribute = await biStarFillIcon.getAttribute('class');
            const isNotStarredAfterClick = !updatedClassAttribute?.includes('bi-star-fill') ?? false;
            expect(isNotStarredAfterClick).toBe(!isNotStarred);
        } else {
            expect(false).toBe(true);
        }
    }
});
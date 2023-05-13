// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("file://" + __dirname + "/../games/matchPairs/matchPairs.html");
});

test('Can type a comment', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Comment' }).click();
    await page.locator('#displayedName').click();
    await page.locator('#displayedName').fill('Pepe');
    await page.locator('#commentText').click();
    await page.locator('#commentText').fill('Pepe');
    await page.getByRole('button', { name: 'Submit' }).click();
    const comment = await page.getByText('Pepe8 de mayo de 2023, 14:21PepeEditDelete');
    if (comment == undefined)
        throw new Error("Comment was not added");
});

test('Cannot type a comment if empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Comment' }).click();
    await page.locator('#displayedName').click();
    await page.locator('#commentText').click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Submit' }).click();
})


test('Can delete last comment added', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Comment' }).click();
    await page.locator('#displayedName').click();
    await page.locator('#displayedName').fill('Pepe');
    await page.locator('#displayedName').press('Tab');
    await page.locator('#commentText').fill('Pepe');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
})
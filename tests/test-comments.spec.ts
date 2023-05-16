// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("file://" + __dirname + "/../games/matchPairs/matchPairs.html");
});

test('Can type a comment', async ({ page }) => {
    const exampleName = "Pepe";
    const exampleDescription = "Descripcion de ejemplo"

    await page.getByRole('button', { name: 'Add Comment' }).click();
    await page.locator('#displayedName').click();
    await page.locator('#displayedName').fill(exampleName);
    await page.locator('#commentText').click();
    await page.locator('#commentText').fill(exampleDescription);
    await page.getByRole('button', { name: 'Submit' }).click();
    const commentNode = await page.$("#parentDiv");
    const lastChild = await commentNode.$$eval(":scope > :last-child", nodes => nodes[0].textContent);

    expect(lastChild.includes(exampleName));
    expect(lastChild.includes(exampleDescription));
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
    const exampleName = "Pepe";
    const exampleDescription = "Descripcion de ejemplo"

    await page.getByRole('button', { name: 'Add Comment' }).click();
    await page.locator('#displayedName').click();
    await page.locator('#displayedName').fill(exampleName);
    await page.locator('#displayedName').press('Tab');
    await page.locator('#commentText').fill(exampleDescription);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
})
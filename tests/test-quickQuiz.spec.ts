// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("file://" + __dirname + "/../games/quiz/quiz.html");
});

//Test: Al inicio todas las imágenes son blank
test('Can start the game', async ({ page }) => {
    await page.frameLocator('#game-frame').getByRole('link', { name: 'Play' }).click();
});




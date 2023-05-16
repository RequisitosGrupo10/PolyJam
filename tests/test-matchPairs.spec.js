// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("file://" + __dirname + "/../games/matchPairs/matchPairs.html");
});

//Test: Al inicio todas las imágenes son blank
test('At first all the images are blank', async ({ page }) => {
    //
    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let arrayOfCards = await page.getByRole('img').all();

    for (let card of arrayOfCards) {
        expect(await card.getAttribute('alt')).toContain('value: blank');
        expect(await card.getAttribute('src')).toBe('js/images/blank.png');
    }
});

//Test: Al hacer click en una imagen, se da la vuelta
test('When clicking on an image it flips', async ({ page }) => {

    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card = await page.getByRole('img', { name: card1RegEx });

    await card.click();
    expect(await card.getAttribute('alt')).not.toContain('value: blank');
    expect(await card.getAttribute('src')).not.toBe('js/images/blank.png');
});

//Test: Si la dificultad es facil, al hacer click en dos imágenes, se espera 5 segundos antes de cambiar.
test('Having easy difficulty, when clicking on two images, it waits 5 seconds until revealing the result', async ({ page }) => {

    await page.selectOption("#difficulty", "Easy");

    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();

    await page.waitForTimeout(5000);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});

//Test: Si la dificultad es media, al hacer click en dos imágenes, se espera 1 segundo1 antes de cambiar.
test('Having medium difficulty, when clicking on two images, it waits 1 second until revealing the result', async ({ page }) => {

    await page.selectOption("#difficulty", "Medium");

    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();

    await page.waitForTimeout(1000);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});

//Test: Si la dificultad es alta, al hacer click en dos imágenes, se espera 500 milisegundos antes de cambiar.
test('Having high difficulty, when clicking on two images, it waits 500 milliseconds until revealing the result', async ({ page }) => {

    await page.selectOption("#difficulty", "Difficult");


    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();

    await page.waitForTimeout(500);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});

//Test: Al encontrar la pareja, se espera 500 milisegundos y se comprueba que ambas imágenes son white.
test('When finding the pair, both change to white', async ({ page }) => {

    await page.selectOption("#difficulty", "Difficult");

    let card1RegEx = RegExp("card number 1, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let srcCard1 = null;
    let srcCard2 = null;
    let i = 2;

    while (srcCard1 == null || srcCard1 != srcCard2) {

        let card2RegEx = RegExp("card number " + i + ", .*");
        let card2 = await page.getByRole('img', { name: card2RegEx });

        await card1.click();
        await card2.click();
        srcCard1 = await card1.getAttribute('src');
        srcCard2 = await card2.getAttribute('src');

        await page.waitForTimeout(500);

        if (srcCard1 == srcCard2) {
            expect(await card1.getAttribute('alt')).toBe("card number 1, value: white");
            expect(await card2.getAttribute('alt')).toBe("card number " + i + ", value: white");
            expect(await card1.getAttribute('src')).toBe("js/images/white.png");
            expect(await card2.getAttribute('src')).toBe("js/images/white.png");
        }
        i++;
    }

});

//Test: Al no encontrar la pareja, se espera 500 milisegundos y se comprueba que ambas imágenes son blank.
test('When not finding the pair, both change to blank', async ({ page }) => {

    await page.selectOption("#difficulty", "Difficult");

    let srcCard1 = null;
    let srcCard2 = null;
    let i = 2;

    while (srcCard1 == srcCard2) {
        let card1RegEx = RegExp("card number " + (i - 1) + ", .*");
        let card2RegEx = RegExp("card number " + i + ", .*");
        let card1 = await page.getByRole('img', { name: card1RegEx });
        let card2 = await page.getByRole('img', { name: card2RegEx });

        await card1.click();
        await card2.click();
        srcCard1 = await card1.getAttribute('src');
        srcCard2 = await card2.getAttribute('src');

        await page.waitForTimeout(500);

        if (srcCard1 != srcCard2) {
            expect(await card1.getAttribute('alt')).toBe("card number " + (i - 1) + ", value: blank");
            expect(await card2.getAttribute('alt')).toBe("card number " + i + ", value: blank");
            expect(await card1.getAttribute('src')).toBe("js/images/blank.png");
            expect(await card2.getAttribute('src')).toBe("js/images/blank.png");
        } else {
            if (i == 12) {
                await page.reload();
                i = 2;
            } else {
                i = i + 2;
            }
        }
    }
});

//Test: Al no encontrar la pareja, se espera 500 milisegundos y se comprueba que ambas imágenes son blank.
test('When completing the game, the score contains the result', async ({ page }) => {

    await page.selectOption("#difficulty", "Difficult");

    let srcCard1 = null;
    let srcCard2 = null;
    let i = 1;
    let j = 2;
    let arrayOfCards = [];
    let finished = false;
    while (!finished) {

        let card1RegEx = RegExp("card number " + i + ", .*");
        let card2RegEx = RegExp("card number " + j + ", .*");
        let card1 = await page.getByRole('img', { name: card1RegEx });
        let card2 = await page.getByRole('img', { name: card2RegEx });

        await card1.click();
        await card2.click();
        srcCard1 = await card1.getAttribute('src');
        srcCard2 = await card2.getAttribute('src');

        if (srcCard1 == srcCard2) {
            arrayOfCards[i] = "js/images/white.png";
            arrayOfCards[j] = "js/images/white.png";
        } else {
            arrayOfCards[i] = srcCard1;
            arrayOfCards[j] = srcCard2;
        }

        await page.waitForTimeout(500);

        if (arrayOfCards[12] == null) {
            i = i + 2;
            j = j + 2;
        } else {
            finished = true;
            let checkArray = 1;
            while (checkArray <= 12) {
                finished = finished && arrayOfCards[checkArray] == "js/images/white.png";
                checkArray++;
            }
            if (!finished) {
                while (arrayOfCards[i] == "js/images/white.png" || i == j) {
                    i++;
                    if (i == 13) {
                        i = 1;
                    }
                }
                while (arrayOfCards[j] != arrayOfCards[i] || i == j) {
                    j++;
                    if (j == 13) {
                        j = 1;
                    }
                }
            } 
        }
    }
    //Game finished
    let score = await page.getByText('Score:' );
    let congrats = "Congratulations! You found them all!";

    expect(await score.textContent()).toContain(congrats);

});

test('When completing the game, the modal of save Highscore is shown', async ({ page }) => {

    await page.selectOption("#difficulty", "Difficult");

    let srcCard1 = null;
    let srcCard2 = null;
    let i = 1;
    let j = 2;
    let arrayOfCards = [];
    let finished = false;
    while (!finished) {

        let card1RegEx = RegExp("card number " + i + ", .*");
        let card2RegEx = RegExp("card number " + j + ", .*");
        let card1 = await page.getByRole('img', { name: card1RegEx });
        let card2 = await page.getByRole('img', { name: card2RegEx });

        await card1.click();
        await card2.click();
        srcCard1 = await card1.getAttribute('src');
        srcCard2 = await card2.getAttribute('src');

        if (srcCard1 == srcCard2) {
            arrayOfCards[i] = "js/images/white.png";
            arrayOfCards[j] = "js/images/white.png";
        } else {
            arrayOfCards[i] = srcCard1;
            arrayOfCards[j] = srcCard2;
        }

        await page.waitForTimeout(500);

        if (arrayOfCards[12] == null) {
            i = i + 2;
            j = j + 2;
        } else {
            finished = true;
            let checkArray = 1;
            while (checkArray <= 12) {
                finished = finished && arrayOfCards[checkArray] == "js/images/white.png";
                checkArray++;
            }
            if (!finished) {
                while (arrayOfCards[i] == "js/images/white.png" || i == j) {
                    i++;
                    if (i == 13) {
                        i = 1;
                    }
                }
                while (arrayOfCards[j] != arrayOfCards[i] || i == j) {
                    j++;
                    if (j == 13) {
                        j = 1;
                    }
                }
            } 
        }
    }
    //Game finished

    let highScoreModal = await page.getByRole('dialog', { name: 'NEW HIGHSCORE!' }).locator('div').nth(2);
    //await page.getByLabel('Insert your name:').click();
    expect (await highScoreModal).toBeFocused;

});

test('When completing the game, writing the name and clicking savehighscore, the highscore is saved', async ({ page }) => {
    
    await page.selectOption("#difficulty", "Difficult");

    let srcCard1 = null;
    let srcCard2 = null;
    let i = 1;
    let j = 2;
    let arrayOfCards = [];
    let finished = false;
    while (!finished) {

        let card1RegEx = RegExp("card number " + i + ", .*");
        let card2RegEx = RegExp("card number " + j + ", .*");
        let card1 = await page.getByRole('img', { name: card1RegEx });
        let card2 = await page.getByRole('img', { name: card2RegEx });

        await card1.click();
        await card2.click();
        srcCard1 = await card1.getAttribute('src');
        srcCard2 = await card2.getAttribute('src');

        if (srcCard1 == srcCard2) {
            arrayOfCards[i] = "js/images/white.png";
            arrayOfCards[j] = "js/images/white.png";
        } else {
            arrayOfCards[i] = srcCard1;
            arrayOfCards[j] = srcCard2;
        }

        await page.waitForTimeout(500);

        if (arrayOfCards[12] == null) {
            i = i + 2;
            j = j + 2;
        } else {
            finished = true;
            let checkArray = 1;
            while (checkArray <= 12) {
                finished = finished && arrayOfCards[checkArray] == "js/images/white.png";
                checkArray++;
            }
            if (!finished) {
                while (arrayOfCards[i] == "js/images/white.png" || i == j) {
                    i++;
                    if (i == 13) {
                        i = 1;
                    }
                }
                while (arrayOfCards[j] != arrayOfCards[i] || i == j) {
                    j++;
                    if (j == 13) {
                        j = 1;
                    }
                }
            } 
        }
    }
    //Game finished

    let highScoreModal = await page.getByRole('dialog', { name: 'NEW HIGHSCORE!' }).locator('div').nth(2);
    await page.getByLabel('Insert your name:').fill("TestWithPlayWright");
    await page.getByRole('button', { name: 'Save highscore' }).click();
    expect(highScoreModal).not.toBeFocused;
    expect ((await page.locator('ol').allInnerTexts()).at(0)).toContain('TestWithPlayWright');
});




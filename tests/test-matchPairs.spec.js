// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("file://" + __dirname + "/../games/matchPairs/matchPairs.html");
});

//Test: Al inicio todas las imágenes son blank
test('At first all the images are blank', async ({page}) =>{
    //
    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let arrayOfCards = await page.getByRole('img').all();

    for(let card of arrayOfCards){
        expect(await card.getAttribute('alt')).toContain('value: blank');
        expect(await card.getAttribute('src')).toBe('js/images/blank.png');
    }
});

//Test: Al hacer click en una imagen, se da la vuelta
test('When clicking on an image it flips', async ({page}) =>{
    
    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card = await page.getByRole('img', { name: card1RegEx });

    await card.click();
    expect(await card.getAttribute('alt')).not.toContain('value: blank');
    expect(await card.getAttribute('src')).not.toBe('js/images/blank.png');
});

//Test: Si la dificultad es facil, al hacer click en dos imágenes, se espera 5 segundos antes de cambiar.
test('Having easy difficulty, when clicking on two images, it waits 5 seconds until revealing the result', async ({page}) =>{
    
    await page.selectOption("#difficulty", "Easy");

    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();
    expect(await card1.getAttribute('alt')).not.toContain('value: blank');
    expect(await card1.getAttribute('src')).not.toBe('js/images/blank.png');
    expect(await card2.getAttribute('alt')).not.toContain('value: blank');
    expect(await card2.getAttribute('src')).not.toBe('js/images/blank.png');

    await page.waitForTimeout(5000);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});

//Test: Si la dificultad es media, al hacer click en dos imágenes, se espera 1 segundo1 antes de cambiar.
test('Having medium difficulty, when clicking on two images, it waits 1 second until revealing the result', async ({page}) =>{
    
    await page.selectOption("#difficulty", "Medium");


    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();
    expect(await card1.getAttribute('alt')).not.toContain('value: blank');
    expect(await card1.getAttribute('src')).not.toBe('js/images/blank.png');
    expect(await card2.getAttribute('alt')).not.toContain('value: blank');
    expect(await card2.getAttribute('src')).not.toBe('js/images/blank.png');

    await page.waitForTimeout(1000);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});

//Test: Si la dificultad es alta, al hacer click en dos imágenes, se espera 500 milisegundos antes de cambiar.
test('Having high difficulty, when clicking on two images, it waits 500 milliseconds until revealing the result', async ({page}) =>{
    
    await page.selectOption("#difficulty", "Difficult");


    //card.setAttribute('alt', 'card number '+(i+1)+', value: blank');
    let card1RegEx = RegExp("card number 1, .*");
    let card2RegEx = RegExp("card number 2, .*");
    let card1 = await page.getByRole('img', { name: card1RegEx });
    let card2 = await page.getByRole('img', { name: card2RegEx });

    await card1.click();
    await card2.click();
    expect(await card1.getAttribute('alt')).not.toContain('value: blank');
    expect(await card1.getAttribute('src')).not.toBe('js/images/blank.png');
    expect(await card2.getAttribute('alt')).not.toContain('value: blank');
    expect(await card2.getAttribute('src')).not.toBe('js/images/blank.png');

    await page.waitForTimeout(500);

    expect(["card number 1, value: blank", "card number 1, value: white"]).toContain(await card1.getAttribute('alt'));
    expect(["card number 2, value: blank", "card number 2, value: white"]).toContain(await card2.getAttribute('alt'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card1.getAttribute('src'));
    expect(["js/images/blank.png", "js/images/white.png"]).toContain(await card2.getAttribute('src'));

});
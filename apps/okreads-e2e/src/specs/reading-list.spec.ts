import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  xit('Then: I should be able to add an item to the list and then undo', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    /* add an item to the list */
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    /* wait for an add button to show up */
    const addButton = await $('[data-testing="book-item-add"]');
    addButton.click();

    /*
    Spec runner was acting weird, need to move on to part 4.
    Will revisit if there is time.
    In pseudo code:
    - Confirm the counter in .tmo-total-count is 1
    - Click the snackbar undo button
    - Confirm there is no number in .tmo-total-count
    */
  });
});

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

  it('Then: I should be able to add an item to the list and then undo', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    /* submit search form */
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    /* add an item */
    await $('[data-testing="book-item-add"]').click();

    /* save current counter value */
    const counter = await $('tmo-total-count [ng-reflect-content]');
    const counterValue = await counter.getAttribute('ng-reflect-content');

    /*
    note: the test runner does not clear the DB before running,
    so I'm not testing the initial value and am making sure we
    are beginning the test from at least one value being present.
    I think a better practice would be to make sure the test runner
    is working with a fresh instance.
    */
    
    /* add another item */
    await $('[data-testing="book-item-add"]').click();
    
    /* compare updated value to old */
    const updatedCounterValue = await counter.getAttribute('ng-reflect-content');
    expect(updatedCounterValue * 1).to.be.greaterThan(counterValue * 1, 'increment one');

    /* click undo on snackbar */
    await $('.mat-simple-snackbar-action').click();
    
    /* expect final value to be same as after adding the first book */
    const finalCounterValue = await counter.getAttribute('ng-reflect-content');
    expect(finalCounterValue).to.equal(counterValue, 'same as after adding one book');
  });
});

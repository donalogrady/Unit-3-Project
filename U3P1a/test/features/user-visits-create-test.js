const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:

describe('create page', () => {
  describe('user can submit a form to add items to the collection', () => {
    it('user should submit items title, description and image URL', () => {
      //setup
      const item = buildItemObject();
      browser.url('/create.html');
      //exercise
      browser.setValue('#title-input',item.title);
      browser.setValue('#description-input',item.description);
      browser.setValue('#imageUrl-input',item.imageUrl);
      browser.click('#submit-button');
      //verify
      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);
    });
  });
});

const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET request', () => {
    it('renders empty input fields', async () => {
      //Setup
      //Exercise
      const response = await request(app)
      .get('/items/create');
      //Verify
  assert.equal(parseTextFromHTML(response.text, 'input#title-input'),'');
  assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'),'');
  assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');

    });
  });

  describe('POST request', () => {
    it('create new item then render it', async () => {
      //Setup
      const item = buildItemObject();
      //Exercise
      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(item);
      //Verify
      assert.include(parseTextFromHTML(response.text, '.item-title'), item.title);
      const imageElement = findImageElementBySource(response.text, item.imageUrl);
      assert.equal(imageElement.src, item.imageUrl);

    });
  });
});

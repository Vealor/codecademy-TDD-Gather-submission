const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders the single selected item', async () => {
      const seededItem = await seedItemToDatabase();
      const response = await request(app)
        .get('/items/'+seededItem._id);

      assert.include(parseTextFromHTML(response.text, 'p#item-title'), seededItem.title);
      assert.include(parseTextFromHTML(response.text, 'p#item-description'), seededItem.description);
    });
  }); 
});

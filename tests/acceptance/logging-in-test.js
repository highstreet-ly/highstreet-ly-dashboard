import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logging in', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /login', async function (assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');

    // var linkQuery = this.element.ownerDocument.evaluate("//a[contains(., 'Create one here')]", this.element.ownerDocument, null, XPathResult.ANY_TYPE, null);
    // var link = linkQuery.iterateNext();
    // link.click();
    // assert.equal(link === null, false)
  });
});

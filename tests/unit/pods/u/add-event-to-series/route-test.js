import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/add-event-to-series', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/add-event-to-series');
    assert.ok(route);
  });
});

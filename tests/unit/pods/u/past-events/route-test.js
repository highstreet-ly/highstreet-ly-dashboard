import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/past-events', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/past-events');
    assert.ok(route);
  });
});

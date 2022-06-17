import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/upcoming-events', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/upcoming-events');
    assert.ok(route);
  });
});

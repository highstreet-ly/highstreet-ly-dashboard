import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/event-instance/subscribables', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/event-instance/subscribables');
    assert.ok(route);
  });
});

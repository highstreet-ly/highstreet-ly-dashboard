import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/event-instance/subscribables/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/event-instance/subscribables/new');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/create-new-event', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/create-new-event');
    assert.ok(route);
  });
});

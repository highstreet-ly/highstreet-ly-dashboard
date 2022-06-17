import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | u/event-instance/products', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:u/event-instance/products');
    assert.ok(controller);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | request-reset-password', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:request-reset-password');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/admin/user-management', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/admin/user-management');
    assert.ok(route);
  });
});

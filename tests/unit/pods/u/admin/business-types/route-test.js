import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/admin/business-types', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/admin/business-types');
    assert.ok(route);
  });
});

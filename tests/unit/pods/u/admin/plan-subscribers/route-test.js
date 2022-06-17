import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/admin/plan-subscribers', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/admin/plan-subscribers');
    assert.ok(route);
  });
});

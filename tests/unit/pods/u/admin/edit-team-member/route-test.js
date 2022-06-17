import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/admin/edit-team-member', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/admin/edit-team-member');
    assert.ok(route);
  });
});

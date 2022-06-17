import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/basic-info', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/basic-info');
    assert.ok(route);
  });
});

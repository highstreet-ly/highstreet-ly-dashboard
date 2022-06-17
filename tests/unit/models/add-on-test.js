import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | add on', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('add-on', {});
    assert.ok(model);
  });
});

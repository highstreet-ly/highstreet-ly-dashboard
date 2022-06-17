import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | sonaticket-anon-ajax', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:sonaticket-anon-ajax');
    assert.ok(service);
  });
});

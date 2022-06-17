import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

class CurrentUser extends Service {
  emailHash = 'asdasd';
  firstLetter = 'a';
  email = 'asdasd@asdasd.asd';

  userModel = {
    userName: 'asd',
    avatarType: 0,
    uploadedAvatarId: 'asdasdasd',
  }

  eventOrganiser = {
    id: '8bc1fcf4-ca0e-4d5d-9b5f-6f0dd64a647e'
  }
}

module('Unit | Controller | u/upcoming-events', function(hooks) {
  setupTest(hooks);

  

  // Replace this with your real tests.
  test('it exists', function(assert) {
    this.owner.register('service:currentUser', CurrentUser);
    let controller = this.owner.lookup('controller:u/upcoming-events');
    assert.ok(controller);
  });
});

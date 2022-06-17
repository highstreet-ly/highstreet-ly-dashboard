import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
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
}


module('Integration | Component | forms/account-settings', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with 

    this.owner.register('service:currentUser', CurrentUser);


    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Forms::AccountSettings />`);

    assert.true(this.element !== null);

    // Template block usage:
    await render(hbs`
      <Forms::AccountSettings>
      </Forms::AccountSettings>
    `);

    assert.notEqual(this.element.textContent.trim(), '');

    assert.true(true);
  });
});

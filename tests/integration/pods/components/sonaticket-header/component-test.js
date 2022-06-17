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

  eventOrganiser = {
    id: '8bc1fcf4-ca0e-4d5d-9b5f-6f0dd64a647e'
  }
}

module('Integration | Component | sonaticket-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.owner.register('service:currentUser', CurrentUser);

    await render(hbs`<SonaticketHeader />`);

    // Template block usage:
    await render(hbs`
      <SonaticketHeader>
        template block text
      </SonaticketHeader>
    `);

    assert.notOk(this.element.textContent.trim().includes('template block text'));
  });
});

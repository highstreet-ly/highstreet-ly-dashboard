import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | reports/event-instance-stats', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Reports::EventInstanceStats />`);

    // Template block usage:
    await render(hbs`
      <Reports::EventInstanceStats>
        template block text
      </Reports::EventInstanceStats>
    `);

    assert.notOk(this.element.textContent.trim().includes('template block text'));
  });
});

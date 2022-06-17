import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tickets-summary', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TicketsSummary />`);

    // Template block usage:
    await render(hbs`
      <TicketsSummary>
        template block text
      </TicketsSummary>
    `);

    assert.notOk(this.element.textContent.trim().includes('template block text'));
  });
});

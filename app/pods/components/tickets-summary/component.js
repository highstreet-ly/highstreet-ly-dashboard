import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class TicketsSummary extends Component {
  @action
  async addTicketTier() {
      if(this._addTicketTierExternal){
          await this._addTicketTierExternal();
      }
  }
}

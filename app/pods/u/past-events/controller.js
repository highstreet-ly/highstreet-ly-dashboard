import Controller from '@ember/controller';
import moment from 'moment';
import Env from 'sonaticket-dashboard/config/environment';

export default Controller.extend({
  pastEventsQuery: null,

  init(){
    this._super(...arguments);
    this.pastEventsQuery = {
      fields: 'name,slug,event-count,is-published',
      page: {
        'size': Env.sonatribe.defaultPageSize,
        'number': 0
      },
      filter: {
        //'start-date': `lt:${new moment().format()}`,
        //'is-published': `eq:true`
      },
      sort: 'name'
    };
  }
});

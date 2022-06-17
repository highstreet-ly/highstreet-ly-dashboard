import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    sonaticketAjax;

    @service
    currentUser;

    @service()
    sonaticketSignalr;

    async model() {

        await this.currentUser.getStats();
        
        let eventSeries = await this.store.query('event-series', {
            filter: {
                'event-organiser-id': this.currentUser.eventOrganiser.id
            }
        });

        return {
            eventSeries: eventSeries.firstObject
        }
    }

    setupController(controller, models) {
        if (!this.currentUser.eventOrganiser) {
            controller.set('noOrganiser', true);
        }

        controller.set('organiser', this.currentUser.eventOrganiser);

        controller.set('futureEventsQuery', {
            fields: 'name,slug,is-published',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            },
            filter: {
                'event-series-id': models.eventSeries.id
                //'is-published': `eq:true`
            },
            sort: 'name'
        })
    }
}

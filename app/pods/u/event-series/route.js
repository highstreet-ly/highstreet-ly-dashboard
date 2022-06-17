import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class EventSeriesRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    @service
    currentUser;

    async model(params) {
        await this.currentUser.getStats();
        return await this.contextService._getEventSeriesBySlug(params.slug);
    }

    setupController(controller, model) {
        this.controller.set('eventSeries', model);
        this.controller.set('seriesEventsQuery', {
            // fields: {
            //     'event-instance': 'name,slug,event-count,is-published'
            // },
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            },
            filter: {
                'event-series-id': model.id,
                //'is-published': `eq:true`
            },
            sort: 'name'
        });
    }
}

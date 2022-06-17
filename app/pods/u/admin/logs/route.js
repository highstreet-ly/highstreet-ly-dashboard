import Route from '@ember/routing/route';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminLogsRoute extends Route {
    async model() {
        return this.store.query('management-log', {
            sort: '-raise-date',
            page: {
                size: Env.sonatribe.defaultPageSize,
                page: 1
            }
        });
    }
}

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceProductsCategoriesIndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  contextService;

  @service
  store;

  setupController(controller, model) {
    controller.set('loading', false)
    controller.set('eventInstance', this.contextService.eventInstance);
    controller.set('productCategoryQuery', {
      filter: `expr:equals(event-instance-id,'${this.contextService.eventInstance.id}')`,
      page: {
        'size': Env.sonatribe.defaultPageSize,
        'number': 0,
      },
      sort: 'sort-order',
    });
    controller.set('searchQuery', 'expr:and(equals(event-instance-id,\'' + this.contextService.eventInstance.id + '\'),FILTER)');
  }
}

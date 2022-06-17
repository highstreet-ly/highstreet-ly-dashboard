import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class PanelsEventsPanel extends Component {
  @service
  currentUser;

  @service
  eventInstancePublisher;

  @service
  store;

  @service
  router;

  @service
  contextService;

  pageSize = Env.sonatribe.defaultPageSize;
  pageNumber = null;
  recordCount = null;
  query = null;
  modelType = null;

  @computed
  get now() {
    return new Date();
  }

  async init() {
    super.init(...arguments);

    await this.currentUser.load();
    await this.loadPosts(1);

  }

  async loadPosts(getPageNumber) {

    // the user might not be an organiser yet:
    if (!this.currentUser.eventOrganiser || !this.currentUser.eventOrganiser.id) {
      return;
    }

    this.set('loading', true);
    //this.store.unloadAll(this.modelType);
    let q = this.query;

    q.page.number = getPageNumber;
    q.page.size = this.pageSize;

    if (this.modelType === 'event-series' && !await this.currentUser.isInRole('Admin')) {
      q.filter['event-organiser-id'] = this.currentUser.eventOrganiser.id;
    }

    this.set('query', q)

    let result = await this.store.query(this.modelType, this.query);

    this.set('events', result);

    this.setProperties({
      'recordCount': result.get('meta.total-resources'),
      'pageNumber': getPageNumber
    });

    this.set('loading', false);
    //this.$('[data-toggle="tooltip"]').tooltip();
  }

  async doSearchInternal(search) {
    this.set('loading', true);
    let q = this.query;
    q.filter['name'] = 'like:' + search;
    q.page.number = 1;

    let result = await this.store.query(this.modelType, this.query);

    this.set('events', result);

    this.setProperties({
      'recordCount': result.get('meta.total-resources')
    });
    this.set('loading', false);
  }

  @action
  async publishEvent(eventInstance) {
    this.eventInstancePublisher.publishEvent(eventInstance, this.contextService.eventSeries);
  }

  @action
  async unpublishEvent(eventInstance) {
    eventInstance.set('isPublished', false);
    await eventInstance.save();
    this.notifications.success(`${eventInstance.name} is now un-published`);
  }

  @action
  async getPage(getPageNumber) {
    this.loadPosts(getPageNumber);
  }

  @action
  setSort(sortBy) {
    this.set('sortBy', [sortBy])
  }

  @action
  navigateSeries(e) {
    this.set('loading', true);
    this.contextService.setSeries(e.slug);

    this.router.transitionTo("u.event-series", e.slug);
  }

  @action
  async navigateFirstInstanceInSeries(e) {
    this.set('loading', true);
    this.contextService.setSeries(e.slug);

    this.router.transitionTo("u.event-series", e.slug);
  }

  @action
  async navigateInstance(instance) {
    this.set('loading', true);
    this.contextService.set('eventInstance', instance);

    this.router.transitionTo("u.event-instance", instance.slug);
  }

  @action
  async doSearch(search) {
    debounce(this, this.doSearchInternal, search, 500);
  }

  @action
  async deleteEvent(e) {

    e.set('deleted', true)
    await e.save()
    await this.loadPosts(1);
  }
}

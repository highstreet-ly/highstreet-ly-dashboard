import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class OrdersPanel extends Component {
    @service
    currentUser;

    @service
    store;

    @service
    router;

    @service
    contextService;

    @service
    eventBus;

    viewOrderVisible = false;
    pageSize = Env.sonatribe.defaultPageSize;
    pageNumber = null;
    recordCount = null;
    query = null;
    commandType = null;

    constructor() {
        super(...arguments);
        this.imageOptions = "w_80";
        this.foundDraftOrders = {};
    }

    async init() {
        super.init(...arguments);

        // if (!this.get('isMobile.any')) {
        //     this.set('pageSize', 10)
        // }

        if (!isEmpty(this.commandType)) {
            this.commandType.split(',').forEach((cmd) => this.eventBus.subscribe(cmd, this, this.handleUpdate))
        }

        await this.loadPosts(1);
    }

    willDestroyElement() {
        try {
            this.commandType.split(',').forEach((cmd) => this.eventBus.unsubscribe(cmd, this, this.handleUpdate))
        } catch {

        }
        super.willDestroyElement(...arguments);
    }

    handleUpdate() {
        this.loadPosts(1);
    }

    async loadPosts(getPageNumber) {
        this.set('loading', true);
        let q = this.query || {};
        this.set('originalQuery', q);
        q.page = {};
        q.page.number = getPageNumber;
        q.page.size = this.pageSize;

        this.set('query', q);

        let result = await this.store.query('order', this.query);

        this.set('orders', result);

        this.setProperties({
            'recordCount': result.get('meta.total-resources'),
            'pageNumber': getPageNumber
        });
        this.set('loading', false);
    }

    async doSearchInternal(search) {
        this.set('loading', true);
        let q = this.query;

        if (search) {
            q.filter = `${q.filter.slice(0, -1)},startsWith(human-readable-id,'${search}'))`
        }else{
            q.filter = this.originalQuery.filter
        }

        // q.filter['human-readable-id'] = 'like:' + search;
        q.page.number = 1;

        let result = await this.store.query('order', this.query);

        this.set('orders', result);

        this.setProperties({
            'recordCount': result.get('meta.total-resources')
        });

        this.set('loading', false);
    }



    @action
    closeOrderModal() {
        let viewOrderModal = this.element.querySelector('#viewOrderModal');
        viewOrderModal.style.display = "none";
        viewOrderModal.className = "modal fade";
    }

    @action
    async viewOrder(order) {
        this.set('viewOrderVisible', true);
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
    async doSearch(search) {
        debounce(this, this.doSearchInternal, search, 500);
    }
}

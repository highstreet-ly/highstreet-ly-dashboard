import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import Env from 'sonaticket-dashboard/config/environment';
import { uniqBy } from '@ember/object/computed';

export default class PanelsUsersPanelComponent extends Component {
    @service
    currentUser;

    @service
    store;

    @service
    router;

    @service
    contextService;

    viewOrderVisible = false;
    pageSize = Env.sonatribe.defaultPageSize;
    pageNumber = 0;
    recordCount = null;
    query = null;

    constructor() {
        super(...arguments);
        this.imageOptions = "w_80";
        this.foundDraftOrders = {};
    }

    async init() {
        super.init(...arguments);
        this.loadPosts(1);
    }

    @uniqBy('users', 'user.id') uniqueUsers;

    async loadPosts(getPageNumber) {
        this.set('loading', true);
        let q = this.query || {};
        this.set('originalQuery', q.filter);

        q.page.number = getPageNumber;
        q.page.size = this.pageSize;

        this.set('query', q);

        let result = await this.store.query('claim', this.query);

        this.set('users', result);

        this.setProperties({
            'recordCount': result.get('meta.total-resources'),
            'pageNumber': getPageNumber
        });
        this.set('loading', false);
    }

    async doSearchInternal(search) {
        this.set('loading', true);
        let q = this.query;
      
        q.page.number = 1;

        if (search) {
            q.filter = `expr:and(equals(claim-type,'member-of-eoid'),startsWith(user.email,'${search}'))`
        }else{
            q.filter = this.originalQuery
        }

        let result = await this.store.query('claim', this.query);

        this.set('users', result);

        this.setProperties({
            'recordCount': result.get('meta.total-resources')
        });

        this.set('loading', false);
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

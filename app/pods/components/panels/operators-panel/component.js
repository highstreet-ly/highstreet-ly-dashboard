import { inject as service } from '@ember/service'
import Component from '@ember/component'
import { action } from '@ember/object'
import { debounce } from '@ember/runloop'
import Env from 'sonaticket-dashboard/config/environment';

export default class PanelsOperatorsPanelComponent extends Component {
    @service
    currentUser

    @service
    store

    @service
    router

    @service
    contextService

    viewOrderVisible = false
    pageSize = Env.sonatribe.defaultPageSize
    pageNumber = null
    recordCount = null
    query = null
    search = '';

    constructor() {
        super(...arguments)
        this.imageOptions = "w_80"
        this.foundDraftOrders = {}
    }

    async init() {
        super.init(...arguments)
        this.loadPosts(1)
    }

    async loadPosts(getPageNumber) {
        this.set('loading', true)
        let q = this.query || {}
        q.page = {}
        q.page.number = getPageNumber
        q.page.size = this.pageSize

        this.set('query', q)

        let result = await this.store.query('event-organiser', this.query)

        this.set('eventOrganisers', result)

        this.setProperties({
            'recordCount': result.get('meta.total-resources'),
            'pageNumber': getPageNumber
        })
        this.set('loading', false)
    }

    async doSearchInternal(search) {
        this.set('loading', true)
        let q = this.query
        q.filter = {}
       
        q.filter['name'] = 'like:' + search
        q.page.number = 1

        let result = await this.store.query('event-organiser', this.query)

        this.set('eventOrganisers', result)

        this.setProperties({
            'recordCount': result.get('meta.total-resources')
        })

        this.set('loading', false)
    }

    @action
    async getPage(getPageNumber) {
        this.loadPosts(getPageNumber)
    }

    @action
    setSort(sortBy) {
        this.set('sortBy', [sortBy])
    }

    @action
    async doSearch(search) {
      console.log("mou");
        debounce(this, this.doSearchInternal, search, 500)
    }
}

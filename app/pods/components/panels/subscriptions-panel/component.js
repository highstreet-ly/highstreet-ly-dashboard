import { inject as service } from '@ember/service'
import Component from '@ember/component'
import { action } from '@ember/object'
import { debounce } from '@ember/runloop'
import Env from 'sonaticket-dashboard/config/environment';

export default class PanelsSubscriptionsPanelComponent extends Component {
    @service
    currentUser

    @service
    store

    @service
    router

    @service
    contextService

    pageSize = Env.sonatribe.defaultPageSize
    pageNumber = null
    recordCount = null
    query = null


    async init() {
        super.init(...arguments)

        // if (!this.get('isMobile.any')) {
        //     this.set('pageSize', 10)
        // }

        this.loadPosts(1)
    }

    async loadPosts(getPageNumber) {
        this.set('loading', true)
        let q = this.query || {}
        q.page = {}
        q.page.number = getPageNumber
        q.page.size = this.pageSize

        this.set('query', q)

        let result = await this.store.query('subscription', this.query)

        result.forEach(sub => {
            sub.user = this.store.findRecord('user', sub.userId)
        })

        this.set('subscriptions', result)

        this.setProperties({
            'recordCount': result.get('meta.total-resources'),
            'pageNumber': getPageNumber
        })
        this.set('loading', false)
    }

    async doSearchInternal(search) {
        this.set('loading', true)
        let q = this.query
        let f = q.filter // `expr:equals(plan-id,'${model.id}')`
        q.filter = `expr:and(equals(plan-id,'${this.planId}'),startsWith(user-email,'${search}'))`
        q.page.number = 1

        let result = await this.store.query('subscription', this.query)

        this.set('subscriptions', result)

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
        debounce(this, this.doSearchInternal, search, 500)
    }
}

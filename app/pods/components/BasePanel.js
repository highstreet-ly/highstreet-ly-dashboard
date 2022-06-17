import { inject as service } from '@ember/service'
import Component from '@ember/component'
import { action } from '@ember/object'
import { tracked } from "@glimmer/tracking"
import { debounce } from '@ember/runloop'
import { isEmpty } from '@ember/utils'

export default class BasePanel extends Component {
    @service
    notifications

    @service
    currentUser

    @service
    store

    @service
    router

    @service
    contextService

    // the name of the model to apply the data to
    modelName

    // the formattable search query
    searchQuery

    // the full, initial query
    query

    // the endpoint to query
    endpoint

    // the search property
    searchProperty

    async init() {
        super.init(...arguments);
        this.loadPosts(1);
    }

    async loadPosts(getPageNumber) {
        this.set('loading', true)
        let q = this.query

        q.page.number = getPageNumber
        q.page.size = this.pageSize

        this.set('query', q)

        let result = await this.store.query(this.endpoint, this.query)

        this.set(this.modelName, result.toArray())

        this.setProperties({
            'recordCount': result.get('meta.total-resources'),
            'pageNumber': getPageNumber
        })

        this.set('loading', false)
    }

    async doSearchInternal(search) {
        this.set('loading', true)

        let q = this.query

        let s = this.searchQuery

        if (this.queryBuilder && typeof this.queryBuilder === 'function') {
          this.queryBuilder(search, q)

        } else {
            var operator = `startsWith(${this.searchProperty},'${search}')`
            s = s.replace(new RegExp('FILTER', 'g'), operator)
            q.filter = s
        }
        
        q.page.number = 1

        let result = await this.store.query(this.endpoint, this.query)

        this.set(this.modelName, result.toArray())

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
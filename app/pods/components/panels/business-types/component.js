import { inject as service } from '@ember/service'
import Component from '@ember/component'
import { action } from '@ember/object'
import { debounce } from '@ember/runloop'
import Env from 'sonaticket-dashboard/config/environment';

export default class PanelsBusinessTypesComponent extends Component {
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
    search = ''

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

        let result = await this.store.query('business-type', this.query)

        this.set('businessTypes', result)

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

        let result = await this.store.query('business-type', this.query)

        this.set('businessTypes', result)

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

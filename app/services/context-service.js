import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    store: service(),

    // clear down the context
    reset() {
        this.set('eventInstance', null);
        this.set('eventSeries', null)
    },

    // reload event instance and series based on what we have selected
    async reload() {

        if (this.currentInstanceSlug) {
            let eventInstance = await this._getEventInstanceBySlug(this.currentInstanceSlug)
            this.set('eventInstance', eventInstance);
        }

        if (this.currentSeriesSlug) {
            let eventSeries = await this._getEventSeriesBySlug(this.currentSeriesSlug)
            this.set('eventSeries', eventSeries);
        }
    },

    // set the current selected event series
    async setSeries(slug) {
        if (this.currentSeriesSlug !== slug) {
            let eventSeries = await this._getEventSeriesBySlug(slug);
            this.set('eventSeries', eventSeries);
            this.set('currentSeriesSlug', slug);
        }
    },

    setEditingProduct(p) {
        this.set('editingProduct', p);
    },

    resetEditingProduct() {
        this.set('editingProduct', undefined)
    },

    // set the current selected event instance - and also the series
    async setInstance(slug) {
        if (this.currentInstanceSlug !== slug) {
            let eventInstance = await this._getEventInstanceBySlug(slug);
            let eventSeries = await this._getEventSeriesById(eventInstance.eventSeriesId);

            this.set('eventInstance', eventInstance);
            this.set('eventSeries', eventSeries);
            this.set('currentSeriesSlug', eventSeries.slug);
            this.set('currentInstanceSlug', slug);
        }
    },

    async _getEventInstancesForSeriesBySeriesId(id) {
        return await this.store.query('event-instance', {
            filter: {
                'event-series-id': id
            },
            include: 'features'
        });

    },

    async _getEventInstanceBySlug(slug) {
        let eventInstanceQuery = await this.store.query('event-instance', {
            filter: {
                slug: slug
            },
            include: 'features'
        });

        return eventInstanceQuery.firstObject;
    },

    async _getEventSeriesBySlug(slug) {
        let eventSeriesQuery = await this.store.query('event-series', {
            filter: {
                slug: slug
            },
        });

        return eventSeriesQuery.firstObject;
    },

    async _getEventSeriesById(id) {
        return await this.store.findRecord('event-series', id);
    }
});

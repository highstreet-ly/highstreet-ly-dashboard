import DS from 'ember-data';
const { Model } = DS;
import { attr } from '@ember-data/model';
import { computed, get } from '@ember/object';
import ENV from 'sonaticket-dashboard/config/environment';
import moment from 'moment';

export default Model.extend({
    name: attr(),
    normalizedName: attr('string'),
    description: attr('string'),
    slug: attr('string'),

    eventCount: attr('number'),
    eventInstances: DS.hasMany('event-instance', { async: true }),
    isPublished: attr('boolean'),
    ownerId: attr('string'),
    mainImageId: attr('string'),
    heroImageId: attr('string'),
    eventOrganiserId: attr('string'),
    images: DS.hasMany('image'),

    url: computed('slug', function () {
        let url = ENV.sonatribe.TicketsUi + '/tour/' + this.slug;
        return url.replace(/^https?:\/\//, '');
    }),
});

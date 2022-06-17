import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

@classic
export default class CreateNewEventController extends Controller {
    @service
    notifications;

    @service
    router;

    @service
    currentUser;

    saving = false;

    @action
    async saveNew(eventInstance) {
        this.set('loading', true);
        this.set("eventDatePast", false);
        this.set("eventNameExists", false);

        let existingEvent = await this.store.query('event-series', {
            filter: {
                name: eventInstance.name
            }
        });

        if (existingEvent.length > 0) {
            this.set("eventNameExists", true);
            this.set('loading', false);
            return;
        }

        this.eventSeries.set('name', eventInstance.name);
        this.eventSeries.set('ownerId', this.currentUser.user.sub);
        this.eventSeries.set('eventOrganiserId',  this.currentUser.eventOrganiser.id);

        await this.eventSeries.save();

        // Set the series ID
        eventInstance.set('eventSeriesId', this.eventSeries.id);
        eventInstance.set('ownerId', this.currentUser.user.sub);
        eventInstance.set('eventOrganiserId',  this.currentUser.eventOrganiser.id);


        // Save
        await eventInstance.save();

        //Manually assign the EventSeries object to workaround an issue with instances not being associated without a page reload
        this.set('eventInstance.eventSeries', this.eventSeries);

        //notify
        //this.messageBus.publish('event-instance-created');

        // Redirect
        this.set('loading', false);
        this.notifications.success('Date Added', { autoClear: true });

        this.set('addDateVisible', false);

        

        this.router.transitionTo('u.event-series', this.eventSeries.slug);
    }
}

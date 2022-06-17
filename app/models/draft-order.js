import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DraftOrderModel extends Model {
    @attr('string')
    eventInstanceId;

    @attr('date')
    reservationExpirationDate;

    @attr('raw')
    draftOrderItems;

    @attr('number')
    state;

    @attr('string')
    ownerEmail;
    
    @tracked
    ticketTypeModel;

    @computed('state')
    get stateAsString() {
        switch (this.state) {
            case 0:
                return 'Pending Reservation';
            case 1:
                return 'Partially Resevered';
            case 2:
                return 'Reservation Complete';
            case 3:
                return 'Rejected';
            case 4:
                return 'Confirmed';
            case 5:
                return 'Expired';
            default: 
                return 'Expired';
        }
    }
}

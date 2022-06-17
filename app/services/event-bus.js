import Service from '@ember/service';
import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';

var EventBus = EmberObject.extend(Evented, {

})

export default class EventBusService extends Service {
    internalBus = EventBus.create()

    publish() {
        console.log(arguments)
        return this.internalBus.trigger.apply(this, arguments);
    }

    /*
     * Subscribe to an event from the event bus
     */

    subscribe() {
        return this.internalBus.on.apply(this, arguments);
    }

    /*
     * Unsubscribe to an event from the event bus
     */

    unsubscribe() {
        return this.internalBus.off.apply(this, arguments);
    }
}


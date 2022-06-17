import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class BasicInfoController extends Controller {
    env = Env;

    @service
    currentUser;
    
    @service
    notifications;

    allLetter(inputtxt) {
        var letters = /^[A-Za-z]+$/;
        if (inputtxt.match(letters)) {
            return true;
        }
        else {
            return false;
        }
    }

    async isUniqueVanityUrl(url) {
        let exists = await this.store.query('event-organiser', {
            filter: {
                url: url,
                id: `ne:${this.organiser.id}`
            }
        });

        return exists.length === 0;
    }

    @action
    selectSchema(schema){
        this.organiser.set('schemaType', schema);
    }

    @action
    async save() {
        if (this.organiser.url) {
            if (!this.allLetter(this.organiser.url)) {
                this.set('invalidUrl', true);
                return;
            } else {
                this.set('invalidUrl', false);
            }

            if(!this.isUniqueVanityUrl(this.organiser.url)){
                this.set('duplicateUrl', true);
                return;
            }else{
                this.set('duplicateUrl', false);
            }
        }

        this.set('saving', true);
        await this.organiser.save();
        this.set('saving', false);
        this.notifications.success('Organisationn info saved', { autoClear: true });
    }
}

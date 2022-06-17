import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UAdminFeatureEditController extends Controller {
    @service
    notifications;

    saving = false;

    @action
    async save() {
        this.set('saving', true)
        await this.feature.save()
        this.set('saving', false)
        this.notifications.success('Feature info saved', { autoClear: true });
    }
}

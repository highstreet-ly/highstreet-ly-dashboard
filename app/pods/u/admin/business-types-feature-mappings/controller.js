import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';

export default class UAdminBusinessTypesFeatureMappingsController extends Controller {

    @service
    notifications;

    @tracked
    saving

    @action
    async toggleFeature(feature) {
        this.saving = true
        var features = await this.featureTemplate.get('features')

        var existing = features.findBy('id', feature.id)

        if (!existing) {
            features.pushObject(feature)
        } else {
            features.removeObject(feature)
        }

        this.featureTemplate.set('features', features)
        await this.featureTemplate.save()
        this.saving = false

        this.notifications.success('Feature info saved', { autoClear: true });
    }

    @action
    async togglePublished() {
        this.saving = true
        this.businessType.set('isPublished', !this.businessType.isPublished)
        await  this.businessType.save()

        this.saving = false
        this.notifications.success('Business type info saved', { autoClear: true });
    }

    @action
    async save() {
        this.saving = true
        await this.businessType.save()
        this.saving = false
        this.notifications.success('Business Type info saved', { autoClear: true });
    }
}

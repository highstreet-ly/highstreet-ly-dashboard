import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UEventInstanceFeaturesController extends Controller {
    @tracked
    eventInstance

    @action
    async toggleEventInstanceIsStockManaged() {
        this.eventInstance.set('isStockManaged', !this.eventInstance.isStockManaged)
        await this.eventInstance.save()
    }

    @action
    async toggleFeature(feature) {
        var features = await this.eventInstance.get('features')

       var existing = features.findBy('id', feature.id)
       
        if(!existing){
            features.pushObject(feature)
        }else{
            features.removeObject(feature)
        }

        this.eventInstance.set('features', features)
        this.eventInstance.save()
    }

    @computed('eventInstance.isStockManaged')
    get buttonClass() {

        if(this.eventInstance.isStockManaged){
            return 'btn-success'
        }else{
            return 'btn-danger'
        }
    }
}

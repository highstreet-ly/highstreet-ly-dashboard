import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class UAdminAddOnEditController extends Controller {
    @action
    async toggleFeature(feature) {
        var features = await this.addOn.get('features')

       var existing = features.findBy('id', feature.id)
       
        if(!existing){
            features.pushObject(feature)
        }else{
            features.removeObject(feature)
        }

        this.addOn.set('features', features)
        await this.addOn.save()
    }
}

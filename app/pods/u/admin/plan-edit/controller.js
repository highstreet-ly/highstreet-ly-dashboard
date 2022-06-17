import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class UAdminPlanEditController extends Controller {

    @action
    async togglePlanPubliclyVisible(){
        this.plan.set('publiclyVisible', !this.plan.publiclyVisible)
        await this.plan.save()
    }

    @action
    async toggleFeature(feature) {
        var features = await this.plan.get('features')

       var existing = features.findBy('id', feature.id)
       
        if(!existing){
            features.pushObject(feature)
        }else{
            features.removeObject(feature)
        }

        this.plan.set('features', features)
        this.plan.save()
    }
}

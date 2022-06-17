import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { notEmpty, filter } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class FeatureToggleComponent extends Component {

    @tracked
    parentFeatures

    @filter('parentFeatures', function (f) {
        return f.id == this.args.feature.id
    }) filteredparentFeatures

    @notEmpty('filteredparentFeatures') parentDoesNotHaveFeature

    constructor() {
        super(...arguments);
        this.args.parent.get('features').then((f) => {
            this.parentFeatures = f
        })
    }

    get featureName() {
        return this.args.feature.name
    }

    get parentName() {
        return this.args.parent.name
    }

    @computed('parentDoesNotHaveFeature')
    get buttonClass() {

        if(this.parentDoesNotHaveFeature){
            return 'btn-success'
        }else{
            return 'btn-danger'
        }
    }
}

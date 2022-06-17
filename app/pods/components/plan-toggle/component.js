import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class PlanToggleComponent extends Component {
    @computed('args.plan.publiclyVisible')
    get buttonClass() {
        if(this.args.plan.publiclyVisible){
            return 'btn-success'
        }else{
            return 'btn-danger'
        }
    }
}

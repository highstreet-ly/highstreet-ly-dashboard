import Component from '@glimmer/component'
import { computed } from '@ember/object'

export default class BusinessTypeToggleComponent extends Component {
    @computed('args.businessType.isPublished')
    get buttonClass() {
        if(this.args.businessType.isPublished){
            return 'btn-success'
        }else{
            return 'btn-danger'
        }
    }
}

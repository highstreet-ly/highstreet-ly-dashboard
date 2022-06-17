import Component from '@glimmer/component'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import { isEmpty } from '@ember/utils'
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class FormsSubscribableFormComponent extends Component {

    @service notifications
    @service router
    @service quill

    maxCharCount = 500

    @tracked
    delta

    @tracked
    price

    constructor() {
        super(...arguments)
        later(this, () => {
            var delta = this.quill.instances['subscribable-description-editor'].clipboard.convert(this.args.plan.description);
            this.delta = delta
        }, 1000)

        if(this.args.plan){
            this.price = this.args.plan.price / 100
        }

    }

    @computed('args.plan.periodUnit')
    get isWeekly(){
        return this.args.plan.periodUnit === 'week'
    }

    @computed('args.plan.periodUnit')
    get isMonthly(){
        return this.args.plan.periodUnit === 'month'
    }

    @action
    onPeriodChange(period){
        this.args.plan.set('periodUnit', period)
    }

    @action
    updateText() {
        let len = this.quill.getLength('subscribable-description-editor');
        if (len > this.maxCharCount) {
            this.quill.deleteText('subscribable-description-editor', 499, len);
        }
    }

    @action
    async save() {
        let plan = this.args.plan
        plan.set('price', this.price * 100)
        plan.set('description', this.quill.instances["subscribable-description-editor"].root.innerHTML.trim())

        if (isEmpty(plan.name)) {
            this.notifications.error('Name is required', { autoClear: true })
            return
        }

        if (isEmpty(plan.description)) {
            this.notifications.error('Description is required', { autoClear: true })
            return
        }

        await plan.save()
        this.router.transitionTo('u.event-instance.subscribables')

    }

    @action
    cancelSave() {
        this.router.transitionTo('u.event-instance.subscribables')
    }
}

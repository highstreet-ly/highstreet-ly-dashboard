import Route from '@ember/routing/route';

export default class UAdminAddOnsRoute extends Route {
    async model(){
        return this.store.query('add-on', {})
    }
}

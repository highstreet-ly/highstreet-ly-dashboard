import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    session: service(),
    
    redirect: function () {
        if (!this.session.isAuthenticated) {
            this.transitionTo('login');
        } else {
            
            this.transitionTo('u.index');
        }
    }
});

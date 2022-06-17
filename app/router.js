import EmberRouter from '@ember/routing/router'
import config from 'sonaticket-dashboard/config/environment'

export default class Router extends EmberRouter {
    location = config.locationType
    rootURL = config.rootURL
}

Router.map(function () {
    this.route('login')
    this.route('u', function () {
        this.route('payment-methods', function () {
            this.route('callback')
        })
        this.route('basic-info')
        this.route('data-protection')
        this.route('upcoming-events', { path: '/delivery-services' })
        this.route('past-events')
        this.route('create-new-event', { path: '/create-new-service' })

        this.route('event-instance', { path: '/service-list/:slug' }, function () {
          this.route('info')
          this.route('widget')

          this.route('products', function () {
            this.route('new')
            this.route('edit', { path: '/:productId/edit' })

            this.route('extras-group', function () {
                this.route('new' , { path: '/:productId/edit/extras-group/new' })
                this.route('edit', { path: '/:productId/edit/extras-group/:extraGroupId/edit' });
            })
            this.route('categories', function() {
              this.route('new');
              this.route('edit', { path: '/:categoryId/edit' })
            });
          })




          this.route('orders', function () {
              this.route('view', { path: '/:orderId/edit' })
              this.route('doing')
              this.route('done')
              this.route('priced')
              this.route('expired')
              this.route('refunded')
              this.route('issue-refund', { path: '/:orderId/issue-refund' })
          })
          this.route('stats')
          this.route('fees')
          this.route('subscribables', function () {
              this.route('new')
              this.route('edit', { path: '/:planId/edit' })
              this.route('subscribers', { path: '/:planId/subscribers' })
          })
          this.route('features');
        })
        this.route('reports')
        this.route('event-series', { path: '/delivery-service/:slug' })
        this.route('add-event-to-series', { path: '/add-event-to-series/:slug' })
        this.route('account-settings')

        this.route('admin', function () {
          this.route('onboarding', function () { })
          this.route('operators', function () {
              this.route('view', { path: '/:id' })
          })
          this.route('team', function () { })
          this.route('view-team-member', { path: '/team/:id' })
          this.route('add-team-member')
          this.route('edit-team-member', { path: '/team/:id/edit' })
          this.route('user-management')
          this.route('plans', function () { })
          this.route('plan-edit', { path: '/plans/:id/edit' })
          this.route('plan-subscribers', { path: '/plans/:id/subscribers' })
          this.route('subscription', { path: '/plans/:id/subscribers/:subId' })
          this.route('features')
          this.route('feature-edit', { path: '/features/:id/edit' })
          this.route('add-on-edit', { path: '/add-ons/:id/edit' })
          this.route('add-ons')
          this.route('logs');
          this.route('business-types');
          this.route('business-types-feature-mappings', { path: '/business-types/:id/mappings' });
        })
        this.route('subscription')
    })
    this.route('callback')
    this.route('resetpassword')
    this.route('request-reset-password')
    this.route('confirmemail')

    // this.route('payment-integrations', function() {})
    this.route('register')
})

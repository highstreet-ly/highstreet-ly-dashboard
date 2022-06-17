import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default class EventInstanceProductsNewRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service contextService
    @service store

    async model() {
        await this.modelFor('u.event-instance')
        let newProduct

        if (!this.contextService.editingProduct) {
            newProduct = this.store.createRecord('ticket-type-configuration', {
                eventSlug: this.contextService.eventInstance.slug,
                eventInstanceId: this.contextService.eventInstance.id,
                isPublished: false,
            })

            this.contextService.setEditingProduct(newProduct)
        } else {
            newProduct = this.contextService.editingProduct
        }

        return {
            product: newProduct,

            products: await this.store.query('ticket-type-configuration', {
                filter: {
                    'event-instance-id': this.contextService.eventInstance.id
                },
                include: 'product-extra-groups.product-extras'
            }),
            productCategories: await this.store.query('product-category', {
                filter: {
                    'event-instance-id': this.contextService.eventInstance.id
                },
                sort: 'sort-order'
            })
        }
    }

    setupController(controller, model) {

        let allGroups = []

        for (let i = 0; i < model.products.length; i++) {
            let p = model.products.objectAt(i)
            let eg = p.productExtraGroups

            eg.forEach(g => {
                allGroups.push(g)
            })
        }

        controller.set('allGroups', allGroups)
        controller.set('product', model.product)
        controller.set('products', model.products)
        controller.set('eventInstance', this.contextService.eventInstance)
        controller.set('searchQuery', "expr:and(equals(event-instance-id,'" + this.contextService.eventInstance.id + "'),startsWith(name,'NAME'))")
        controller.set('productCategories', model.productCategories)
    }
}

import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import BasePanel from '../../BasePanel';
import Env from 'sonaticket-dashboard/config/environment';
import { tracked } from "@glimmer/tracking";
import { sort } from '@ember/object/computed';

export default class PanelsComponent extends BasePanel {

  @tracked
  reorderMode = false;

  @tracked
  loading = false;

  modelName = 'plans';
  endpoint = 'plan';
  searchProperty = 'name';
  pageSize = Env.sonatribe.defaultPageSize;

  @service
  currentUser;

  sortBy = ['sortOrder'];
  @sort('plans', 'sortBy')
  sortedPlans;

  async init() {
    super.init(...arguments);
    this.set('eventOrganserId', this.currentUser.eventOrganiser.id);
  }

  @action
  reordered() {
    this.plans.forEach(function (plan, i) {
      plan.sortOrder = i;
    });
  }

  @action
  async save() {
    this.loading = true

    await this.plans.forEach(async function (plan) {
      await plan.save();
    });

    this.loading = false;
    this.reorderMode = false;
  }

  @action
  async cancel() {
    await this.plans.forEach(async function (plan) {
      await plan.rollbackAttributes();
    });
    this.reorderMode = false;
  }
}

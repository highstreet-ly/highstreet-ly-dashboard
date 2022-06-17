import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import Env from "sonaticket-dashboard/config/environment";
import moment from 'moment';

export default class PanelsLogsPanelComponent extends Component {
  @service
  store

  @tracked
  showLog = false;

  @tracked
  selectedSource = "management-log";

  @tracked
  selectedLogLevel = "All";

  @tracked
  selectedTimeFilter = "Last 5 Minutes";

  selectedTimeFilterDate = null;

  @tracked
  selectedLog = null;

  @tracked
  sources = [
    "management-log",
    "reservations-log",
    "payments-log",
    "permissions-log",
  ];

  @tracked
  logLevels = [
    "All",
    "Verbose",
    "Debug",
    "Information",
    "Warning",
    "Error",
    "Fatal",
  ];

  @tracked
  timeFilters = [
    "Last 1 Minutes",
    "Last 5 Minutes",
    "Last 10 Minutes",
    "Last 1 Hour",
    "Last 10 Hours",
    "All Logs",
  ]

  @tracked
  pageSize = Env.sonatribe.defaultPageSize;

  @tracked
  pageNumber = null;

  @tracked
  recordCount = null;

  MS_PER_MINUTE = 60000;
  MS_PER_HOUR = this.MS_PER_MINUTE * 60;

  query = {
    sort: "-raise-date",
    page: {
      size: Env.sonatribe.defaultPageSize,
      page: 1,
    },
  };

  @tracked
  loading;

  @tracked
  model = [];

  @action
  didInsert() {
    this.loadLogs(1);
  }

  getLogLevels(from) {
    switch (from) {
      case "Verbose":
        return `equals(level,'Verbose'),equals(level,'Debug'),equals(level,'Information'),equals(level,'Warning'),equals(level,'Error'),equals(level,'Fatal')`;
      case "Debug":
        return `equals(level,'Debug'),equals(level,'Information'),equals(level,'Warning'),equals(level,'Error'),equals(level,'Fatal')`;
      case "Information":
        return `equals(level,'Information'),equals(level,'Warning'),equals(level,'Error'),equals(level,'Fatal')`;
      case "Warning":
        return `equals(level,'Warning'),equals(level,'Error'),equals(level,'Fatal')`;
      case "Error":
        return `equals(level,'Error'),equals(level,'Fatal')`;
      case "Fatal":
        return `equals(level,'Fatal'),equals(level,'Fatal')`;
      default:
        return `equals(level,'Verbose'),equals(level,'Debug'),equals(level,'Information'),equals(level,'Warning'),equals(level,'Error'),equals(level,'Fatal')`;
    }

  }

  async loadLogs(getPageNumber) {

    if (this.selectedTimeFilterDate == null) {
      this.selectedTimeFilterDate =  moment(new Date(new Date().getTime() - this.getTimeFilter(this.selectedTimeFilter))).utc().format('YYYY-MM-DDThh:mm:ss')
    }

    let queryString = `expr:and(or(${this.getLogLevels(this.selectedLogLevel)}),greaterOrEqual(raise-date,'${this.selectedTimeFilterDate}'))`;


    this.loading = true;

    let q = this.query || {};
    this.originalQuery = q;
    q.page = {};
    q.page.number = getPageNumber;
    q.page.size = this.pageSize;

    q.filter = queryString

    this.query = q;

    let result = await this.store.query(this.selectedSource, this.query);

    this.model = result;

    this.recordCount = result.get("meta.total-resources"),
      this.pageNumber = getPageNumber;

    this.loading = false;
  }

  @action
  async getPage(getPageNumber) {
    await this.loadLogs(getPageNumber, this.selectedSource);
  }

  @action
  async didSelectSource(source) {
    this.selectedSource = source;
    await this.loadLogs(1);
  }

  @action
  async didSelectLogLevel(logLevel) {
    this.selectedLogLevel = logLevel;
    await this.loadLogs(1);
  }

  @action
  didSelectTimeFilter(timeFilter) {
    this.selectedTimeFilter = timeFilter;
    this.selectedTimeFilterDate = moment(new Date(new Date().getTime() - this.getTimeFilter(timeFilter))).utc().format('YYYY-MM-DDThh:mm:ss');
    this.loadLogs(1);
  }

  getTimeFilter(timeFilter) {
    switch (timeFilter) {
      case "Last 1 Minutes":
        return this.MS_PER_MINUTE;
      case "Last 5 Minutes":
        return this.MS_PER_MINUTE * 5;
      case "Last 10 Minutes":
        return this.MS_PER_MINUTE * 10;
      case "Last 1 Hour":
        return this.MS_PER_MINUTE * 60;
      case "Last 10 Hours":
        return this.MS_PER_MINUTE * 60 * 10;
      default:
        return this.MS_PER_MINUTE * 60 * 10000;
    }
  }

  @action
  onShowLog(log) {
    this.selectedLog = log;
    this.showLog = true;
  }
}

import Service, { inject as service } from '@ember/service';
import groupBy from 'ember-group-by';
import { computed } from '@ember/object';
import { mapBy, sum } from '@ember/object/computed';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class StatsServiceService extends Service {
    @service store;
    @service currentUser;

    // datapoints

    // by org
    @sum('ticketsSoldByDayByOrganisationStatsTotalFunds') totalFundsDayByOrganisationStatsTotalFundsSummed;

    @mapBy('ticketsSoldByDayByOrganisationStats', 'totalFunds') ticketsSoldByDayByOrganisationStatsTotalFunds;

    @sum('ticketsSoldByDayByOrganisationStatsTotals') ticketsSoldByDayByOrganisationStatsTotalsSummed;

    @mapBy('ticketsSoldByDayByOrganisationStats', 'total') ticketsSoldByDayByOrganisationStatsTotals;

    @sum('ordersProcessedByDayByOrganisationStatsTotals') ordersProcessedByDayByOrganisationStatsTotalsSummed;

    @mapBy('ordersProcessedByDayByOrganisationStats', 'total') ordersProcessedByDayByOrganisationStatsTotals;

    @sum('registeredInterestByOrganisationStatsTotals') registeredInterestByOrganisationStatsTotalsSummed;

    @mapBy('registeredInterestByOrganisationStats', 'total') registeredInterestByOrganisationStatsTotals;

    // by series

    getTotalFundsDayBySeriesStatsTotalFundsSummedById(id) {
        let result = 0;

        for (let x = 0; x < this.ticketsSoldByDayBySeriesStatsGrouped.length; x++) {
            let element = this.ticketsSoldByDayBySeriesStatsGrouped[x];

            if (id.indexOf(element.value) > -1) {
                result += element.items.reduce((total, item) => {
                    if (!total) {
                        total = 0;
                    }
                    return parseInt(total) + parseInt(item.totalFunds);
                });
            }
        }

        return result;
    }

    getTotalTicketsSoldDayBySeriesStatsTotalFundsSummedById(id) {
        let result = 0;
        for (let x = 0; x < this.ticketsSoldByDayBySeriesStatsGrouped.length; x++) {
            let element = this.ticketsSoldByDayBySeriesStatsGrouped[x];
            if (id.indexOf(element.value) > -1) {
                result += element.items.reduce((total, item) => {
                    if (!total) {
                        total = 0;
                    }
                    return parseInt(total) + parseInt(item.total);
                });
            }

        }

        return result;
    }

    getTotalOrdersProcessedBySeriesStatsById(id) {
        let result = 0;
        for (let x = 0; x < this.ordersProcessedByDayBySeriesStats.length; x++) {
            let element = this.ordersProcessedByDayBySeriesStats[x];
            if (id.indexOf(element.itemId) > -1) {
                result += element.total;
            }
        }
        return result;
    }

    getRegisteredInterestBySeriesStatsById(id) {
        let result = 0;

        for (let x = 0; x < this.registeredInterestBySeriesStats.length; x++) {
            let element = this.registeredInterestBySeriesStats[x];
            if (id.indexOf(element.itemId) > -1) {
                result += element.total;
            }
        }
        return result;
    }

    getTotalFundsDayByInstanceStatsTotalFundsSummedById(id) {
        let result = 0;
        for (let x = 0; x < this.ticketsSoldByDayByInstanceStatsGrouped.length; x++) {
            let element = this.ticketsSoldByDayByInstanceStatsGrouped[x];
            if (id.indexOf(element.value) > -1) {
                result += element.items.reduce((total, item) => {
                    if (!total) {
                        total = 0;
                    }
                    return parseInt(total) + parseInt(item.totalFunds);
                });
            }

        }

        return result;
    }

    getTotalTicketsSoldDayByInstanceStatsTotalFundsSummedById(id) {
        let result = 0;
        for (let x = 0; x < this.ticketsSoldByDayByInstanceStatsGrouped.length; x++) {
            let element = this.ticketsSoldByDayByInstanceStatsGrouped[x];
            if (id.indexOf(element.value) > -1) {
                result += element.items.reduce((total, item) => {
                    if (!total) {
                        total = 0;
                    }
                    return parseInt(total) + parseInt(item.total);
                });
            }
        }

        return result;
    }

    getTotalOrdersProcessedByInstanceStatsById(id) {
        let result = 0;
        for (let x = 0; x < this.ordersProcessedByDayByInstanceStats.length; x++) {
            let element = this.ordersProcessedByDayByInstanceStats[x];
            if (id.indexOf(element.itemId) > -1) {
                console.log(`getTotalOrdersProcessedByInstanceStatsById ${id} ${element.total}`)
                result += element.total;
            }
        }
        return result;
    }

    getRegisteredInterestByInstanceStatsById(id) {
        let result = 0;
        for (let x = 0; x < this.registeredInterestByInstanceStats.length; x++) {
            let element = this.registeredInterestByInstanceStats[x];
            if (id.indexOf(element.itemId) > -1) {
                result += element.total;
            }
        }

        return result;
    }

    @groupBy('stats.registeredInterestByDay', 'eventInstanceId')
    registeredInterestByDayGroupedByeventInstanceId;

    @groupBy('stats.ticketsSoldByDay', 'eventInstanceId')
    ticketsSoldByDayGroupedByeventInstanceId;

    @groupBy('stats.ordersProcessedByDay', 'eventInstanceId')
    ordersProcessedByDayGroupedByeventInstanceId;

    @computed('ordersProcessedByDayGroupedByeventInstanceId', 'ticketsSoldByDayGroupedByeventInstanceId', 'registeredInterestByDayGroupedByeventInstanceId')
    get eventInstanceIdSet() {
        let eventInstanceIdSet = new Set();

        this.registeredInterestByDayGroupedByeventInstanceId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventInstanceIdSet.add(element.value);
        });

        this.ticketsSoldByDayGroupedByeventInstanceId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventInstanceIdSet.add(element.value);
        });

        this.ordersProcessedByDayGroupedByeventInstanceId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventInstanceIdSet.add(element.value);
        });

        return eventInstanceIdSet;
    }

    @groupBy('stats.registeredInterestByDay', 'eventSeriesId')
    registeredInterestByDayGroupedByEventSeriesId;

    @groupBy('stats.ticketsSoldByDay', 'eventSeriesId')
    ticketsSoldByDayGroupedByEventSeriesId;

    @groupBy('stats.ordersProcessedByDay', 'eventSeriesId')
    ordersProcessedByDayGroupedByEventSeriesId;

    @computed('registeredInterestByDayGroupedByEventSeriesId', 'ticketsSoldByDayGroupedByEventSeriesId', 'ordersProcessedByDayGroupedByEventSeriesId')
    get eventSeriesIdSet() {
        let eventSeriesIdSet = new Set();

        this.registeredInterestByDayGroupedByEventSeriesId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventSeriesIdSet.add(element.value);
        });

        this.ticketsSoldByDayGroupedByEventSeriesId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventSeriesIdSet.add(element.value);
        });

        this.ordersProcessedByDayGroupedByEventSeriesId.forEach(element => {
            if (element.value !== '00000000-0000-0000-0000-000000000000') eventSeriesIdSet.add(element.value);
        });

        return eventSeriesIdSet;
    }

    @tracked registeredInterestByInstanceStats = [];
    @groupBy('registeredInterestByInstanceStats', 'eventInstanceId')
    registeredInterestByInstanceStatsGrouped;

    @computed('registeredInterestByInstanceStatsGrouped')
    get registeredInterestByInstanceStatsGroupedChartData() {
        let allData = [];

        // console.log(`this.registeredInterestByInstanceStatsGrouped: ${this.registeredInterestByInstanceStatsGrouped}`);

        this.registeredInterestByInstanceStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        //console.log(`registeredInterestByInstanceStatsGroupedChartData: ${JSON.stringif(this.registeredInterestByInstanceStatsGroupedChartData)}`);

        return allData;
    }

    getRegisteredInterestByInstanceStatsGroupedChartDataById(id) {
        let item;
        for (var i = 0; i < this.registeredInterestByInstanceStatsGroupedChartData.length; i++) {
            let element = this.registeredInterestByInstanceStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked registeredInterestBySeriesStats = [];
    @groupBy('registeredInterestBySeriesStats', 'eventSeriesId')
    registeredInterestBySeriesStatsGrouped;

    @computed('registeredInterestBySeriesStatsGrouped')
    get registeredInterestBySeriesStatsGroupedChartData() {
        let allData = [];

        this.registeredInterestBySeriesStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getRegisteredInterestBySeriesStatsGroupedChartDataById(id) {
        let item;
        for (var i = 0; i < this.registeredInterestBySeriesStatsGroupedChartData.length; i++) {
            let element = this.registeredInterestBySeriesStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked ticketsSoldByDayByInstanceStats = [];
    @groupBy('ticketsSoldByDayByInstanceStats', 'eventInstanceId')
    ticketsSoldByDayByInstanceStatsGrouped;

    @computed('ticketsSoldByDayByInstanceStatsGrouped')
    get ticketsSoldByDayByInstanceStatsGroupedChartData() {
        let allData = [];

        this.ticketsSoldByDayByInstanceStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getTicketsSoldByDayByInstanceStatsGroupedChartDataById(id, eventName) {

        let item;
        for (var i = 0; i < this.ticketsSoldByDayByInstanceStatsGroupedChartData.length; i++) {
            let element = this.ticketsSoldByDayByInstanceStatsGroupedChartData[i];
            if (element.itemId === id) {
                element.chartData.datasets[0].label = eventName;
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked ticketsSoldByDayBySeriesStats = [];
    @groupBy('ticketsSoldByDayBySeriesStats', 'eventSeriesId')
    ticketsSoldByDayBySeriesStatsGrouped;

    @computed('ticketsSoldByDayBySeriesStatsGrouped')
    get ticketsSoldByDayBySeriesStatsGroupedChartData() {
        let allData = [];

        this.ticketsSoldByDayBySeriesStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getTicketsSoldByDayBySeriesStatsGroupedChartDataById(id) {
        let item;
        for (var i = 0; i < this.ticketsSoldByDayBySeriesStatsGroupedChartData.length; i++) {
            let element = this.ticketsSoldByDayBySeriesStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked  refundsProcessedByDayByInstanceStats = [];
    @groupBy('refundsProcessedByDayByInstanceStats', 'eventInstanceId')
    refundsProcessedByDayByInstanceStatsGrouped;

    @computed('refundsProcessedByDayByInstanceStatsGrouped')
    get refundsProcessedByDayByInstanceStatsGroupedChartData() {
        let allData = [];

        this.refundsProcessedByDayByInstanceStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getRefundsProcessedByDayByInstanceStatsGroupedChartDataById(id) {
        let item;
        for (var i = 0; i < this.refundsProcessedByDayByInstanceStatsGroupedChartData.length; i++) {
            let element = this.refundsProcessedByDayByInstanceStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked ordersProcessedByDayByInstanceStats = [];
    @groupBy('ordersProcessedByDayByInstanceStats', 'eventInstanceId')
    ordersProcessedByDayByInstanceStatsGrouped;

    @computed('ordersProcessedByDayByInstanceStatsGrouped')
    get ordersProcessedByDayByInstanceStatsGroupedChartData() {
        let allData = [];

        this.ordersProcessedByDayByInstanceStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getOrdersProcessedByDayByInstanceStatsGroupedChartDataById(id, eventName) {
        let item;
        for (var i = 0; i < this.ordersProcessedByDayByInstanceStatsGroupedChartData.length; i++) {
            let element = this.ordersProcessedByDayByInstanceStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    @tracked registeredInterestByOrganisationStats = [];
    @computed('registeredInterestByOrganisationStats')
    get registeredInterestByOrganisationStatsChartData() {

        let labels = [];
        let data = [];

        this.registeredInterestByOrganisationStats.forEach(s => {
            labels.push(s.day);
            data.push(s.total);
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: 'org level',
                    fillColor: "rgb(255, 99, 132, .5)",
                    backgroundColor: "rgb(255, 99, 132, .5)",
                    borderColor: "rgb(255, 99, 132, .5)",
                    strokeColor: "rgba(204, 51, 0, 1)",
                    pointColor: "rgba(204, 51, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(204, 51, 0, 1)",
                    data: data
                }
            ]
        };
    }

    getRegisteredInterestByOrganisationStatsChartDataById() {
        return this.registeredInterestByOrganisationStatsChartData;
    }

    @tracked ticketsSoldByDayByOrganisationStats = [];
    @computed('ticketsSoldByDayByOrganisationStats')
    get ticketsSoldByDayByOrganisationStatsChartData() {
        let labels = [];
        let data = [];

        this.ticketsSoldByDayByOrganisationStats.forEach(s => {
            labels.push(s.day);
            data.push(s.total);
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Items Sold By Organisation',
                    fillColor: "rgb(255, 99, 132, .5)",
                    backgroundColor: "rgb(255, 99, 132, .5)",
                    borderColor: "rgb(255, 99, 132, .5)",
                    strokeColor: "rgba(204, 51, 0, 1)",
                    pointColor: "rgba(204, 51, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(204, 51, 0, 1)",
                    data: data
                }
            ]
        };
    }

    getTicketsSoldByDayByOrganisationStatsGroupedChartDataById() {
        return this.ticketsSoldByDayByOrganisationStatsChartData;
    }

    @tracked ordersProcessedByDayByOrganisationStats = [];
    @computed('ordersProcessedByDayByOrganisationStats')
    get ordersProcessedByDayByOrganisationStatsChartData() {
        let labels = [];
        let data = [];

        this.ordersProcessedByDayByOrganisationStats.forEach(s => {
            labels.push(s.day);
            data.push(s.total);
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Orders By Organisation',
                    fillColor: "rgb(255, 99, 132, .5)",
                    backgroundColor: "rgb(255, 99, 132, .5)",
                    borderColor: "rgb(255, 99, 132, .5)",
                    strokeColor: "rgba(204, 51, 0, 1)",
                    pointColor: "rgba(204, 51, 0, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(204, 51, 0, 1)",
                    data: data
                }
            ]
        };
    }

    getOrdersProcessedByDayByOrganisationStatsGroupedChartDataById() {
        return this.ordersProcessedByDayByOrganisationStatsChartData;
    }

    @tracked ordersProcessedByDayBySeriesStats = [];
    @groupBy('ordersProcessedByDayBySeriesStats', 'eventSeriesId')
    ordersProcessedByDayBySeriesStatsGrouped;

    @computed('ordersProcessedByDayBySeriesStatsGrouped')
    get ordersProcessedByDayBySeriesStatsGroupedChartData() {
        let allData = [];

        this.ordersProcessedByDayBySeriesStatsGrouped.forEach(element => {
            let labels = [];
            let data = [];
            element.items.forEach(s => {
                labels.push(s.day);
                data.push(s.total);
            });

            allData.push({
                itemId: element.value,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: element.value,
                            fillColor: "rgb(255, 99, 132, .5)",
                            backgroundColor: "rgb(255, 99, 132, .5)",
                            borderColor: "rgb(255, 99, 132, .5)",
                            strokeColor: "rgba(204, 51, 0, 1)",
                            pointColor: "rgba(204, 51, 0, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(204, 51, 0, 1)",
                            data: data
                        }
                    ]
                }
            });
        });

        return allData;
    }

    getOrdersProcessedByDayBySeriesStatsGroupedChartDataById(id) {
        let item;
        for (var i = 0; i < this.ordersProcessedByDayBySeriesStatsGroupedChartData.length; i++) {
            let element = this.ordersProcessedByDayBySeriesStatsGroupedChartData[i];
            if (element.itemId === id) {
                item = element;
                break;
            }
        }
        return item;
    }

    async initData(data) {

        this.registeredInterestByInstanceStats = []
        this.ticketsSoldByDayByInstanceStats = []
        this.ordersProcessedByDayByInstanceStats = []
        this.refundsProcessedByDayByInstanceStats = []

        this.registeredInterestBySeriesStats = []
        this.ticketsSoldByDayBySeriesStats = []
        this.ordersProcessedByDayByOrganisationStats = []

        this.registeredInterestByOrganisationStats = []
        this.ticketsSoldByDayByOrganisationStats = []
        this.ordersProcessedByDayByOrganisationStats = []


        await data.ticketsSoldByDay
        await data.ordersProcessedByDay
        await data.refundsProcessedByDay

        // await data.registeredInterestByDay
        this.set('stats', data)

        let dateTo = moment().add(1, 'days').format('YYYY-MM-DD');
        let dateFrom = moment().subtract(2, 'years').format('YYYY-MM-DD');

        this.eventInstanceIdSet.forEach(element => {
            for (var m = moment(dateFrom); m.isBefore(dateTo); m.add(1, 'days')) {

                let regstat = this.getStatByDayMonthYearForSeriesOrInstance(element, null, m.date(), m.month() + 1, m.year(), this.stats.registeredInterestByDay, 'eventInstanceId');
                this.registeredInterestByInstanceStats.push(regstat);

                let ticketstat = this.getStatByDayMonthYearForSeriesOrInstance(element, null, m.date(), m.month() + 1, m.year(), this.stats.ticketsSoldByDay, 'eventInstanceId');
                this.ticketsSoldByDayByInstanceStats.push(ticketstat);

                let orderstat = this.getStatByDayMonthYearForSeriesOrInstance(element, null, m.date(), m.month() + 1, m.year(), this.stats.ordersProcessedByDay, 'eventInstanceId');
                this.ordersProcessedByDayByInstanceStats.push(orderstat);

                if (this.stats.refundsProcessedByDay) {
                    let refundstat = this.getStatByDayMonthYearForSeriesOrInstance(element, null, m.date(), m.month() + 1, m.year(), this.stats.refundsProcessedByDay, 'eventInstanceId');
                    this.refundsProcessedByDayByInstanceStats.push(refundstat);
                }
            }
        });

        dateTo = moment().add(1, 'days').format('YYYY-MM-DD');
        dateFrom = moment().subtract(2, 'years').format('YYYY-MM-DD');

        this.eventSeriesIdSet.forEach(element => {
            for (var m = moment(dateFrom); m.isBefore(dateTo); m.add(1, 'days')) {

                let regstat = this.getStatByDayMonthYearForSeriesOrInstance(null, element, m.date(), m.month() + 1, m.year(), this.stats.registeredInterestByDay, 'eventSeriesId');
                this.registeredInterestBySeriesStats.push(regstat);

                let ticketstat = this.getStatByDayMonthYearForSeriesOrInstance(null, element, m.date(), m.month() + 1, m.year(), this.stats.ticketsSoldByDay, 'eventSeriesId');
                this.ticketsSoldByDayBySeriesStats.push(ticketstat);

                let orderstat = this.getStatByDayMonthYearForSeriesOrInstance(null, element, m.date(), m.month() + 1, m.year(), this.stats.ordersProcessedByDay, 'eventSeriesId');
                this.ordersProcessedByDayBySeriesStats.push(orderstat);

            }
        });

        dateTo = moment().add(1, 'days').format('YYYY-MM-DD');
        dateFrom = moment().subtract(2, 'years').format('YYYY-MM-DD');

        for (var m = moment(dateFrom); m.isBefore(dateTo); m.add(1, 'days')) {

            let regstat = this.getStatByDayMonthYear(m.date(), m.month() + 1, m.year(), this.stats.registeredInterestByDay);
            this.registeredInterestByOrganisationStats.push(regstat);

            let ticketstat = this.getStatByDayMonthYear(m.date(), m.month() + 1, m.year(), this.stats.ticketsSoldByDay);
            this.ticketsSoldByDayByOrganisationStats.push(ticketstat);

            let orderstat = this.getStatByDayMonthYear(m.date(), m.month() + 1, m.year(), this.stats.ordersProcessedByDay);
            this.ordersProcessedByDayByOrganisationStats.push(orderstat);

        }
    }

    getStatByDayMonthYearForSeriesOrInstance(eiId, seriesId, day, month, year, stats, prop) {
        let result = {
            year: year,
            month: month,
            day: day,
            total: 0,
            itemId: eiId ?? seriesId,
            eventInstanceId: eiId,
            eventSeriesId: seriesId,
            totalFunds: 0
        };

        let searchId = eiId ?? seriesId;

        stats = stats.toArray();

        for (let index = 0; index < stats.length; index++) {

            let element = stats[index];
            if (element.day === day && element.month === month && element.year === year && element[prop] === searchId) {
                result.total = result.total + element.total;

                if (element.totalFunds) {
                    result.totalFunds = result.totalFunds + element.totalFunds;
                }
            }
        }

        return result;
    }


    getStatByDayMonthYear(day, month, year, stats) {
        let result = {
            year: year,
            month: month,
            day: day,
            total: 0,
            totalFunds: 0
        };

        stats = stats.toArray();

        for (let index = 0; index < stats.length; index++) {
            let element = stats[index];
            if (element.day === day && element.month === month && element.year === year) {
                result.total = result.total + element.total;

                if (element.totalFunds) {
                    result.totalFunds = result.totalFunds + element.totalFunds;
                }
            }
        }

        return result;
    }

}

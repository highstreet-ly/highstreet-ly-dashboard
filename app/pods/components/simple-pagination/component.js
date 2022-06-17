import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { computed } from "@ember/object";
import { action } from '@ember/object';

@classic
export default class CimplePaginationComponent extends Component {
  maxPagesInList = 10;
  attributeBindings = ['dataTestSelector:data-test-selector'];
  dataTestSelector = null;

  @computed('totalPages')
  get displayPaginator() {
    return this.totalPages > 1;
  }

  @computed('pageNumber')
  get isPrevDisabled() {
    return this.pageNumber === 1;
  }

  @computed('pageNumber', 'totalPages')
  get isNextDisabled() {
    return this.pageNumber === this.totalPages ? true : false;
  }

  @computed('pageNumber')
  get prevPageNumber() {
    return Math.max(1, this.pageNumber - 1);
  }

  @computed('pageNumber', 'totalPages')
  get nextPageNumber() {
    return Math.min(this.totalPages, this.pageNumber + 1);
  }

  @computed('maxPagesInList', 'pageNumber', 'pageSize', 'recordCount')
  get totalPages() {
    let recordCount = this.recordCount,
        pageSize = this.pageSize,
        pageNumber = this.pageNumber,
        maxPagesInList = this.maxPagesInList;

    if (recordCount < 0 || pageSize < 1 || pageNumber < 1 || maxPagesInList < 2) {
      return 0;
    }

    let totalPages = Math.floor(recordCount/pageSize),
        rem = recordCount % pageSize;

    if (rem > 0) {
      totalPages++;
    }

    return totalPages;
  }

  @computed('maxPagesInList', 'pageSize', 'recordCount', 'totalPages')
  get nbrPagesInList() {
    return Math.min(this.totalPages, this.maxPagesInList);
  }

  @computed('maxPagesInList', 'nbrPagesInList', 'pageNumber', 'pageSize', 'recordCount', 'totalPages')
  get pages() {
    let pageArray = [],
        totalPages = this.totalPages,
        pageNumber = this.pageNumber,
        nbrPagesInList = this.nbrPagesInList,
        active, pgNbr, endPgNbr;

    endPgNbr = Math.min((pageNumber + 3), totalPages);
    pgNbr = Math.max((endPgNbr - nbrPagesInList + 1), 1);

    for (var i = 0; i < nbrPagesInList; i++) {
      active = pgNbr === pageNumber ? true : false;
      pageArray[i] = {number: pgNbr, active: active};
      pgNbr++;
    }
    return pageArray;
  }

  @action
  getPage(newPageNumber) {
    if (newPageNumber !== this.pageNumber) {
      this.onPageSelect(newPageNumber);
    }
  }
}

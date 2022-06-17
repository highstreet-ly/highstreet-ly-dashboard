import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

function closest(el, selector) {
  var matchesFn;

  // find vendor prefix
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  })

  var parent;

  // traverse parents
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }

  return null;
}

@classic
export default class SonaticketHeader extends Component {
  @service
  session;

  @service
  currentUser;

  @service
  store;

  constructor() {
    super(...arguments);
    this.imageOptions = "w_80";
  }

  @action
  logout() {
    this.session.invalidate();
  }

  @computed()
  get hasTeamFeature() {
    return this.currentUser.hasFeatureSync('team')
  }

  async didInsertElement() {

    this.element.querySelectorAll('.submenu a').forEach(element => {
      element.onclick = async () => {
        closest(element, '.submenu').classList.add('hide');
        await new Promise(r => setTimeout(r, 500));
        closest(element, '.submenu').classList.remove('hide');
      };
    });

    this.element.querySelectorAll('[data-toggle="horizontal-menu-toggle"]').forEach(element => {
      element.onclick = () => {
        this.element.querySelectorAll('.horizontal-menu .bottom-navbar').forEach(element2 => {
          if (element2.classList.contains('header-toggled')) {
            element2.classList.remove('header-toggled');
          } else {
            element2.classList.add('header-toggled');
          }
        });
      };
    });


    this.element.querySelectorAll('.horizontal-menu .page-navigation >.nav-item').forEach(element => {
      element.onclick = () => {
        if (window.matchMedia('(max-width: 991px)').matches) {
          if (element.classList.contains('show-submenu')) {
            element.classList.remove('show-submenu');
          } else {
            element.classList.add('show-submenu');
          }
        }
      };
    });

    //if(this.currentUser.eventOrganiser.schemaType === 0){
    var eventSeries = await this.store.query('event-series', {
      filter: {
        'event-organiser-id': this.currentUser.eventOrganiser.id
      }
    });

    this.set('defaultEventSeries', eventSeries.firstObject);

    this.set('isAdmin', await this.currentUser.isInRole('Admin'))
  }
  // }
}

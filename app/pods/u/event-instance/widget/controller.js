import Controller from '@ember/controller';
import { getCodeSnippet } from 'ember-code-snippet';
import { computed } from '@ember/object';
import Env from 'sonaticket-dashboard/config/environment';


export default class UEventInstanceWidgetController extends Controller {
    @computed('eventInstance.id')
    get getSnippetWidgetBody() {
        let snippet = getCodeSnippet("widget-body.html")

        snippet.source = snippet.source.replace('API_URL', `${Env.sonatribe.shopApi}/api/v1/`)
        snippet.source = snippet.source.replace('EVENT_ID', this.eventInstance.id)
        snippet.source = snippet.source.replace('STRIPE_KEY', Env.sonatribe.stripeKey)
        snippet.source = snippet.source.replace('JS_SRC', `https://highstreetly.fra1.cdn.digitaloceanspaces.com/widget.js`)

        return snippet
    }
}

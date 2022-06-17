import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import JSONFormatter from 'json-formatter-js'

export default class LogViewComponent extends Component {

    @tracked
    logPropertiesJson

    @action
    async didInsert() {
        var logPropertiesJson = JSON.parse(this.args.log.properties)
        const formatter = new JSONFormatter(logPropertiesJson)
        this.logPropertiesJson = formatter.render()
    }

}

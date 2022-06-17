import classic from 'ember-classic-decorator'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import Component from '@ember/component'

@classic
export default class AccountSettings extends Component {
    @service
    session

    @service
    currentUser

    loading = false
    imageOptions = "w_80"

    @action
    async selectAvatarType(t) {
        this.currentUser.userModel.set('avatarType', t)
    }

    @action
    async onUploadedImageComplete(imageId) {
        this.currentUser.userModel.set('uploadedAvatarId', imageId)
    }

    @action
    async saveUser() {
        this.loading = true;
        await this.currentUser.userModel.save()
        this.loading = false;
    }
}

import Component from '../cloudinary-uploader/component'

export default class CloudinaryUploaderButtonComponent extends Component {
  get buttonText() {
    return this.args.buttontext ?? 'Add an Image';
  }
}

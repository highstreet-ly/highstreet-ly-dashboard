/*global cloudinary*/

import Component from '@glimmer/component';
import Env from 'sonaticket-dashboard/config/environment';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CloudinaryUploader extends Component {
  @tracked
  newImageId = null;

  get preset() {
    return this.args.preset ?? 'generic';
  }

  get imageOptions() {
    return this.args.imageOptions ?? 'h_80';
  }

  get previewImage() {
    return this.args.previewImage ?? true;
  }

  get currentImageId() {
    return this.newImageId ?? this.args.imageId;
  }

  @action
  didInsert() {
    let options = {};
    options.cloudName = Env.cloudinary.cloudName;
    options.apiKey = Env.cloudinary.apiKey;
    options.uploadPreset = this.preset;
    options.clientAllowedFormats = ['jpg', 'png', 'gif'];
    options.maxFileSize = 5000000;

    if (this.args.cropping) {
      options.cropping = this.args.cropping;
      options.croppingCoordinatesMode = "custom";
    }

    if (this.args.croppingAspectRatio) {
      options.croppingAspectRatio = this.args.croppingAspectRatio
    }

    var imageUploadWidget = cloudinary.createUploadWidget(
      options,
      (error, result) => {
        if (!error && result && result.event === "success") {
          //$('#imageIdProxy').val(result.info.public_id).trigger('change');
          this.newImageId = result.info.public_id;
          if (this.args.onUploadedImageComplete) {
            this.args.onUploadedImageComplete(this.newImageId, this.args.hsImageId);
          }
        }
      }
    );

    this.imageUploadWidget = imageUploadWidget;
  }

  @action
    showUploadModal() {
      this.imageUploadWidget.open();
    }

    @action
    deleteImage(){
      this.args.onDeleteImage(this.hsImage)
  }
}

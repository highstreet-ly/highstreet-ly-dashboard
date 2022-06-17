import Component from "@glimmer/component";
import Env from "sonaticket-dashboard/config/environment";

export default class CloudinaryImage extends Component {
  get alt() {
    return this.args.alt ?? "";
  }

  get options() {
    return this.args.options ?? "h_800";
  }

  get filetype() {
    return this.args.filetype ?? "jpg";
  }

  get imageId() {
    return this.args.imageId ?? "generic/placeholder";
  }

  get computedSrc() {
    return (
      "https://res.cloudinary.com/" +
      Env.cloudinary.cloudName +
      "/image/upload/" +
      this.options +
      "/" +
      this.imageId +
      "." +
      this.filetype
    );
  }
}

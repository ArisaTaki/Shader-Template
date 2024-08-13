import * as kokomi from "kokomi.js";

export default class Experience extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);

    window.experience = this;
  }
}

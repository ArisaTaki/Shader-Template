import * as kokomi from "kokomi.js";
import TestObject from "./TestObject";
export default class World extends kokomi.Component {
  testObject: TestObject;
  constructor(base: kokomi.Base) {
    super(base);

    this.testObject = new TestObject(this.base);
    this.testObject.addExisting();
  }
}

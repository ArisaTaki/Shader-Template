import * as kokomi from "kokomi.js";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "./ObjectEnum";
export default class World extends kokomi.Component {
  testObject?: TestObject;
  constructor(base: kokomi.Base, objectEnum?: ObjectEnum) {
    super(base);
    switch (objectEnum) {
      case ObjectEnum.TestObject:
        this.testObject = new TestObject(this.base);
        this.testObject.addExisting();
        break;
    }
  }
}

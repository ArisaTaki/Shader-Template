import * as kokomi from "kokomi.js";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
import Experience from "../Experience";
export default class World extends kokomi.Component {
  declare base: Experience;
  testObject?: TestObject;
  baseObject?: BaseObject;
  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);
    switch (objectEnum) {
      case ObjectEnum.TestObject:
        this.testObject = new TestObject(this.base);
        this.testObject.addExisting();
        break;
      case ObjectEnum.BaseObject:
        this.baseObject = new BaseObject(this.base);
        this.baseObject.addExisting();
        break;
    }
  }
}

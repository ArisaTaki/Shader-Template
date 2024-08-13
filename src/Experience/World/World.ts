import * as kokomi from "kokomi.js";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
export default class World extends kokomi.Component {
  testObject?: TestObject;
  baseObject?: BaseObject;
  constructor(base: kokomi.Base, objectEnum?: ObjectEnum) {
    super(base);
    switch (objectEnum) {
      case ObjectEnum.TestObject:
        this.testObject = new TestObject(this.base);
        this.testObject.addExisting();
        break;
      case ObjectEnum.BaseObject:
        this.baseObject = new BaseObject(this.base);
        this.baseObject.addExisting();
    }
  }
}

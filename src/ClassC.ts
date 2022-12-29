import { Class, Execute, EXECUTE_METADATA_KEY } from "./decorator";

@Class({value: 'C'})
export class C {
  @Execute()
  method(){
    console.log(Reflect.getMetadata(EXECUTE_METADATA_KEY, this, 'method'))
  }
}

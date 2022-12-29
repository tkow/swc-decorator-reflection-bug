import { Method, Class, METHOD_METADATA_KEY } from "./decorator";

@Class({value: 'A'})
export class A {
  @Method({
    value: 'a'
  })
  method(){
    console.log(Reflect.getMetadata(METHOD_METADATA_KEY, this, 'method'))
  }
}

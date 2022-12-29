import { Class, Method, METHOD_METADATA_KEY } from "./decorator";

@Class({value: 'B'})
export class B {
  @Method({
    value: undefined
  })
  method(){
    console.log(Reflect.getMetadata(METHOD_METADATA_KEY, this, 'method'))
  }
}

import { Inject } from '@nestjs/common'


const applyMethodMetadata = (options: any, metadataKey: string): MethodDecorator => {
  return (
    _target: Record<string, any>,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(metadataKey, options, descriptor.value);
    return descriptor;
  };
};

const applyClassMetadata = (options: any, metadataKey: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(metadataKey, options, target);
    return target;
  };
};

export const CLASS_METADATA_KEY = 'ClassMeta';

export const Class = (options: any): ClassDecorator => {
  return applyClassMetadata(options, CLASS_METADATA_KEY);
};

export const METHOD_METADATA_KEY = 'MethodMeta';

export const Method = (options: any): MethodDecorator => {
  return applyMethodMetadata(options, METHOD_METADATA_KEY);
};

export const EXECUTE_METADATA_KEY = 'ExecuteMeta';

export function Execute(): MethodDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata('ExecuteMeta', '', target, propertyKey);
  };
}
export const TEST_METADATA_KEY = Symbol('test')

export const Test = () => Inject(TEST_METADATA_KEY)

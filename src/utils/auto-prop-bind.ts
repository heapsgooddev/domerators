/**
 * automatically bind all methods of a class to the current instance
 * (handy when using methods that are called as callbacks via decorator)
 */
export function autoPropBind<T>(instance: T | any): T {
  // bind each key of instance
  for (const key of Object.getOwnPropertyNames(
    instance.constructor.prototype
  )) {
    const instanceMethod = instance[key];
    if (key !== 'constructor' && typeof instanceMethod === 'function')
      instanceMethod.bind(instance);
  }

  return instance as T;
}

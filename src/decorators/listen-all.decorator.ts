/**
 * listen for an event & call decorated function
 */
export function ListenAll(
  event: string,
  targets: NodeListOf<Element> | EventTarget | string = document,
  options: boolean | AddEventListenerOptions = {}
) {
  return (decoratorTarget: any, propKey: string, _descriptor: any) => {
    // some of the following code for binding tomfoolery is care of;
    // https://github.com/JohnWeisz/BoundMethods/blob/master/src/bound.ts

    // keep track of the original method
    const originalMethod: Function = decoratorTarget[propKey] as Function;

    return {
      get: function(): any {
        // create bound override on object instance. This will hide the original method on the prototype, and instead yield a bound version from the
        // instance itself. The original method will no longer be accessible. Inside a getter, 'this' will refer to the instance.
        const instance: any = this;

        Object.defineProperty(instance, propKey.toString(), {
          value: function() {
            // this is effectively a lightweight bind() that skips many (here unnecessary) checks found in native implementations.
            return originalMethod.apply(instance, arguments);
          },
        });

        // get our query target
        let queryTargets: NodeListOf<Element> | EventTarget | string = targets;

        // if we have a target to query, try and get query for it
        if (typeof targets === 'string') {
          // attempt to look for current instance properties
          queryTargets = instance[targets]
            ? instance[targets]
            : document.querySelectorAll(targets);
        }

        // add an event listener, then call decorated method with apropriate 'this'
        if (!!(queryTargets as NodeListOf<Element>).forEach)
          (queryTargets as NodeListOf<Element>).forEach(element =>
            element.addEventListener(
              event,
              (...args) => originalMethod.apply(instance, args),
              options
            )
          );
        else
          (queryTargets as EventTarget).addEventListener(
            event,
            (...args) => originalMethod.apply(instance, args),
            options
          );

        // the first invocation (per instance) will return the bound method from here. Subsequent calls will never reach this point, due to the way
        // javaScript runtimes look up properties on objects; the bound method, defined on the instance, will effectively hide it.
        return instance[propKey];
      },
    };
  };
}

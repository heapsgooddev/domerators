/**
 * decorator to query DOM for an element
 * (wraps document.queryselector - because of this,
 *  there's no guarantee that you'll get the same element every time the attached property is called)
 */
export function Query<T extends Element = Element>(selector: string) {
  // create getter function for property
  const getter = function() {
    return document.querySelector<T>(selector);
  };

  return (decoratorTarget: any, propKey: string) => {
    Object.defineProperty(decoratorTarget, propKey, {
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
}

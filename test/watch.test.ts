import { Bind, DataProxy, Watch } from '../src';
import { autoBind } from '../src/utils/auto-prop-bind';

describe('Watch', () => {
  it('calls function when bound data property changes', () => {
    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @Bind<{ count: number }>({ count: 3 })
      counter!: DataProxy<{ count: number }>;

      constructor() {
        // Watch decorator requires functions to be bound correctly
        autoBind(this);
      }

      @Watch<{ count: number }>('counter')
      onSetCounter() {
        // do it
        mockFunction();
      }
    }
    const listenPage = new ListenTestPage();

    // change property value
    listenPage.counter.count = 4;

    // should have called 'watch' function
    expect(mockFunction).toHaveBeenCalled();
  });

  it('calls function with correct args when bound data property changes', () => {
    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @Bind<{ count: number }>({ count: 3 })
      counter!: DataProxy<{ count: number }>;

      constructor() {
        // Watch decorator requires functions to be bound correctly
        autoBind(this);
      }

      @Watch<{ count: number }>('counter')
      onSetCounter(counter: { count: number }) {
        // do it
        mockFunction(counter);
      }
    }
    const listenPage = new ListenTestPage();

    // change property value
    listenPage.counter.count = 4;

    // should have called 'watch' function with bound data
    expect(mockFunction).toHaveBeenCalledWith(listenPage.counter);
  });
});

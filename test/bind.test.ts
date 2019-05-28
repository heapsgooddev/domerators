import { Bind, DataProxy } from '../src';

describe('Bind', () => {
  it('sets initial data value of bound data', () => {
    // setup class
    class ListenTestPage {
      @Bind<{ count: number }>({ count: 3 })
      counter!: DataProxy<{ count: number }>;

      constructor() {}
    }
    const listenPage = new ListenTestPage();

    // should have set initial object state
    expect(listenPage.counter.count).toEqual(3);
  });

  it('calls data proxy change hooks when bound data changes', () => {
    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @Bind<{ count: number }>({ count: 3 })
      counter!: DataProxy<{ count: number }>;

      constructor() {}
    }
    const listenPage = new ListenTestPage();

    listenPage.counter.onChange(mockFunction);
    listenPage.counter.count = 4;

    // should have set initial object state
    expect(mockFunction).toHaveBeenCalledWith(listenPage.counter);
  });
});

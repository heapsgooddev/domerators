import { ListenAll, QueryAll } from '../src';
import { autoBind } from '../src/utils/auto-prop-bind';

describe('Listen', () => {
  it('calls function on event when provided selector string as target', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button class="test-button"></button>
        <button class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '.test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll('click', '.test-button')
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    testButtonElement.click();

    // should have registerd clicks
    expect(mockFunction).toHaveBeenCalled();
  });

  it('calls function on events when provided selector string with multiple targets', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button-1" class="test-button"></button>
        <button id="test-button-2" class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement1 = document.querySelector<HTMLButtonElement>(
      '#test-button-1'
    );
    const testButtonElement2 = document.querySelector<HTMLButtonElement>(
      '#test-button-2'
    );

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll('click', '.test-button')
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    (testButtonElement1 as HTMLButtonElement).click();
    (testButtonElement2 as HTMLButtonElement).click();

    // should have registerd clicks for both buttons
    expect(mockFunction).toBeCalledTimes(2);
  });

  it('calls function on event when provided element as target', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button class="test-button"></button>
        <button class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '.test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll('click', document.querySelector(
        '.test-button'
      ) as HTMLButtonElement)
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    testButtonElement.click();

    // should have registerd clicks
    expect(mockFunction).toHaveBeenCalled();
  });

  it('calls function on events when provided multiple elements as target', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button-1" class="test-button"></button>
        <button id="test-button-2" class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement1 = document.querySelector<HTMLButtonElement>(
      '#test-button-1'
    );
    const testButtonElement2 = document.querySelector<HTMLButtonElement>(
      '#test-button-2'
    );

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll(
        'click',
        document.querySelectorAll<HTMLButtonElement>('.test-button')
      )
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    (testButtonElement1 as HTMLButtonElement).click();
    (testButtonElement2 as HTMLButtonElement).click();

    // should have registerd clicks for both buttons
    expect(mockFunction).toBeCalledTimes(2);
  });

  it('calls function on event when provided instance property element', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button class="test-button"></button>
        <button class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '.test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @QueryAll<HTMLButtonElement>('.test-button')
      testButton!: HTMLButtonElement;

      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll('click', 'testButton')
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    testButtonElement.click();

    // should have registerd clicks
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('calls function on events when provided multiple instance property elements', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button-1" class="test-button"></button>
        <button id="test-button-2" class="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement1 = document.querySelector<HTMLButtonElement>(
      '#test-button-1'
    );
    const testButtonElement2 = document.querySelector<HTMLButtonElement>(
      '#test-button-2'
    );

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @QueryAll<HTMLButtonElement>('.test-button')
      testButtons!: NodeListOf<HTMLButtonElement>;

      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @ListenAll('click', 'testButtons')
      eventHandler() {
        // do it
        mockFunction();
      }
    }
    new ListenTestPage();

    // get test button from DOM
    (testButtonElement1 as HTMLButtonElement).click();
    (testButtonElement2 as HTMLButtonElement).click();

    // should have registerd clicks for both buttons
    expect(mockFunction).toBeCalledTimes(2);
  });
});

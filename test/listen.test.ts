import { Listen, Query } from '../src';
import { autoBind } from '../src/utils/auto-prop-bind';

describe('Listen', () => {
  it('calls function on event when provided selector string as target', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '#test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @Listen('click', '#test-button')
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

  it('calls function on event when provided element as target', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '#test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @Listen('click', document.querySelector(
        '#test-button'
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

  it('calls function on event when provided instance property element', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <button id="test-button"></button>
      </div>
    `;

    // get button element
    const testButtonElement = document.querySelector(
      '#test-button'
    ) as HTMLButtonElement;

    // spy function
    const mockFunction = jest.fn();

    // setup class
    class ListenTestPage {
      @Query<HTMLButtonElement>('#test-button')
      testButton!: HTMLButtonElement;

      constructor() {
        // Listen decorator requires functions to be bound correctly
        autoBind(this);
      }

      @Listen('click', 'testButton')
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
});

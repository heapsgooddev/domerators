import { QueryAll } from '../src';

describe('QueryAll', () => {
  it('selects id elements from DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span id="test-span"></span>
        <span id="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @QueryAll<HTMLSpanElement>('#test-span')
      testSpans!: NodeListOf<HTMLSpanElement>;
    }
    const page = new QueryTestPage();

    // get test spans from DOM
    const testSpans = document.querySelectorAll('#test-span') as NodeListOf<
      HTMLElement
    >;

    // should have an element
    expect(page.testSpans.length).toEqual(testSpans.length);
  });

  it('selects class elements from DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span class="test-span"></span>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @QueryAll<HTMLSpanElement>('.test-span')
      testSpans!: NodeListOf<HTMLSpanElement>;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpans = document.querySelectorAll('.test-span') as NodeListOf<
      HTMLElement
    >;

    // should have an element
    expect(page.testSpans.length).toEqual(testSpans.length);
  });

  it('when selected elements are deleted, should return null', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span class="test-span"></span>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @QueryAll<HTMLSpanElement>('.test-span')
      testSpans!: NodeListOf<HTMLSpanElement>;
    }
    const page = new QueryTestPage();

    // get test span sfrom DOM
    const testSpans = document.querySelectorAll('.test-span') as NodeListOf<
      HTMLElement
    >;
    // remove elements
    testSpans.forEach(element => element.remove());

    // should have no elements
    expect(page.testSpans.length).toEqual(0);
  });

  it('selects correct amount of elements when initial matching element list is removed then re-added to DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div id="container">
        <span class="test-span"></span>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @QueryAll<HTMLSpanElement>('.test-span')
      testSpans!: NodeListOf<HTMLSpanElement>;
    }
    const page = new QueryTestPage();

    // get test span sfrom DOM
    const testSpans = document.querySelectorAll('.test-span') as NodeListOf<
      HTMLElement
    >;
    // remove elements
    testSpans.forEach(element => element.remove());

    // create another test span
    const newTestSpan1 = document.createElement('span');
    newTestSpan1.classList.add('.test-span');
    const newTestSpan2 = document.createElement('span');
    newTestSpan1.classList.add('.test-span');
    const newTestSpan3 = document.createElement('span');
    newTestSpan1.classList.add('.test-span');
    const containerDiv = document.getElementById('container') as HTMLElement;
    containerDiv.appendChild(newTestSpan1);
    containerDiv.appendChild(newTestSpan2);
    containerDiv.appendChild(newTestSpan3);

    // get new test span from DOM
    const recreatedTestSpans = document.querySelectorAll(
      '.test-span'
    ) as NodeListOf<HTMLElement>;

    // should have 3 elements
    expect(page.testSpans.length).toEqual(recreatedTestSpans.length);
  });
});

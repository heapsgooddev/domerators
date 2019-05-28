import { Query } from '../src';

describe('Query', () => {
  it('selects id element from DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span id="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @Query<HTMLSpanElement>('#test-span')
      testSpan!: HTMLSpanElement;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpan = document.querySelector('#test-span') as HTMLElement;

    // should have an element
    expect(page.testSpan).toEqual(testSpan);
  });

  it('selects class element from DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @Query<HTMLSpanElement>('.test-span')
      testSpan!: HTMLSpanElement;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpan = document.querySelector('.test-span') as HTMLElement;

    // should have an element
    expect(page.testSpan).toEqual(testSpan);
  });

  it('selects first class element found from DOM when multiple matching elements', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span id="test-span-1" class="test-span"></span>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @Query<HTMLSpanElement>('.test-span')
      testSpan!: HTMLSpanElement;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpan = document.querySelector('#test-span-1') as HTMLElement;

    // should have an element
    expect(page.testSpan).toEqual(testSpan);
  });

  it('when selected element is deleted, should return null', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div>
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @Query<HTMLSpanElement>('.test-span')
      testSpan!: HTMLSpanElement;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpan = document.querySelector('.test-span') as HTMLElement;
    // remove element
    testSpan.remove();

    // should have no element
    expect(page.testSpan).toEqual(null);
  });

  it('selects element when initial matching element is removed then re-added to DOM', () => {
    // set up our document body
    document.body.innerHTML = /* html */ `
      <div id="container">
        <span class="test-span"></span>
      </div>
    `;

    // setup class
    class QueryTestPage {
      @Query<HTMLSpanElement>('.test-span')
      testSpan!: HTMLSpanElement;
    }
    const page = new QueryTestPage();

    // get test span from DOM
    const testSpan = document.querySelector('.test-span') as HTMLElement;
    // remove element
    testSpan.remove();

    // create another test span
    const newTestSpan = document.createElement('span');
    newTestSpan.classList.add('test-span');
    const containerDiv = document.getElementById('container') as HTMLElement;
    containerDiv.appendChild(newTestSpan);

    // get new test span from DOM
    const recreatedTestSpan = document.querySelector(
      '.test-span'
    ) as HTMLElement;

    // should have no element
    expect(page.testSpan).toEqual(recreatedTestSpan);
  });
});

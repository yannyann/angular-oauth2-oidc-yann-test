import { RestApiUiV2Page } from './app.po';

describe('rest-api-ui-v2 App', function() {
  let page: RestApiUiV2Page;

  beforeEach(() => {
    page = new RestApiUiV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

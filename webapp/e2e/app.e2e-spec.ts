import { HSClientPage } from './app.po';

describe('hsclient App', function() {
  let page: HSClientPage;

  beforeEach(() => {
    page = new HSClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

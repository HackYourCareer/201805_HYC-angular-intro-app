import { AngularIntroAppPage } from './app.po';

describe('angular-intro-app App', () => {
  let page: AngularIntroAppPage;

  beforeEach(() => {
    page = new AngularIntroAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
